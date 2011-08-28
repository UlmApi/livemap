$(document).ready(function(){

	var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/3a83164a47874169be4cabc2e8b8c449/43782/256/{z}/{x}/{y}.png';
	var cloudmadeAttribution = 'UlmApi.de, Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade';
	var cloudmade = new 	L.TileLayer(
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
	
	var StationIcon = L.Icon.extend({
	    iconUrl: 'images/station_22x22.png',
	    shadowUrl: null,
	    shadowSize: new L.Point(0,0),
	    iconSize: new L.Point(22, 22),
	    iconAnchor: new L.Point(11, 11),
	    popupAnchor: new L.Point(0,-9)
	});

	var BusIcon = L.Icon.extend({
	    iconUrl: 'images/bus_20x20.png',
	    shadowUrl: null,
	    shadowSize: new L.Point(0,0),
	    iconSize: new L.Point(20, 20),
	    iconAnchor: new L.Point(10, 10),
	    popupAnchor: new L.Point(0,-10)
	});
	
	var TramIcon = L.Icon.extend({
	    iconUrl: 'images/tram_20x20.png',
	    shadowUrl: null,
	    shadowSize: new L.Point(0,0),
	    iconSize: new L.Point(20, 20),
	    iconAnchor: new L.Point(10,10),
	    popupAnchor: new L.Point(0,-10)
	});
	
	var hIcon = new StationIcon();
	var bIcon = new BusIcon();
	var tIcon = new TramIcon();
	
	
	var nullen = function(i) {
		return (i < 10) ? i = '0' + i : i;
	};

	var getOffset = function(d) {
		/* summertime for germany, 2011 */
		if ((d.getUTCMonth() == 3 && d.getUTCDate() >= 27) ||
			(d.getUTCMonth() == 10 && d.getUTCDate() <= 30) || 
			(d.getUTCMonth() > 3 && d.getUTCMonth() < 10))
		    return 2;
		else 
		    return 1;
	}

	window.setInterval(function() {		
		var d = new Date();
		var offset = getOffset(d);

		var hrs = nullen((d.getUTCHours() + offset) % 24);
		var mins = nullen(d.getUTCMinutes());
		var secs = nullen(d.getUTCSeconds());

		$("#clock").html(hrs + ':' + mins + ':' + secs);
	}, 1000);


	/* is it a service free period= */
	var d = new Date();
	var offset = getOffset(d);
	if (
		(((d.getUTCHours() + offset) % 24) > 23 && d.getUTCMinutes() > 30) || 
		(((d.getUTCHours() + offset) % 24)) < 6){
		$("#warning").show();
	}	
	
	var stopsLayer;
	var shapeLayers = {};
	
	$.ajax({
	  url: '/data/stops',
		  success: function(data) {
			stopsLayer = new L.GeoJSON(null, {
				pointToLayer: function(latlng) { return new L.Marker(latlng, {icon : hIcon}); }
			});
		
			stopsLayer.on('featureparse', function(e) {
				// you can style features depending on their properties, etc.
				var popupText = '<b>' + e.properties.stop_name + '</b><br/>'+ e.properties.stop_longname;
				if (e.layer.setStyle) {
					e.layer.setStyle({color: e.properties.color});
					popupText += 'color: ' + e.properties.color;
				}
				e.layer.bindPopup(popupText);
			});
		
			stopsLayer.addGeoJSON(data);
	
			map.addLayer(stopsLayer);	  
		}

	});	

	$.ajax({
	  url: '/data/shapes',
		  success: function(data) {
		  
		  
		  	for(var i in data){
			  	if (data.hasOwnProperty(i)) {
					shapeLayers[i] = new L.GeoJSON();
		
					shapeLayers[i].on('featureparse', function(e) {
						
					});
					
					shapeLayers[i].addGeoJSON(data[i]);
					map.addLayer(shapeLayers[i]);	  
					
			  	}
		  	}
		}

	});
	
	var socket = io.connect('/');

	var knownTrips = {};

	
	var delayedMoveMarker = function(delay, trip, lat, lon){
		var marker = knownTrips[trip];
		setTimeout(function(){
			if(lat === 0 && lon === 0){
				map.removeLayer(marker);
				delete knownTrips[trip];
			}
			else{
				marker.setLatLng(new L.LatLng(lat, lon));
			}
		},delay);
	};




	/* event simulator, throws an event every 10 secs. */
	socket.on('event', function (data) {
	
		
		for(var trip in data){
			if(data.hasOwnProperty(trip)){
				var newMarker = false;
				if(!knownTrips[trip]){
					knownTrips[trip] = new L.Marker(new L.LatLng(data[trip][0][1], data[trip][0][0]), {icon : bIcon});
					knownTrips[trip].bindPopup(trip);
					newMarker = true;
				}	
				for(var i = 0;i<data[trip].length;i++){
					delayedMoveMarker(1000*i, trip, data[trip][i][1], data[trip][i][0]);
				}
				if(newMarker){
					map.addLayer(knownTrips[trip]);	
				}				
			}
		}
	
	/*
		var newMarker = false;
		if(!trips[step.trip_id]){
			trips[step.trip_id] = new L.Marker(new L.LatLng(step.pointList[0][1], step.pointList[0][0]), {icon : bIcon});
			newMarker = true;
		}
		for(var i = 0;i<step.pointList.length;i++){
			delayedMoveMarker(1000*i, trips[step.trip_id], step.pointList[i][1], step.pointList[i][0]);
		}
		if(newMarker){
			map.addLayer(trips[step.trip_id]);	
		}
		*/
		/* step = {progress: 0..100, timestamp: since 1970, trip_id: 0..} */
	});
		
});




