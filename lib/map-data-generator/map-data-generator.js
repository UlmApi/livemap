var path = require('path');

var Gtfs = require(path.join(__dirname, "..", "gtfs-parser", "gtfs-loader"));

module.exports = (function(){
	
	/* get all stops that are contained within the trips 
	   @return: { 'stop_id' :true, ... } */
	var getAllValidStops = function(stopTimes, trips) {
		var result = {};
		var isInTrips = function(trip_id) {
			for (var i in trips) {
				if (trips[i].trip_id == trip_id)
					return true;
			}
			return false;
		}

		for (var i in stopTimes) {
			if (isInTrips(stopTimes[i].trip_id))
				result[stopTimes[i].stop_id] = true;
		}			
			
		return result;
	};
	
	/* creates a fast lookup table for getting shapes from trip ids.
	 *
	 * shapes: {"87001":{"type":"LineString","coordinates":[[9.954786,48.394874], ... ] }
	 * trips: [{"route_id":"87001","service_id":"weekdays","trip_id":"87001w001","trip_headsign":"Böfingen","direction_id":"0","shape_id":"87001"},
	 */
	var lookupTbl = {};
	var createFastLookupTable = function(shapes, trips) {
		for (var i in trips) {
			for (var j in shapes) {
				if (trips[i].shape_id == j)
					lookupTbl[trips[i].trip_id] = {shape_id: j, shape: shapes[j]};
			}
		}
	}
	
	var getShapeIdFromTripId = function(trip_id){
		if (lookupTbl[trip_id])
			return lookupTbl[trip_id].shape_id;
		else
			return undefined;
	};
	
	/* @return: { type: 'LineString', coordinates:   [ [ 9.954786, 48.394874 ], ... ] */
	var getShapeFromTripId = function(trip_id){
		return lookupTbl[trip_id].shape;
	};
	
	/* all initial stuff should be done here, this function gets invoked on app startup */
	var gen = function(gtfs, dir, cb) {
		var mapData = {};
		mapData['stops'] = {};
		mapData['stops'].type = "FeatureCollection";
		mapData['stops'].features = [];
		mapData['shapes'] = {};
		mapData['trips'] = {};
		 
		/* GeoJSON format:
		   { "type": "FeatureCollection",
			 "features": [
			    { "type": "Feature",
			      "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
			      "properties": {"prop0": "value0"}			// name etc
		*/

		// transform all stops to GeoJSON
		var stops = gtfs.getStops();
		for (var i in stops) {
			var point = {};
			point.type = "Feature";
			point.geometry = {};
			point.geometry.type = "Point";
			point.geometry.coordinates = [stops[i].stop_lon,stops[i].stop_lat];	
			point.properties = {};
			point.properties.stop_name = stops[i].stop_name;
			point.properties.stop_longname = stops[i].stop_code;
			point.properties.stop_id = stops[i].stop_id;
			mapData['stops'].features.push(point);
		}

		/* now eliminiate all stops which are not contained within a trip */
		var trips = gtfs.getTrips();
		var allValidStops = getAllValidStops(gtfs.getStopTimes(), trips);
		var clear = [];

		for (var o in mapData['stops'].features) {	
			if (allValidStops[ mapData['stops'].features[o].properties.stop_id ] === true)
				clear.push(mapData['stops'].features[o])
		}
		mapData['stops'].features = clear;
		

		// collect all shapes and transform to GeoJSON
		// todo: use the right GeoJSON format
		var shapes = gtfs.getShapes();
		var coords = {};
		for (var i in shapes) {		// extract lon&lat
			shape_id = shapes[i].shape_id;
	
			// new shape id
			if (!coords[shape_id]){					
				coords[shape_id] = {};
				coords[shape_id].type = "LineString";
				coords[shape_id].coordinates = [];
			}
			// insert the coords, one pair of coords
			var coord = [parseFloat(shapes[i].shape_pt_lon),parseFloat(shapes[i].shape_pt_lat)];	
			coords[shape_id].coordinates.push(coord); // push the pair
		}
		mapData['shapes'] = coords;
		
		createFastLookupTable(mapData['shapes'], trips);
		
		

	   // gather tripdata for the client
	   var route;
	   for (var i in trips) {
			   if (!mapData['trips'][trips[i].trip_id]) mapData['trips'][trips[i].trip_id] = {};
			   //headsign:
			   mapData['trips'][trips[i].trip_id].trip_headsign = trips[i].trip_headsign;              
			   
			   // route stuff
			   route = gtfs.getRouteById(trips[i].route_id);
			   mapData['trips'][trips[i].trip_id].route_type = route.route_type;
			   mapData['trips'][trips[i].trip_id].route_short_name = route.route_short_name;
			   mapData['trips'][trips[i].trip_id].route_long_name = route.route_long_name;
		}

		cb({
			gen : gen,
			getStops : function() {
				return mapData['stops'];
			},
			getShapes :  function() {
				return mapData['shapes'];
			},
			getTrips : function() {
				return mapData['trips'];
			},
			getShapeIdFromTripId : getShapeIdFromTripId,
			getShapeFromTripId : getShapeFromTripId
		});		
	};
	
	return {
		gen:gen
	};
})();
