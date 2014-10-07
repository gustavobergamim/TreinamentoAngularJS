var express = require('express');
var app = express();
var http = require('http').Server(app);

app.get('/', function(req, res) {
	res.send('<h1>Olá ExpressJS!</h1>');
});

http.listen(8888);