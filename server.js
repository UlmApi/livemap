var http = require('http');
var nko = require('nko')('R8N+nroFbZPS6D4n');
var express = require('express');
var ejs = require('ejs');
var io = require('socket.io');

var events = require("./lib/event-simulator/event-simulator.js");
var mapDataGenerator = require("./lib/map-data-generator/map-data-generator.js");
mapDataGenerator.gen("./gtfs/ulm/");

var app = express.createServer();

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger());
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
	app.set('views', __dirname + '/views');
	app.register('.html', ejs);
	app.set('view engine', 'html');
});

require(__dirname + '/routes/site')(app);

app.listen(parseInt(process.env.PORT) || 7777); 
console.log('Listening on ' + app.address().port);


io = io.listen(app);
io.sockets.on('connection', function (socket) {
	
	socket.on('get', function (get) {
		if (get.data === "stops")
			socket.emit('stops', mapDataGenerator.getStops());
		else if (get.data === "shapes")
			socket.emit('shapes', mapDataGenerator.getShapes());
		else if (get.data === "trips")
			socket.emit('trips', mapDataGenerator.getTrips());
	});
	
});


/* event simulator, throws an event every 10 secs. */
events.init(7, function(step) { /* 7 = speed (0..) */
	io.sockets.emit('event', step);
});

