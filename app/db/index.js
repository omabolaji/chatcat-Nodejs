'use strict';

const config = require('../config');
const logger = require('../logger');
const Mongoose= require('mongoose').connect(config.dbURI);


module.exports = () => {

    Mongoose.connection.open('error', error => {
        logger.log('error', 'MongoDB Error: ' + error);
    });

    //Create a Schema thar store user data
    const chatUser = new Mongoose.Schema({
        profileId: String,
        fullName: String,
        profilePic: String
    });

    let userModel = Mongoose.model('chatUser', chatUser);

    Mongoose,
    userModel
}
// module.exports = userModel;
// const Schema = Mongoose.Schema;
// module.exports = () => {

// const chatUser = new Schema({
//     profileId: {
//         type: String,
//         required: true
//     },
//     fullName: {
//         type: String,
//         required: true
//     },
//     profilePic: {
//         type: String,
//         required: true
//     }  
// });
// module.exports = userModel = Mongoose.model('userModel', chatUser);
// let userModel = Mongoose.model('chatUsers', chatUsers);

//     userModel,
//     Mongoose
// }

// module.exports = () => {
//     Mongoose.connection.on('connected', function() {
//         console.log(connected("Mongoose is Connected to MongoDB"));
//     });

//     Mongoose.connection.on('error', function(error) {
//         console.log(error("Mongoose Failed to connect"));
//     });
// }
 

// var Schema =  Mongoose.Schema;
// var chatUserSchema = new Schema({
//     profileId: String,
//     fullName: String,
//     profilePic: String
// });

// var chatUser  = Mongoose.model("chatUser", chatUserSchema);

// module.exports= () => {

// Mongoose.connection.on('error', error => {
//             console.log("MongoDB error", error);
//         });

// const chatUser = new Mongoose.Schema({
//     profileId: String,
//     fullName: String,
//     profilePic: String
// });
// let userModel = Mongoose.model('chatUser', chatUser);

//     Mongoose, 
//     userModel
    
// }
// module.exports = () => {
// Mongoose.connection.on('error', error => {
//     console.log("MongoDB error", error);
          
//     var yes = db.db("mychatcatdbs");
//     yes.collection("chatUsers").find({}).toArray(function(err,result){
//         if(err) throw err;
//             console.log(result);
//             db.close();
//     });
// });

// }