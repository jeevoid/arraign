const LocalStrategy = require('passport-local').Strategy;
const {users} = require('../models');
Passport = (passport) => {
    // serialize the user    
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(async (obj, done) => {
        let existingUser =  await users.findOne({where: {username : obj.username}});
        if (existingUser == null) {
            return done(null, false);
        }
        done(null, obj);
    });

    // sign up
    passport.use('local-signup',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },
        async (req, username, password, done) => {
            let existingUser =  await users.findOne({where: {username : username}});
            if (existingUser != null) {
                return done(null, false, {message: "get lost you already there"});
            }
            let user = await users.create({ username: username, password: password });
            return done(null, user);
        }));

        // login
        passport.use('local-login', new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },   async (req, username, password, done) => {
            let existingUser =  await users.findOne({where: {username : username}});
            if (existingUser == null) {
                return done(null, false, {message: "sorry user doesn't exist"}); 
            }
            return done(null, existingUser); 
        }));
};

module.exports = Passport;