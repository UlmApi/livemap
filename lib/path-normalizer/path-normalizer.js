
module.exports = function(shapes){

	var normalizedPaths = {};


	/**
	 * Geo formulas taken from http://www.movable-type.co.uk/scripts/latlong.html
	 */

	if (typeof(Number.prototype.toRad) === "undefined") {
	  Number.prototype.toRad = function() {
	    return this * Math.PI / 180;
	  };
	}

	if (typeof(Number.prototype.toDeg) === "undefined") {
	  Number.prototype.toDeg = function() {
	    return this * 180 / Math.PI;
	  };
	}
	
	
	var R = 6371; // km
		
	var distanceLatLng = function(lat1,lon1, lat2, lon2){
		var dLat = (lat2-lat1).toRad();
		var dLon = (lon2-lon1).toRad();
		var lat1 = lat1.toRad();
		var lat2 = lat2.toRad();

		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c;	
		return d * 1000;	
	};
	
	var bearing = function(lat1, lon1, lat2, lon2){
		var dLon = (lon2-lon1).toRad();
		lat1 = lat1.toRad();
		lat2 = lat2.toRad();

		var y = Math.sin(dLon) * Math.cos(lat2);
		var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
		var brng = (Math.atan2(y, x).toDeg()+360) % 360;
		return brng;
	};
	
	var pointMove = function(lat1, lon1, brng, d){
		d = d/1000;

		var dist = d/R
		brng = brng.toRad();  

		lat1 = lat1.toRad();
		lon1 = lon1.toRad();
		var lat2 = Math.asin( Math.sin(lat1)*Math.cos(dist) + Math.cos(lat1)*Math.sin(dist)*Math.cos(brng) );
		var lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(dist)*Math.cos(lat1),Math.cos(dist)-Math.sin(lat1)*Math.sin(lat2));
		lon2 = (lon2+3*Math.PI)%(2*Math.PI) - Math.PI;

		return [lon2.toDeg(), lat2.toDeg()];	
	};
	
	
	//Takes a list of points ([lon,lat]), and processes it. 
	//Returns a function to calculate the estimated position on the path
	//at given percentage (0..1)
	var createPath = function(pointlist){

		var oldLat = pointlist[0][1];
		var oldLon = pointlist[0][0];

		var sum = 0;
		var distances = [];
		for(var i = 0;i<pointlist.length; i++){
			var d = distanceLatLng(oldLat, oldLon,pointlist[i][1], pointlist[i][0]);
			sum = sum + d;
			distances.push(d);
			oldLat = pointlist[i][1];
			oldLon = pointlist[i][0];				
		}
		
		return {
			getPosition : function(percentage){
				if(percentage < 0 || percentage > 1){
					return [0,0];
				}
				else if(percentage === 0){
					return pointlist[0];
				}
				else if(percentage === 1){
				
					return pointlist[pointlist.length-1];
				}
				else{
					
					var targetSum = percentage * sum;
				
					//find last point before
					var idx = 0;
					var dSum = 0;
					
					while(((dSum + distances[idx]) < targetSum) && (idx < distances.length)){
						dSum = dSum + distances[idx];
						idx++;
					}
					idx--;
					
					var delta = targetSum-dSum;
					
					var b = bearing(pointlist[idx][1], pointlist[idx][0], pointlist[idx+1][1], pointlist[idx+1][0]);
					var x = pointMove(pointlist[idx][1], pointlist[idx][0] , b, delta)
					return  x;
				}					
			}
		};
		
	};	
	
	//Takes a path list and returns a list of normalized points on the path.
	var normalize = function(pointlist, numberPoints){
	
		var path = createPath(pointlist);
	
		var normalizedPoints = [];
		for(var i = 0;i<numberPoints-1;i++){
			normalizedPoints.push(path.getPosition(i/(numberPoints-1)));
		}
		return normalizedPoints;
	};
	
	
	


	for(var s in shapes){
		normalizedPaths[s] = normalize(shapes[s].coordinates, 1000);
	}
	
	
	return {
		getNormalizedPath : function(id){
			return normalizedPaths[id];
		}		
	};
};
