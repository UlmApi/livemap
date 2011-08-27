$(document).ready(function(){

	var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/3a83164a47874169be4cabc2e8b8c449/33481/256/{z}/{x}/{y}.png', cloudmadeAttribution = 'UlmApi.de, Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade', cloudmade = new 	L.TileLayer(
		cloudmadeUrl, {
		maxZoom : 18,
		attribution : cloudmadeAttribution
	});

	var map = new L.Map('map', {
		center : new L.LatLng(48.399976,9.995399),
		zoom : 13,
		layers : [ cloudmade ],
		zoomControl : false
	});


var geojsonSample = { "type": "LineString","coordinates": [[9.954786, 48.394874], [9.954781, 48.394604], [9.954954, 48.394449], [9.957197, 48.394530], [9.957359, 48.394537], [9.957819, 48.394570], [9.957819, 48.394570], [9.958035, 48.394586], [9.958914, 48.394632], [9.960236, 48.394567], [9.960896, 48.394490], [9.961179, 48.394461], [9.961179, 48.394461], [9.961354, 48.394441], [9.961556, 48.394421], [9.962434, 48.394414], [9.962839, 48.394411], [9.963811, 48.394403], [9.963811, 48.394403], [9.964176, 48.394399], [9.965824, 48.394458], [9.967408, 48.394642], [9.967976, 48.394718], [9.968139, 48.394735], [9.968313, 48.394688], [9.968474, 48.394633], [9.968474, 48.394633], [9.969132, 48.394412], [9.970261, 48.394141], [9.971662, 48.393941], [9.972902, 48.393840], [9.972902, 48.393840], [9.973172, 48.393820], [9.974967, 48.393814], [9.976629, 48.393845], [9.978900, 48.393960], [9.979995, 48.394050], [9.980469, 48.394118], [9.980836, 48.394205], [9.981032, 48.394581], [9.981101, 48.394661], [9.981307, 48.394830], [9.981307, 48.394830], [9.981499, 48.394981], [9.982494, 48.395458], [9.983460, 48.395828], [9.984370, 48.396117], [9.984710, 48.396258], [9.984970, 48.396400], [9.984954, 48.396966], [9.984584, 48.397392], [9.984333, 48.397718], [9.984225, 48.398393], [9.984189, 48.398619], [9.984137, 48.399437], [9.984137, 48.399437], [9.984115, 48.399698], [9.984214, 48.399913], [9.984420, 48.400100], [9.984882, 48.400258], [9.985656, 48.400477], [9.987164, 48.400949], [9.987382, 48.401010], [9.987816, 48.401124], [9.987816, 48.401124], [9.988400, 48.401280], [9.989742, 48.401557], [9.991125, 48.401823], [9.992397, 48.401956], [9.993236, 48.402057], [9.993236, 48.402057], [9.993751, 48.402116], [9.995064, 48.402293], [9.996039, 48.402411], [9.996540, 48.402469], [9.998002, 48.402627], [9.998841, 48.402719], [9.999664, 48.402703], [9.999946, 48.402592], [9.999959, 48.402592], [9.999959, 48.402592], [10.000417, 48.402543], [10.000741, 48.402532], [10.002381, 48.402814], [10.003452, 48.403021], [10.003751, 48.403099], [10.003902, 48.403223], [10.004460, 48.403461], [10.004460, 48.403461], [10.005250, 48.403796], [10.005932, 48.404123], [10.006084, 48.404311], [10.006710, 48.404530], [10.007186, 48.404706], [10.007636, 48.404891], [10.007636, 48.404891], [10.008630, 48.405295], [10.009003, 48.407792], [10.009104, 48.408097], [10.008962, 48.408431], [10.008962, 48.408431], [10.008819, 48.408747], [10.008708, 48.409270], [10.008796, 48.409611], [10.009318, 48.410038], [10.009755, 48.410313], [10.010193, 48.410579], [10.010493, 48.410729], [10.010670, 48.410817], [10.010821, 48.410897], [10.010957, 48.410986], [10.011054, 48.411111], [10.011071, 48.411245], [10.010992, 48.411390], [10.010992, 48.411390], [10.010993, 48.411399], [10.010872, 48.411463], [10.010778, 48.411491], [10.010644, 48.411528], [10.010524, 48.411583], [10.010457, 48.411656], [10.010460, 48.411772], [10.010425, 48.412043], [10.010416, 48.412276], [10.010447, 48.412474], [10.010628, 48.412742], [10.010918, 48.413081], [10.011168, 48.413448], [10.011598, 48.413993], [10.011999, 48.414448], [10.012440, 48.414903], [10.012757, 48.415233], [10.013046, 48.415473], [10.013456, 48.415739], [10.013937, 48.416121], [10.014156, 48.416281], [10.014444, 48.416477], [10.015114, 48.416893], [10.015579, 48.417186], [10.015827, 48.417427], [10.015954, 48.417668], [10.015889, 48.417840], [10.015676, 48.417995], [10.015476, 48.418104], [10.015128, 48.418269], [10.015021, 48.418306], [10.014685, 48.418408], [10.014200, 48.418502], [10.013703, 48.418624], [10.013354, 48.418735], [10.013087, 48.418881], [10.012928, 48.419071], [10.012890, 48.419197], [10.012934, 48.419377], [10.013059, 48.419511], [10.013209, 48.419590], [10.013453, 48.419642], [10.013669, 48.419649], [10.013912, 48.419620], [10.014410, 48.419544], [10.014733, 48.419478], [10.015057, 48.419439], [10.015475, 48.419408], [10.015772, 48.419415], [10.016030, 48.419448], [10.016437, 48.419553], [10.016860, 48.419738], [10.017120, 48.419915], [10.017338, 48.420039], [10.017668, 48.420297], [10.017832, 48.420404], [10.017832, 48.420404], [10.018079, 48.420581], [10.018299, 48.420768], [10.018642, 48.421035], [10.018904, 48.421294], [10.019097, 48.421499], [10.019416, 48.421901], [10.019515, 48.422142], [10.019573, 48.422340], [10.019575, 48.422439], [10.019552, 48.422646], [10.019460, 48.422773], [10.019301, 48.422900], [10.019141, 48.423027], [10.018981, 48.423127], [10.018618, 48.423239], [10.018175, 48.423350], [10.017850, 48.423353], [10.017431, 48.423303], [10.017065, 48.423279], [10.016375, 48.423222], [10.015658, 48.423175], [10.015077, 48.423171], [10.014523, 48.423167], [10.014104, 48.423180], [10.014091, 48.423180], [10.014091, 48.423180], [10.013835, 48.423200], [10.013566, 48.423292], [10.013270, 48.423367], [10.013042, 48.423432], [10.012801, 48.423551], [10.012561, 48.423697], [10.012390, 48.423932], [10.012245, 48.424104], [10.012180, 48.424258], [10.012120, 48.424645], [10.012126, 48.424933], [10.012130, 48.425130], [10.012150, 48.425454], [10.012194, 48.425652], [10.012195, 48.425670], [10.012195, 48.425670], [10.012169, 48.425751], [10.012159, 48.425913], [10.012176, 48.426083], [10.012207, 48.426290], [10.012337, 48.426720], [10.012425, 48.427043], [10.012540, 48.427429], [10.012613, 48.427680], [10.012715, 48.428048], [10.012814, 48.428281], [10.012944, 48.428712], [10.013058, 48.429007], [10.013255, 48.429392], [10.013395, 48.429607], [10.013590, 48.429902], [10.013701, 48.430072], [10.013949, 48.430285], [10.013949, 48.430285], [10.014031, 48.430357], [10.014334, 48.430624], [10.014568, 48.430847], [10.014829, 48.431078], [10.015268, 48.431398], [10.015570, 48.431611], [10.015803, 48.431789], [10.016171, 48.431957], [10.016580, 48.432151], [10.017288, 48.432423], [10.018010, 48.432669], [10.018568, 48.432880], [10.019154, 48.433108], [10.019385, 48.433196], [10.019807, 48.433327], [10.019807, 48.433327], [10.020024, 48.433397], [10.020717, 48.433589], [10.021438, 48.433825], [10.022077, 48.434018], [10.022852, 48.434236], [10.023123, 48.434287], [10.023123, 48.434287], [10.023408, 48.434348], [10.023978, 48.434459], [10.024399, 48.434555], [10.024942, 48.434649], [10.025565, 48.434742], [10.026283, 48.434843], [10.026961, 48.434936], [10.027272, 48.434934], [10.027569, 48.434922], [10.027987, 48.434900], [10.028325, 48.434879], [10.028702, 48.434804], [10.029052, 48.434738], [10.029388, 48.434681], [10.029750, 48.434516], [10.030045, 48.434405], [10.030260, 48.434322], [10.030473, 48.434185], [10.030619, 48.434058], [10.030765, 48.433931], [10.030911, 48.433795], [10.031244, 48.433522], [10.031404, 48.433440], [10.031566, 48.433438], [10.031703, 48.433509], [10.031773, 48.433643], [10.031774, 48.433688]] };

//var geojsonSample = { "type": "LineString","coordinates": [[9.954786, 48.394874],   [10.013059, 48.419511], [10.012126, 48.424933],[10.030260, 48.434322], [10.031774, 48.433688]] };
//var geojsonSample = { "type": "LineString","coordinates": [[9.954786, 48.394874],   [10.013059, 48.419511], [10.031774, 48.433688]] };

var geojson = new L.GeoJSON();
		
		/* points are rendered as markers by default, but you can change this:
			
		var geojson = new L.GeoJSON(null, {
			pointToLayer: function(latlng) { return new L.CircleMarker(latlng); }
		});
		*/
		
		
		geojson.on('featureparse', function(e) {
			// you can style features depending on their properties, etc.
		});
		
		geojson.addGeoJSON(geojsonSample);
		
		map.addLayer(geojson);
		
		
		/*
		
		var marker = new L.Marker(new L.LatLng(48.394874, 9.954786));
		map.addLayer(marker);
		
		var i = 0;
		setInterval(function(){
			if(i > geojsonSample.coordinates){
				i = 0;
			}
			marker.setLatLng(new L.LatLng(geojsonSample.coordinates[i][1],geojsonSample.coordinates[i][0]))
			i++;
		}, 100);
		
		*/
		
		/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

/** Converts radians to numeric (signed) degrees */
if (typeof(Number.prototype.toDeg) === "undefined") {
  Number.prototype.toDeg = function() {
    return this * 180 / Math.PI;
  }
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
		
		var distanceLatLng2 = function(lat1,lon1, lat2, lon2){
			var d = Math.acos(Math.sin(lat1)*Math.sin(lat2) + 
	        	          Math.cos(lat1)*Math.cos(lat2) *
		                  Math.cos(lon2-lon1)) * R;
                  	return d;
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
			  brng = brng.toRad();  // 
			  
			  
			  lat1 = lat1.toRad();
			  lon1 = lon1.toRad();
			  var lat2 = Math.asin( Math.sin(lat1)*Math.cos(dist) + 
						            Math.cos(lat1)*Math.sin(dist)*Math.cos(brng) );
			  var lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(dist)*Math.cos(lat1), 
						                   Math.cos(dist)-Math.sin(lat1)*Math.sin(lat2));
			  lon2 = (lon2+3*Math.PI)%(2*Math.PI) - Math.PI;  // normalise to -180...+180
			  
			  
			  return [lon2.toDeg(), lat2.toDeg()];
		
		
		};
		
		/*
		var oldLat = geojsonSample.coordinates[0][1];
		var oldLon = geojsonSample.coordinates[0][0];
		
		var total1  = 0;
		var total2  = 0;
		geojsonSample.coordinates.forEach(function(pos){
			var d1 = distanceLatLng(oldLat, oldLon, pos[1], pos[0])
			var d2 = distanceLatLng2(oldLat, oldLon, pos[1], pos[0])
			total1 = total1 +d1 ;
			total2 = total2 +d2 ;
			oldLat = pos[1];
			oldLon = pos[0];
		});
		
		console.log(total1);
		console.log(total2);
		*/
		
		
		
		var createPath = function(pointlist){

			var oldLat = pointlist[0][1];
			var oldLon = pointlist[0][0];

			var sum = 0;
			var distances = [];
			var ratios = [0];
			for(var i = 0;i<pointlist.length; i++){
				var d = distanceLatLng(oldLat, oldLon,pointlist[i][1], pointlist[i][0]);
				sum = sum + d;
				distances.push(d);
				oldLat = pointlist[i][1];
				oldLon = pointlist[i][0];				
			}
			for(var i = 0;i<distances.length; i++){
				ratios.push( distances[i]/sum);
			}
			/*
			for(var i = 0;i<ratios.length; i++){
				console.log(i + "\t" + ratios[i] +"\t" + distances[i] || "");
			}
			*/
			
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
						
//						console.log(idx+" "+distances.length);
						var b = bearing(pointlist[idx][1], pointlist[idx][0], pointlist[idx+1][1], pointlist[idx+1][0]);
						var x = pointMove(pointlist[idx][1], pointlist[idx][0] , b, delta)
//						var x = pointMove(pointlist[idx][1], pointlist[idx][0] , 2000,0)
//						console.log(x);
//						console.log(b+"\t"+delta);
						return  x;
 					}					
				}
			};
			
		};

