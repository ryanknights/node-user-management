
var express = require('express'),
	app     = express(),
	port    = process.env.PORT || 8080;

var mongoose     = require('mongoose'),
	bodyParser   = require('body-parser'),
	flash        = require('connect-flash'),
	session      = require('express-session'),
	cookieParser = require('cookie-parser'),
	bodyParser   = require('body-parser');	

// Connect to database
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

// Configuration
app.use(cookieParser());
app.use(session({ secret : 'mysecretphrase' }));
app.use(bodyParser());
app.use(flash());

// Set our view engine to EJS
app.set('view engine', 'ejs');

// Define Routes
var indexRoutes   = require('./app/routes/index.js'),
	newUserRoutes = require('./app/routes/newuser.js'),
	userRoutes    = require('./app/routes/user.js');

app.use('/', indexRoutes);
app.use('/newuser', newUserRoutes);
app.use('/user', userRoutes);

// Start the app
app.listen(port);
console.log('Listening on port: ' + port);


