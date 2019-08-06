'use strict';

const passport = require('passport');
const config = require('../config');
const logger = require('../logger');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const h = require('../helpers');

module.exports = () => {
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        h.findById(id)
            .then(user => done(null, user))
            .catch(error => logger.log('error', "Error when derializing the user: " + error));    
    });
    
    let authProcessor = (accessToken, refreshToken, profile, done) => {

        //find a user in the local using profile.id
        //if the user is found, return the user data using the done()
        //If thhhe user is not found,createone in local db and return
        h.findOne(profile.id)
            .then(result => {
                if(result){
                    done(null, result)
                }else {
                    //create a new user and return;
                    h.createNewUser(profile)
                        .then(newChatUser => done(null, newChatUser))
                        .catch(error => {
                            logger.log('error', "Error when creating new user: " + error);
                        });   
                }
            });
    } 

    passport.use(new FacebookStrategy(config.fb, authProcessor));
    passport.use(new TwitterStrategy(config.twitter, authProcessor));

}