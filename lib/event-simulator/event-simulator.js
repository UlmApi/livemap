module.exports = (function(){

	var progress = 0;
	var direction = 1;
	
	function nextStep(speed, callback) {
		progress = progress + (direction*speed*0.1); // x0.1 every 10s
	
		if (progress >= 100) {
			progress = 100;
			direction = -1;
		}
		if (progress <= 0) {
			progress = 0;
			direction = 1;
		}
		callback({
			progress : progress,
			timestamp :  (new Date()).getTime(),
			trip_id : 1
		});
	}

	return {
		init : function(speedValue, cb) {
			// speed: 10.000m == 100%
			//        100m    == 1%
			// 100m/10s = 10m/s
			// speed in m/s

			nextStep(speedValue, cb);
			setInterval(function(){
				nextStep(speedValue, cb);
			}, 10000);
		} 
	};



})();





