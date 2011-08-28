# LiveMap
### Real-time visualization of public transportation in the City of Ulm, Germany.


## What is this?

This application visualizes public transportation vehicles moving through the City of Ulm, Germany. Since the transport authority does not provide a useable data feed, we decided to scrape the timetable data and converted them into the GTFS format. We then implemented a simple GTFS parser which emulates the emission of real time event information (though it's based on the static data we liberated from their timetable prison. We hope to eventually switch the backend event emitter to realtime data in the future. If anybody out there knows someone working at the Stadtwerke Ulm, please prod them a little *nudge nudge*). The events emitted by the GTFS parser are consumed by the web application, which renders a map and moves markers according to the estimated location of each vehicle.


## Why?

This application is a contribution to the Node Knockout 2011 by UlmApi.de members. We implemented this proof-of-concept prototype within two days. It is intended to demonstrate what is possible by mashing cool technology and open data together, shaking it well and letting it boil for a while. It might also prove relaxing to watch. Except if you're using Firefox.


## Technologies used

node.js: General platform   
express.js: Middleware framework   
Socket.IO: Messaging library   
Leaflet: JavaScript mapping library   
bootstrap: CSS template   


## What is UlmApi.de?

We are a group of open data enthusiasts, mostly from the University of Ulm.


# License

	Copyright (c) 2011 
		
		Benjamin Erb
		Simon Fuchs
		Stefan Kaufmann
		Michael Mueller

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
