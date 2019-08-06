'use strict';

const router = require('express').Router();
const db = require('../db');
const crypto = require('crypto');
// const h = require('../helpers');

        //Iterate through the rute object and mount
let _registerRoutes = (routes, method) => {
    for(let key in routes){
        if(typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)){
            _registerRoutes(routes[key], key);
        }else{
            if(method === 'get'){
                router.get(key, routes[key]);
            }else if(method === 'post'){
                router.post(key, routes[key]);
            }else{
                router.use(routes[key]);
            }
        }
    }
}
 
let route = routes =>{
    _registerRoutes(routes);
    return router;
}
// let findOne = profileID => {
    //  Promise((resolve, rejec) => {
        // db.userModel.findOne(profileID, (error, result) => {
            // if(error){
                // console.log('error', error);
            // } else{
                // console.log('result:' , result);
            // }
        // });
    // });
// };

        //  find one user from the auth with id
 let findOne = profileID => {
    return  db.userModel.findOne({
       profileId: profileID,
    });
}
// let find = profileID => {
//     return db.userModel.find({
//         'profileId': profileID
//     }).limit(1);
// }
 
// let findOne = psrofileID => {
//     return db.collection.userModel.findOne({profileId: 'profileID'}, function(err, result) {
// if(err) throw err;
// console.log(result);
//     })
// };

 //create new user and return the instance
 let createNewUser = profile =>{
    return new Promise((resolve, reject) => { 
        let newChatUser = new db.userModel({
            profileId: profile.id,
            fullName: profile.displayName,
            profilePic: profile.photos[0].value || ''
        });
        newChatUser.save(error => {
            if(error){
                reject('Error when saving the new User', error);
            }else{
                resolve(newChatUser);
            }
        });
    })
 }

  //ES6 promise of findById
let findById = id => {
    return new Promise((resolve, reject) => {
        db.userModel.findById(id, (error, user) =>{
            if(error){
                reject('error', error);
            } else{
                resolve(user);
            }
        });
    });
}

        //check if the user is login and authenticated
let isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
}

    //Find a chatroom by a given name
    let findRoomByName = (allrooms, room) => {
        let findRoom = allrooms.findIndex((element, index, array) => {
            if(element.room === room){
                return true;
            }else {
                return false;
            }
        });
        return findRoom > -1 ? true : false;
    }

    //Create a Unique Room ID
    let randomHex = () => {
        return crypto.randomBytes(24).toString('hex');
    }

    //Find Room by ID
    let findRoomByID = (allrooms, roomID) => {
        return allrooms.find((element, index, array) => {
            if(element.roomID === roomID){
                return true;
            }else {
                return false;
            }
        });
    }

    //Add a user to chatroom
    let addUserToChatRoom = (allrooms, data, socket) => {
        
        //get a room ID
        let getRoom = findRoomByID(allrooms, data.roomID);
        if(getRoom !== undefined){
            
            //Get a users's Object ID through session
            let userID = socket.request.session.passport.user;

            //Check if user already exist in the chatroom
            let checkUser = getRoom.users.findIndex((element, index, array) => {
                if(element.userID === userID){
                    return true;
                }else {
                    return false;
                }
            });

            //If user already in the chatroom, then remove
            if(checkUser > -1){
                getRoom.users.splice(checkUser, 1);
            }

            //Push the users into the room Array
            getRoom.users.push({
                socketID: socket.id,
                 userID,
                 user: data.user,
                 userPic: data.userPic
            });

            //Join the Room Channel
            socket.join(data.roomID);

            //return the update on room object
            return getRoom;
        }
    }
    //find and Purge user
    let removeUserFromRoom = (allrooms, socket) =>{
        for(let room of allrooms){
            //Find the user 
            let findUser = room.users.findIndex((element, index, array) =>{
                if(element.socketID === socket.id){
                    return true;
                }else{
                    return false;
                }
                //element.socketID === socket.id ? true : false;
            });

            if(findUser > -1){
                socket.leave(room.roomID);
                room.users.splice(findUser, 1);
                return room;
            }
        }

    }

module.exports = {
    route,
    findOne,
    // _registerRoutes,
    createNewUser,
    findById,
    isAuthenticated,
    findRoomByName,
    randomHex,
    findRoomByID,
    addUserToChatRoom,
    removeUserFromRoom
    
}