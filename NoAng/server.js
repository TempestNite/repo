// get the things we need
var express = require('express');
var app = express();
var path = require('path');

// set the pubilc folder to serve public assets
// node serves front end resources here
app.use(express.static(__dirname + '/public'));

// set up our one route to the index.html file
// any req is represented by * and send user to index.html
app.get('*', function(req, res)
{
	res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

// start the server on port 8080 (http://localhost:8080)
app.listen(8080);
console.log('Magic happens on port 8080');