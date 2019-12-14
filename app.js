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
const routes = require('./routes/users');

require('./common/passport')(passport); 
app.use(eSession({
	secret: 'testtsts',
	resave: true,
	saveUninitialized: true
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// sync all the database schema
sequelize.sync({force: false}).then(() => {
    console.log("database is in sync");
});

// initialize the route handlers
app.use('/', routes);

// start application server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