/*		
		var bla = [];
		var c = 20;
		for(var i = 0;i<=c;i++){
			bla.push(i/c);
		}
		var dx = createPath(geojsonSample.coordinates);
		bla.forEach(function(v){
			var p = dx.getPosition(v);
			var marker = new L.Marker(new L.LatLng(p[1],p[0]));
			map.addLayer(marker);
		});
*/		

		var dx = createPath(geojsonSample.coordinates);
		var pos = [];
		for(var i = 0;i<1000;i++){
			pos.push(dx.getPosition( i /1000));
		}
		
		/*
		var dx = createPath(geojsonSample.coordinates);
		var p = dx.getPosition(0);
		*/
		var marker1 = new L.Marker(new L.LatLng(pos[0][1],pos[0][0]));
		map.addLayer(marker1);
		var marker2 = new L.Marker(new L.LatLng(pos[0][1],pos[0][0]));
		map.addLayer(marker2);
		var marker3 = new L.Marker(new L.LatLng(pos[0][1],pos[0][0]));
		map.addLayer(marker3);
		var marker4 = new L.Marker(new L.LatLng(pos[0][1],pos[0][0]));
		map.addLayer(marker4);

		var i = 1;
		
		var next = function next(m, id){
			m.setLatLng(new L.LatLng(pos[id][1],pos[id][0]));
			
			if(id % 100 === 0){
				setTimeout(function(){
					next(m,id+1)
				}, 10000);
			}
			else{
				setTimeout(function(){
					next(m,id+1)
				}, 200);
			}
			return;		
		}
		
		setTimeout(next(marker1, 100), 5000);
		setTimeout(next(marker2, 0), 5000);
		setTimeout(next(marker3, 400), 5000);
		setTimeout(next(marker4, 500), 5000);
		

/*		
		setInterval(function(){
			marker.setLatLng(new L.LatLng(pos[i][1],pos[i][0]));
			i++;
		},500);
*/
		
		
		
});
