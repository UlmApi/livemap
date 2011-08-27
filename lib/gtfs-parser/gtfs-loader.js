var path = require('path');

var csv = require(path.join(__dirname, "csv-loader"));

module.exports = function(dir){

	var agency = csv.load(path.join(dir, "agency.txt"));
	var calendars = csv.load(path.join(dir, "calendar.txt"));
	var routes = csv.load(path.join(dir, "routes.txt"));
	var shapes = csv.load(path.join(dir, "shapes.txt"));
	var stops = csv.load(path.join(dir, "stops.txt"));
	var stop_times = csv.load(path.join(dir, "stop_times.txt"));
	var trips = csv.load(path.join(dir, "trips.txt"));


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


	return {
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
	};
};






