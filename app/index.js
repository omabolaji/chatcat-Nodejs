'use strict';

const config = require('./config');
const redis = require('redis').createClient;
const adapter = require('socket.io-redis');
//social Auth logic
require('./auth')();

    //Starting Socket.IO server instance
    let ioServer = app =>{
        app.locals.chatrooms = [];
        const server = require('http').Server(app);
        const io = require('socket.io')(server);
        io.set('transports', ['websocket']);
        //REDIS
        let pubClient = redis(config.redis.host, config.redis.port, {
            auth_pass = config.redis.password
        });
        let subClient = redis(config.redis.host, config.redis.port, {
            return_buffers: true,
            auth_pass: config.redis.password
        });
        io.adapter(adapter({
            pubClient,
            subClient
        }));
        io.use((socket, next) => {
            require('./session')(socket.request, {}, next);
        });
        require('./socket')(io, app);
        return server;
    }

    module.exports = {
        router: require('./routes')(),
        session: require('./session'),
        ioServer,
        logger: require('./logger')
    }
    // const router = require('express').Router();

        //ROUTING SETTINGS
    // let helloMiddleware = (req, res, next) => {
    //     req.hello = "This is middleware";
    //     next();
    // }
    // app.use('/', helloMiddleware);

    // app.get("/dashboard", (req, res, next) => {
    //     res.send("<h1> Welcome to our Dashboard! Middleware say: " + req.hello + "</h1> ");
    // });
    // router.get("/", (req, res, next) => {
        // res.send("<h1> Welcome to Express Framework</h1>");
        // console.log(req.hello);
        // res.sendFile(__dirname + '/views/login.htm');
        // res.render('login');
    // });


   