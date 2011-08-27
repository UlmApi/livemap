var fs = require("fs");
//console.log("start");

exports.loadGTFS = function(filename)  {
var data = fs.readFileSync(filename, "utf8");
var lines = data.split("\r\n");
var cols = lines[0].split(",");		
lines.shift();
//console.log(cols);
var agency = [];
for (var line in lines) {
	var fields = lines[line].split(",");
//console.log(line);
	var entry = {}	
	for (var i = 0; i<fields.length;i++) {
		
		entry[cols[i]] = fields[i];
	}
	
	agency.push(entry);
}

//console.log(agency);
return agency;
}
