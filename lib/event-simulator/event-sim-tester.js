var events= require("./event-simulator.js");
events.init(7, function(step) {
	console.log(step)
});