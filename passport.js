
const LocalStrategy = require('passport-local').Strategy;
module.exports = function(passport) {
    // serialize the user    
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        done(null, id);
    });

    passport.use('local-signup',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, username, password, done) {
                return done(null, {"name": "rav", "id": 1});
        }));
};