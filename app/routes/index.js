'use strict';
const h = require('../helpers');
const session = require('express-session');
const passport = require('passport');
const config = require('../config');

module.exports = () => {
    let routes = {
        'get': {
            '/': (req, res, next) => {
                res.render('login');
            },
            '/chatroom/:id': [h.isAuthenticated, (req, res, next) =>{
                //find a room by ID
                //if found, then render
                let getRoom = h.findRoomByID(req.app.locals.chatrooms, req.params.id);
                    if(getRoom === undefined){
                        return next
                    }else{
                        res.render('chatroom', {
                            user: req.user,
                            host: config.host,
                            room: getRoom.room,
                            roomID: getRoom.roomID
                        });    
                    }
            }],
            '/rooms': [h.isAuthenticated, (req, res, next) => {
                res.render('rooms', {
                    user: req.user,
                    host: config.host
                });
            }],
            '/404': (req, res, next) =>{
                res.render('404');
            },
            '/auth/facebook': passport.authenticate('facebook'),
            '/auth/facebook/callback': passport.authenticate('facebook', {
                successRedirect: '/rooms',
                failureRedirect: '/'
            }),
            '/auth/twitter': passport.authenticate('twitter'),
            '/auth/twitter/callback': passport.authenticate('twitter', {
                successRedirect: '/rooms',
                failureRedirect: '/'
            }),
            '/logout' : (req, res, next) => {
                req.logout();
                res.redirect( '/');
            }

        },
        'post': {
               
        },
        'NA': (req, res, next) =>{
            res.status(404).sendFile(process.cwd() + '/views/404.htm');
        }
    } 
    
    return h.route(routes);
    // session
    
} 
