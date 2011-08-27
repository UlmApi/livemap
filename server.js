var http = require('http');
var nko = require('nko')('R8N+nroFbZPS6D4n');
var express = require('express');
var ejs = require('ejs');

var app = express.createServer();

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger());
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
	app.set('views', __dirname + '/views');
	app.register('.html', ejs);
	app.set('view engine', 'html');
});

require(__dirname + '/routes/site')(app);

app.listen(parseInt(process.env.PORT) || 7777); 
console.log('Listening on ' + app.address().port);
