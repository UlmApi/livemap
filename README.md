# LiveMap
### Real-time visualization of public transportation in the City of Ulm, Germany.


## What is this?

The application visualizes the movement of public transportation vehicles in the City of Ulm, Germany. Due to missing live data provided by the authorities, we scraped available data and converted them to the GTFS format. We then implemented a simple GTFS parser that emulates the emission of real time events, though based on the static schedule. We hope to evenutally switch the backend event emitter by real time data in the future. The emitted events are consumed by the web application, which renders a map and moves markers according to the estimated location of each vehicle.


## Why?

This application is a contribution to the Node Knockout 2011 by UlmApi.de members.
We implemented this proof-of-concept prototype within two days.


## Team

Michael Müller
Simon Fuchs
Benjamin Erb
Stefan Kaufmann


## Technologies used

node.js
    General platform
express.js
    Middleware framework
Socket.IO
    Messaging library
Leaflet
    JavaScript mapping library
bootstrap
    CSS template


## What is UlmApi.de?

We are a group of open data enthusiasts, mostly from the University of Ulm.




