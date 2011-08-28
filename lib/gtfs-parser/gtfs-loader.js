var path = require('path');
var csv = require(path.join(__dirname, "csv-loader"));
var Barrier = require(path.join(__dirname, "barrier-points"));

module.exports = function(dir, cb){
	
	barrier = new Barrier(7, function() {
		cb({
			load : load,
			getAgency : getAgency,
			getCalendars : getCalendars,
			getRoutes : getRoutes,
			getShapes : getShapes,
			getStops : getStops,
			getStopTimes : getStopTimes,
			getTrips : getTrips,
			getRouteById : getRouteById,
			getShapesById : getShapesById,
			getCalendarById : getCalendarById,
			getStopById : getStopById,
			getStopTimeById : getStopTimeById		
		});
	});	

	var agency, calendars, routes, shapes, stops, stop_times, trips;	
	csv.load(path.join(dir, "agency.txt"), function(data) {
		agency = data;
		barrier.submit();
	});
	
	csv.load(path.join(dir, "calendar.txt"), function(data) {
		calendars = data;
		barrier.submit();
	});
	
	csv.load(path.join(dir, "routes.txt"), function(data) {
		routes = data;
		barrier.submit();
	});
	
	csv.load(path.join(dir, "shapes.txt"), function(data) {
		shapes = data;
		barrier.submit();
	});
	
	csv.load(path.join(dir, "stops.txt"), function(data) {
		stops = data;
		barrier.submit();
	});
	
	csv.load(path.join(dir, "stop_times.txt"), function(data) {
		stop_times = data;
		barrier.submit();
	});
	
	csv.load(path.join(dir, "trips.txt"), function(data) {
		trips = data;
		barrier.submit();
	});

	/* returns all GTFS data */
	var load = function(dir)  {
		//console.log(routes);
	};

	var getAgency = function () {
		return agency;
	};
	
	var getCalendars = function () {
		return calendars;
	};
	
	var getRoutes = function () {
		return routes;
	};
	
	var getShapes = function () {
		return shapes;
	};
	
	var getStops = function () {
		return stops;
	};
	
	var getStopTimes = function () {
		return stop_times;
	};
	
	var getTrips = function () {
		return trips;
	};

	var getRouteById = function(id) {
		for (var route in routes) {		
			if (routes[route].route_id == id) return routes[route];		
		}
	};

	var getShapesById = function(id) {
		var ret = [];
		for (var i in shapes) 
			if (shapes[i].shape_id == id) ret.push(shapes[i]);
		return ret;
	};
	
	var getCalendarById = function(id) {
		for (var calendar in calendars) 
			if (calendars[calendar].service_id == id) return calendars[calendar];
	};
	
	var getStopById = function(id) {
		for (var stop in stops) 
			if (stops[stop].stop_id == id) return stops[stop];
	};
	
	var getStopTimeById = function(trip_id,stop_id) {
		for (var stop_time in stop_times) 
			if (stop_times[stop_time].trip_id == trip_id && stop_times[stop_time].stop_id == stop_id) return stop_times[stop_time];
	};
};






