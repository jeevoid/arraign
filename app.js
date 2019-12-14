const express = require('express')
const app = express()
const port = 3000
const passport = require('passport');
const eSession = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mysql =require("mysql2");
const { sequelize } = require('./models');

require('./passport')(passport); 
app.use(eSession({
	secret: 'testtsts',
	resave: true,
	saveUninitialized: true
 } ));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

sequelize.sync({force: false}).then(() => {
    console.log("database is in sync");
});

app.get('/failed', (req, res) => {res.send('signup failed')});

app.get('/signup', function(req, res) {
    res.render('signup.ejs');
});

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/success', // redirect to the secure profile section
    failureRedirect : '/failed', // redirect back to the signup page if there is an error
}));

app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/success', // redirect to the secure profile section
    failureRedirect : '/failed', // redirect back to the signup page if there is an error
}));

app.get('/success', isLoggedIn, (req, res) => {res.send('Hello World!') });
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/signup');
}