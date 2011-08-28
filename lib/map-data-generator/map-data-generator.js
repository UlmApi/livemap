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

	var gen = function(dir, cb) {

		var mapData = {};
		mapData['stops'] = {};
		mapData['stops'].type = "FeatureCollection";
		mapData['stops'].features = [];
		mapData['shapes'] = {};
		// mapData['trips'] = [];
		/* GeoJSON format:
		   { "type": "FeatureCollection",
			 "features": [
			    { "type": "Feature",
			      "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
			      "properties": {"prop0": "value0"}			// name etc
		*/

		var gtfs = Gtfs(dir, function(res) {
			// transform all stops to GeoJSON
			var stops = res.getStops();
			for (var i in stops) {
				var point = {};	
				point.type = "Feature";	
				point.geometry = {};
				point.geometry.type = "Point";
				point.geometry.coordinates = [stops[i].stop_lon,stops[i].stop_lat];	
				point.properties = {};
				point.properties.stop_name = stops[i].stop_name;
				point.properties.stop_id = stops[i].stop_id;
				mapData['stops'].features.push(point);
			}
	
			/* now eliminiate all stops which are not contained within a trip */
			mapData['trips'] = res.getTrips();
			var allValidStops = getAllValidStops(res.getStopTimes(), mapData['trips']);
			var clear = [];

			for (var o in mapData['stops'].features) {	
				if (allValidStops[ mapData['stops'].features[o].properties.stop_id ] === true)
					clear.push(mapData['stops'].features[o])
			}
			mapData['stops'].features = clear;
			
	
			// collect all shapes and transform to GeoJSON
			// todo: use the right GeoJSON format
			var shapes = res.getShapes();
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
				}
			});		
		});
		
	};
	
	return {
		gen:gen
	};
})();
