// BASE SETUP
// ==========

// CALL THE PACKAGES ------------------

var express = require('express'); // CALL EXPRESS
var app = express(); // define our app using express
var bodyParser = require('body-parser') // get body-parser
var morgan = require('morgan'); // used to see requests
var mongoose = require('mongoose'); //for working w/ our db
var path = require('path');
var config = require('./config');
var User = require('./app/models/user');

var jwt = require('jsonwebtoken');
var superSecret = 'ohwonder';

mongoose.connect('mongodb://localhost:27017/test')

app.use(express.static(__dirname + '/public'));

// APP CONFIGURATION ----------------------
// use body-parser so we can grab info from POST requests

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// configure our app to handle CORS request
app.use(function(req, res, next)
{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Acess-Control-Allow-Methods', 'GET, POST');
	res . setHeader ( 'Access-Control-Allow-Headers' , 'X-Requested-'
	+ 'With,content-type,	Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));

// ROUTES FOR OUR API
// ====================================
// pass instance of express and the module
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// basic route for the home page

// MAIN CATCHALL ROUTE -----------------------------
// SEND USERS TO FRONTEND --------------------------
// has to be registered after API ROUTES
app.get('*', function(req, res)
{
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// REGISTER OUR ROUTES -----------------------------
// all of our routes will be prefixed with /api

// START THE SERVER
// ==================================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);