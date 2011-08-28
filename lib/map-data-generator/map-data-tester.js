var mapData = require("./map-data-generator.js");

mapData.gen("../../gtfs/ulm/", function(mapData) {
	//	console.log(mapData);
	//	console.log(JSON.stringify(mapData.getStops()));
	console.log(mapData.getShapeIdFromTripId("87001w007"));
	console.log(mapData.getShapeFromTripId("87001w007"));
});