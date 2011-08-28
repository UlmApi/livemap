var path = require('path');
//var Gtfs = require(path.join(__dirname, "gtfs-parser", "gtfs-loader"));
var Gtfs = require(path.join(__dirname, "..", "gtfs-parser", "gtfs-loader"));

dir = "../../gtfs/ulm/";
var gtfs = Gtfs(dir, function(data) {
	console.log(data);
});