var mapData= require("./map-data-generator.js");
mapData.gen();
console.log(JSON.stringify(mapData.get()));