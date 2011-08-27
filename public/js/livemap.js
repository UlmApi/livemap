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
		
});


var socket = io.connect('/');

/* event simulator, throws an event every 10 secs. */
socket.on('event', function (step) {
	/* step = {progress: 0..100, timestamp: since 1970, trip_id: 0..} */
	//console.log(JSON.stringify(step));
});

socket.emit('get', {"data": "stops"});
socket.on('stops', function (data) {
	//console.log(JSON.stringify(data));
});

socket.emit('get', {"data": "shapes"});
socket.on('shapes', function (data) {
	//console.log(JSON.stringify(data));
});

socket.emit('get', {"data": "trips"});
socket.on('trips', function (data) {
	//console.log(JSON.stringify(data));
});

