var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
	
	var parametros = url.parse(req.url, true);

	res.writeHead(200, {'Content-Type': 'text/html'});

	res.write('<html>');

	res.write('<head>');
	res.write('<meta charset="utf-8" />');
	res.write('</head>');

	res.write('<body>');
	
	res.write('<h1>Bem vindo!</h1>');
	res.write('<h2>Dados da requisição</h2>');

	res.write('<ul>');
	for(var chave in parametros.query) {
		res.write('<li>' + chave + ' : ' + parametros.query[chave] + '</li>');
	}
	res.write('</ul>');

 	res.write('</body>');

	res.write('</html>');
	
	res.end();

}).listen(8888, function() {
	console.log('Server running at http://127.0.0.1:8888/');
});