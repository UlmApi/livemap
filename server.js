var path = require('path');
var http = require('http');

var nko = require('nko')('R8N+nroFbZPS6D4n');
var express = require('express');
var ejs = require('ejs');
var io = require('socket.io');


//var events = require(path.join(__dirname,"lib","event-simulator","event-simulator.js"));
var gtfsEvents = require(path.join(__dirname,"lib","gtfs-parser","gtfs-timetable-parser.js"));
var mapDataGenerator = require(path.join(__dirname,"lib","map-data-generator","map-data-generator.js"));
var PathNormalizer = require(path.join(__dirname,"lib","path-normalizer","path-normalizer.js"));
var Gtfs = require(path.join(__dirname, "lib", "gtfs-parser", "gtfs-loader"));

var app = express.createServer();

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger());
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
	app.set('views', __dirname + '/views');
	app.register('.html', ejs);
	app.set('view engine', 'html');
});

var gtfs = Gtfs(process.env.GTFS_PATH || path.join(__dirname,"gtfs","ulm"), function(gtfsData){

	mapDataGenerator.gen(process.env.GTFS_PATH || path.join(__dirname,"gtfs","ulm"), function(mapData) {

		//calculate normalized shapes
		var pathNormalizer = PathNormalizer(mapData.getShapes());

		require(path.join(__dirname, '/routes/site'))(app, mapData.getStops(), mapData.getShapes(),mapData.getTrips());

		io = io.listen(app);
		io.sockets.on('connection', function (socket) {
		});

		/* event simulator, throws an event every 10 secs. */
		gtfsEvents.init(gtfsData, 10000, function(step) { /* 7 = speed (0..) */
			console.dir(step);
			var p = Math.floor(step.progress * 10);

			step['pointList'] = [];
			step['foo'] = p;
			for(var i = 0;i<10;i++){
				step['pointList'].push(pathNormalizer.getNormalizedPath("87001")[p+i]);
			
			}
		
			io.sockets.emit('event', step);
		});


		app.listen(parseInt(process.env.PORT) || 7777); 
		console.log('Listening on ' + app.address().port);

	});

	
});


