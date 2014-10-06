var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var fileRegex = /[\w\d_-]+\.[\w\d]+$/;

http.createServer(function (req, res) {

	var urlParams = url.parse(req.url);

	if(req.url == '/'){

		res.writeHead(200, {'Content-Type': 'text/html'});
		fs.createReadStream('teste.html').pipe(res);

	} else if (fileRegex.test(req.url)) {

		var aplicacoes = path.resolve(__dirname, '../Aplicacoes/');
		var arquivo = path.join(aplicacoes, req.url);
		
		fs.exists(arquivo, function (exists){
			
			if (exists){
				
				res.writeHead(200, {'Content-Type': 'text/html'});
				fs.createReadStream(arquivo).pipe(res);

			} else {

				res.writeHead(404, {'Content-Type': 'text/html'});
				fs.createReadStream('404.html').pipe(res);

			}
		});
	}

}).listen(8888, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8888/');