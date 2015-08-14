var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

// send index.html file to user for the home page
app.get('/', function(req, res) 
{
	res.sendFile(path.join(__dirname + '/index.html'));
});

// create routes for the admin section

// get an instance of the router
var adminRouter = express.Router();

adminRouter.use(function(req, res, next)
{
	console.log(req.method, req.url);
	next();
});

adminRouter.param('name', function(req, res, next, name)
{
	console.log('doing name validations on ' + name);

	req.name = name;

	next();
});

// admin main page. the dashboard (http://localhost:1337/admin)
/* adminRouter is getting the root of the admin tree, showing  
** the dashboard
*/
adminRouter.get('/', function(req, res)
{
	res.send('I am the dashboard!');
});

// posts page (http://localhost:1337/admin/users)
/* adminRouter is getting the /users section of  
** the adminRouter and applying routes to expand tree
*/
adminRouter.get('/users', function(req, res)
{
	res.send('I show all the users');
});

adminRouter.get('/users/:name', function(req, res)
{
	res.send('Hello ' + req.name + '.');
});

adminRouter.get('/posts', function(req, res)
{
	res.send('I show all the posts!');
});

// apply the routes to our application
/* This is make our server add the route tree system
** for adminRouter to our web server structure
*/
app.use('/admin', adminRouter);

// start the server
app.listen(1337);
console.log('1337 is the magic port!');