var mapData = require("./map-data-generator.js");

mapData.gen("../../gtfs/sf/", function(mapData) {
	//	console.log(mapData);
	//	console.log(JSON.stringify(mapData.getStops()));
	var trip_id = "01SFO1";
	console.log(mapData.getShapeIdFromTripId(trip_id));
	console.log(mapData.getShapeFromTripId(trip_id));
});