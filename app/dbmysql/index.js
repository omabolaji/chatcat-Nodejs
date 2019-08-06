'use strict';

const config = require('../config');
const mysql = require('mysql');  //.connect(config.dbURI);
const Con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'mychatcat'
});
    // Con.connect((err) => {
    //     if(err){
    //         console.log("Failed to Established DB connection");
    //         return;
    //     }
    //     console.log("Connection to DB is Established!");
    // });
    // Con.end((err) => {

    // });
// Con.connect((err) => {
//     if(err) throw err;
//     console.log("DB Is Connected!")
//       var sql = "CREATE TABLE users (id INT PRIMARY KEY AUTO_INCREMENT,profileId VARCHAR(255) NOT NULL, fullName VARCHAR(255) NOT NULL, profilePic VARCHAR(255) NOT NULL)";
//         Con.query(sql, (err, result) => {
//             if(err) throw err;
//             console.log("Table Created");
//         });
//         Con.end((err) =>{
//             if(err){
//                 return console.log(err.message);
//             }
//         });
// });
// Con.end((err) => {
//     if(err){

//         return console.log(err);
//     }
// })
   
    // Con.connect(function (err) {
    //     if(err) throw err;
    //         console.log("DB Connected!");
    //             Con.query("SELECT * FROM users", (err, result, fields) =>{
    //                 if(err) throw err;
    //                 console.log(result);
    //             });
    // });
    Con.connect(function (err) {
        if(err) throw err;
        console.log("DB Connected!");
            Con.query("SELECT * FROM users WHERE profileId = profileID", (err, result, fields) =>{
                if(err) throw err;
                 console.log(result);
            });
    });
    Con.connect((err) => {
        if(err) throw err;
        console.log("DB Connected!!");
            var sql = "INSERT INTO users (profileId, fullName, profilePic) VALUES(?, ?, ?)";
            Con.query(sql, (err, result, fields) => {
                if(err) throw err;
                console.log(result.affectedRows);
            });
    });
    module.exports = {
        config: config
    }