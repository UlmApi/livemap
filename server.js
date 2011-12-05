var path = require('path');
var http = require('http');

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

var gtfsdir = "ulm";

var gtfs = Gtfs(process.env.GTFS_PATH || path.join(__dirname,"gtfs",gtfsdir), function(gtfsData){

	mapDataGenerator.gen(gtfsData, process.env.GTFS_PATH || path.join(__dirname,"gtfs",gtfsdir), function(mapData) {

		//calculate normalized shapes
		var pathNormalizer = PathNormalizer(mapData.getShapes());
		
		console.dir(mapData.getTrips());

		require(path.join(__dirname, '/routes/site'))(app, mapData.getStops(), mapData.getShapes(),mapData.getTrips());

		io = io.listen(app);
		io.sockets.on('connection', function (socket) {
		});

		/* event simulator, throws an event every 10 secs. */
		gtfsEvents.init(gtfsData, 10000, function(data) {
		
			var trips = data.trips;
			
			var pushData = {};
			
			for(var i in trips){
				if(trips.hasOwnProperty(i)){
					var delta = (trips[i].progressThen - trips[i].progressNow) / 10;
					//console.log(delta);
					var pointList = [];
					
					var shapeId = mapData.getShapeIdFromTripId(i);
					if (!shapeId) continue;
					
					for(var j = 0;j<10;j++){
						var idx = Math.floor((trips[i].progressNow + j*delta)*1000);
						if(idx === 1000 || idx ===0){
							pointList.push([0,0]);
						}
						else{
							pointList.push(pathNormalizer.getNormalizedPath(shapeId)[idx]);
						}
					}
					pushData[i] = pointList;
				}
			}
			
			/*
			var p = Math.floor(step.progress * 10);

			step['pointList'] = [];
			step['foo'] = p;
			for(var i = 0;i<10;i++){
				step['pointList'].push(pathNormalizer.getNormalizedPath("87001")[p+i]);
			
			}
			*/
			io.sockets.emit('event', pushData);
		});


		app.listen(parseInt(process.env.PORT) || 7777); 
		console.log('Listening on ' + app.address().port);

	});

	
});


