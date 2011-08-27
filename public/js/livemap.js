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
	
	var StationIcon = L.Icon.extend({
	    iconUrl: 'images/station_22x22.png',
	    shadowUrl: null,
//	    shadowUrl: 'js/images/marker-shadow.png',
//	    shadowSize: new L.Point(41,41),
	    shadowSize: new L.Point(0,0),
	    iconSize: new L.Point(22, 22),
	    iconAnchor: new L.Point(11, 11),
	    popupAnchor: new L.Point(0,-9)
	});
	
	var hIcon = new StationIcon();
	
	
	var socket = io.connect('/');

	/* event simulator, throws an event every 10 secs. */
	socket.on('event', function (step) {
		/* step = {progress: 0..100, timestamp: since 1970, trip_id: 0..} */
		//console.log(JSON.stringify(step));
	});

	socket.emit('get', {"data": "stops"});
	socket.on('stops', function (data) {
	
	
		var geojson = new L.GeoJSON(null, {
			pointToLayer: function(latlng) { return new L.Marker(latlng, {icon : hIcon}); }
		});
		
		geojson.on('featureparse', function(e) {
			// you can style features depending on their properties, etc.
			var popupText = '<b>' + e.properties.stop_name + '</b>';
			if (e.layer.setStyle) {
				e.layer.setStyle({color: e.properties.color});
				popupText += 'color: ' + e.properties.color;
			}
			e.layer.bindPopup(popupText);
		});
		
		geojson.addGeoJSON(data);
		
		map.addLayer(geojson);
		
//		alert(data.length);
	
		//console.log(JSON.stringify(data));
	});

	socket.emit('get', {"data": "shapes"});
	socket.on('shapes', function (data) {
//		alert(data.length+"s");
		//console.log(JSON.stringify(data));
	});

	socket.emit('get', {"data": "trips"});
	socket.on('trips', function (data) {
		alert(data.length+"t");
		//console.log(JSON.stringify(data));
	});
		
});




