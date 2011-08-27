var progress, direction,speed;
var step = {};
var callback;

// speed: 10.000m == 100%
//        100m    == 1%
// 100m/10s = 10m/s
// speed in m/s
exports.init = function(speedValue, cb) {
	callback = cb;
	speed = speedValue;
	direction = 1;
	progress = 0; // because next step
	nextStep();
	setInterval(nextStep, 10000); // 10 sec
}

function nextStep() {
	progress = progress + (direction*speed*0.1); // 0.1 da alle 10s
	
	if (progress >= 100) {
		progress = 100;
		direction = -1;
	}
	if (progress <= 0) {
		progress = 0;
		direction = 1;
	}
	step.progress = progress;
	step.timestamp = (new Date()).getTime();
	step.trip_id = 1;
	
	callback(step);
	// console.log(step);
}