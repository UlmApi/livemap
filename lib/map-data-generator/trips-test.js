var mapData = require("./map-data-generator.js");


/*
trips:
[ { route_id: '87003',
   service_id: 'university',
   trip_id: '87003ue009',
   trip_headsign: 'Ehinger Tor',
   shape_id: '87003' } ]

trips:
[ { route_id: '87003',
    service_id: 'university',
    trip_id: '87003ue009',
    trip_headsign: 'Ehinger Tor',
    shape_id: '87003' } ]


stop[features]:
{
           "geometry": {
               "coordinates": [
                   "9.493104", 
                   "48.151358"
               ], 
               "type": "Point"
           }, 
           "properties": {
               "stop_id": "9006469", 
               "stop_name": "St. Wendelinus-Stra\u00dfe"
           }, 
           "type": "Feature"
   }	

stopTimes: [ { trip_id: '87003ue009',
arrival_time: '18:15:00',
departure_time: '18:15:00',
stop_id: '9001350',
stop_sequence: '170' } ]

*/
mapData.gen("../../gtfs/ulm/", function(mapData) {
	console.log(mapData.getTrips());
	console.log(JSON.stringify(mapData.getStops()));
});
