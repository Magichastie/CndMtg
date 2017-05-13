var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require("fs");
var prices = require('./priceExtract');
var async = require('async');
var io = require('socket.io')(http);

io.on('connection', function(socket) {
	console.log('A user connected');
	socket.on('getPrices', function(data) {
		prices.getPrices(data, function(products) {
			socket.emit('products', JSON.stringify(products));
		}, true);
	});
	socket.on('disconnect', function() {
		console.log('A user disconnected');
	});
});

app.use(express.static('content'));

app.get('', function(req, res) {
	console.log('hi');
	fs.readFile('content/main.html', function (err, data) {
		if (err) {
			console.log(err);
			// HTTP Status: 404 : NOT FOUND
			// Content Type: text/plain
			res.writeHead(404, {'Content-Type': 'text/html'});
		}else{	
			//Page found	  
			// HTTP Status: 200 : OK
			// Content Type: text/plain
			res.writeHead(200, {'Content-Type': 'text/html'});	

			// Write the content of the file to response body
			res.write(data.toString());		
		}
		// Send the response body 
		res.end();
	});   
});

app.get('/getPrices', function(req, res) {
	console.log('getPrices for %s', req.query.card);

	prices.getPrices(req.query.card, function(products) {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON.stringify(products));
		res.end();
	}, false);
});

app.get('/noodle', function(req, res) {
	res.end('Brittany is the BIGGEST noodle\n \
			\nLove, W');
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

http.listen(server_port, function() { console.log("Listening on  localhost:8080")});

//var server = app.listen(server_port, server_ip_address, function(){
//  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
//});

/*
   var server = app.listen(server_port, server_ip_address, function() {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
   });

/*
var http = require("http");
http.createServer(function (request, response) {

response.writeHead(200, {'Content-Type': 'text/plain'});

response.end('Brittany is a noodle\n \
\nLove, W');
}).listen(8081, "0.0.0.0");

console.log('Server running at http://0.0.0.0:8081');
*/
