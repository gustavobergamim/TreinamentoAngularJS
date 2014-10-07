var http = require('http');
http.createServer(function (req, res) {
	var statusCode = 200;
	res.write('<html>');
	res.write('<head>');
	res.write('<meta charset="utf-8" />');
	res.write('</head>');
	res.write('<body>');
	if (req.url == '/') {
		res.write('<h1>Bem vindo!</h1>');
		res.write('<a href="/contato">Contato</a>');
 	}
 	else if (req.url == '/contato') {
		res.write('<h1>Fale conosco</h1>');
		res.write('<a href="/">Voltar</a>');
 	}
 	else {
 		statusCode = 404;
		res.write('<h1>Página não encontrada.</h1>');
		res.write('<a href="/">Voltar</a>');
 	}
 	res.write('</body>');
	res.write('</html>');
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end();
}).listen(8888, function() {
	console.log('Server running at http://127.0.0.1:8888/');
});