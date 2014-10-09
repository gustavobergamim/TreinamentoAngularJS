var express = require('express');
var app = express();

var http = require('http').Server(app);

var socketIo = require('socket.io');
var io = socketIo(http);

app.get('/jquery', function(req, res) {
	res.sendFile(__dirname + '/jquery-2.1.1.min.js');
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	
	console.log('alguem se conectou...');

	socket.on('disconnect', function (socket) {
		console.log('alguem saiu...');
	});

	socket.on('enviar mensagem', function (dados) {
		io.emit('receber mensagem', dados);
	});
});

http.listen(8888);