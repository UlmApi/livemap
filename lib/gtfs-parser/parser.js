var gtfs = require("./gtfs-loader");

gtfs.load();
console.log(gtfs.getRouteById(87001));
