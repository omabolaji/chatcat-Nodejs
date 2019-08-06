'use strict';

const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const config = require('../config');
const db = require('../db');

if(process.env.NODE_ENV === 'production'){
    //Initialized session with setting for production
        module.exports = session({
            secret: config.sessionSecret,
            resave: false,
            saveUninitialized: false,
            store: new MySQLStore ({
                mysqlConnection: db.Con.connection
            })
        });
    } else{
    //Initialized session with setting for development
        module.exports = session({
            secret: config.sessionSecret,
            resave: false,
            saveUninitialized: true
        });
}




module.exports = {
    express: express
}
module.exports = {
    // config: config
}