var csv = require("./csv-loader");

var trips = []
var agency,calendar,routes,shapes,stops,stop_times,trips;

/* gibt alle GTFS Daten zurueck */
exports.load = function()  {
	agency = csv.load("../../gtfs/ulm/agency.txt");
	calendars = csv.load("../../gtfs/ulm/calendar.txt");
	routes = csv.load("../../gtfs/ulm/routes.txt");
	shapes = csv.load("../../gtfs/ulm/shapes.txt");
	stops = csv.load("../../gtfs/ulm/stops.txt");
	stop_times = csv.load("../../gtfs/ulm/stop_times.txt");
	trips = csv.load("../../gtfs/ulm/trips.txt");
	//console.log(routes);
}

exports.getRouteById = function(id) {
	for (var route in routes) {		
		if (routes[route].route_id == id) return routes[route];		
	}
}

exports.getShapeById = function(id) {
	for (var shape in shapes) 
		if (shapes[shape].shape_id == id) return shapes[shape];
}
exports.getCalendarById = function(id) {
	for (var calendar in calendars) 
		if (calendars[calendar].service_id == id) return calendars[calendar];
}
exports.getStopById = function(id) {
	for (var stop in stops) 
		if (stops[stop].stop_id == id) return stops[stop];
}
exports.getStopTimeById = function(trip_id,stop_id) {
	for (var stop_time in stop_times) 
		if (stop_times[stop_time].trip_id == trip_id && stop_times[stop_time].stop_id == stop_id) return stop_times[stop_time];
}



