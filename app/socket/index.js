'use strict';
    const h = require('../helpers');

module.exports = (io, app) => {
    let allrooms = app.locals.chatrooms;

    // allrooms.push({
    //     room: 'Good Food',
    //     roomID: '001',
    //     users: []
    // });

    // allrooms.push({
    //     room: 'Computing Net',
    //     roomID: '002',
    //     users: []
    // });

        //Creating of Socket.IO
    io.off('/roomslist').on('connection', socket => {
        // console.log('Socket.io connected to client!');
        socket.on('getChatrooms', () => {
            socket.emit('chatRoomsList', JSON.stringify(allrooms));
        });

        socket.on('createNewRoom', newRoomInput => {
            console.log(newRoomInput);
            // Check to see if a room already exist int the chat rooms
            //else, if not exist, create one and broadcast it to everyone(users)
            if(!h.findRoomByName(allrooms, newRoomInput)){
                allrooms.push({
                    room: newRoomInput,
                    roomID: h.randomHex(),
                    users: []
                });
                    //Emit an Update list to the creator
                socket.emit('chatRoomsList', JSON.stringify(allrooms));

                    //emit an update list to everyone connected to the room page
                socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms));
            }
        });
    });

    io.off('/chatter').on('connection', socket => {

        //Join a chatRoom
        socket.on('join', data => {
            // console.log(data);
            let usersList = h.addUserToChatRoom(allrooms, data, socket);
            //update the list of active user's as show in the room
            // console.log("usersList: ", usersList);
            socket.broadcast.to(data.roomID).emit('updateUsersList', JSON.stringify(usersList.users));
            socket.emit('updateUsersList', JSON.stringify(usersList.users));
        });

        //When Socket exit
        socket.on('disconnect', () => {
        //Find the room where the user is connected and purge the user
        let room = h.removeUserFromRoom(allrooms, socket);
        socket.broadcast.to(room.roomID).emit('updateUsersList', JSON.stringify(usersList.users));
        });
        //When a new message arrive
        socket.on('newMessage', data => {
            socket.broadcast.to(data.roomID).emit('inMessage', JSON.stringify(data));
        });
    });
}