var gtfs = require("../gtfs-parser/gtfs-loader");
var mapData = {};
mapData['stops'] = {};
mapData['stops'].type = "FeatureCollection";
mapData['stops'].features = [];
mapData['shapes'] = {};
//mapData['trips'] = [];
/* GeoJSON format:
 * { "type": "FeatureCollection",
	  "features": [
	    { "type": "Feature",
	      "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
	      "properties": {"prop0": "value0"}			// name etc
*/

exports.gen = function() {
	gtfs.load();
	
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
		point.properties.stop_id = stops[i].stop_id;
		mapData['stops'].features.push(point);
	}

	
	//
	var trips = gtfs.getTrips();
	//todo
	
	
	
	
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
		// insert the coords
		var coord = [shapes[i].shape_pt_lon,shapes[i].shape_pt_lat];	// one pair of coords
		coords[shape_id].coordinates.push(coord);						// push the pair
	}
	//mapData['shapes'] = coords;
	

}
exports.getStops = function() {
	return mapData['stops'];
}
exports.getShapes = function() {
	return mapData['shapes'];
}
exports.getTrips = function() {
	return mapData['trips'];
}

