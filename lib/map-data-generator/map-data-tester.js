var mapData= require("./map-data-generator.js");
mapData.gen("../../gtfs/ulm/");
console.log(JSON.stringify(mapData.getStops()));