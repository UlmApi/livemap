var mapData = require("./map-data-generator.js");

mapData.gen("../../gtfs/ulm/", function(mapData) {
	console.log(mapData);
	console.log(JSON.stringify(mapData.getStops()));
});
