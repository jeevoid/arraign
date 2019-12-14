const express = require('express');
const router = express.Router();
const passport = require('passport');
const userHandler = require('../handlers/users/users');
const middleware = require('../handlers/middleware/middleware');

// failed message page
router.get('/failed', (req, res) => {res.send('signup failed')});

// signup page
router.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

// delete user route
router.get('/users/delete', middleware.Authenticate,userHandler.DeleteUser);

// signup 
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/success', // redirect to the secure profile section
    failureRedirect : '/failed', // redirect back to the signup page if there is an error
}));

// login
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/success', // redirect to the secure profile section
    failureRedirect : '/failed', // redirect back to the signup page if there is an error
}));

// logout
router.get('/logout', middleware.Authenticate, userHandler.Logout);

// success page
router.get('/success', middleware.Authenticate, (req, res) => {res.send('Hello World!') });

module.exports = router;


