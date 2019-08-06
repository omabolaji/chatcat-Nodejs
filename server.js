'use strict';

const express = require('express');
const app = express();
const ChatCAT = require('./app');
const session = require('express-session');
const passport = require('passport');

  //PORT SETTING
        //(1)
// const port = process.env.PORT || 5000;
// app.listen(port, () => `Server running on port ${port} 🔥`);

            //(2)
// app.listen(5000, () => {
//     console.log("Server running on port 5000");
// });

            //(3)
app.set('port', process.env.PORT || 5000);
app.use(express.static('public')); //css/js/img
app.set('view engine', 'ejs');

// app.use(session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: true }}))

app.use(ChatCAT.session);
app.use(passport.initialize());
app.use(passport.session());
app.use(require('morgan')('combined', {
    stream: {
        write: message => {
            //Write to Log
            ChatCAT.logger.log('info', message);
        }
    }
}));

// app.use(session({
//   secret: 'catscanfly',
//   resave: false,
//   saveUninitialized: false,
//    ChatCAT
// }));
// app.use(function(req, res, next) {
//  app.use(ChatCAT.session);
// ChatCAT.session
//     next();
// });

app.use('/', ChatCAT.router);

ChatCAT.ioServer(app).listen(app.get('port'), () => {
    console.log("ChatCAT running on ", app.set('port'));
});


    // module.exports = {
    //   session
    // }