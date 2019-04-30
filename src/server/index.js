const express = require('express');
const os = require('os');
var port = process.env.PORT || 3000;
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

//Imports Routes
var api = require('./routes/api');

// Express
const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));
app.use(bodyParser.json({limit:'50mb'})); 
app.use(express.static('dist'));

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	next();
});


// Routes
app.use('/', api);

app.get('*', function (req, res) {
    res.redirect('/');
});

var server = http.createServer(app);
server.listen(port);
server.on('error', function (error) {
	console.log('Error', error);
});
server.on('listening', function () {
	console.log('Listening to port: ' + port);
});