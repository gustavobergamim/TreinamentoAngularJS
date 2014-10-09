var cors = require('cors');
var express = require('express');
var app = express();
var bp = require('body-parser');
var router = express.Router();
 
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(cors());

var contatos = [
	{ nome: 'Gustavo', telefone: '(00) 1234-5678', selecionado: 'N', operadora: { id: 1, nome: 'VIVO' }, dataCadastro: new Date() }
];

function configurarResposta (res) {
	res.header('Access-Control-Allow-Origin', '*');
}

router.get('/contato', function(req, res) {
	configurarResposta(res);
	res.json({ contatos: contatos });
});

router.post('/contato', function(req, res) {
	configurarResposta(res);
	contatos.push(req.body);
	res.json({ mensagem: 'Sucesso!' });
});

app.use('/api', router);
 
app.listen(8888, function() {
	console.log('Servidor iniciado.');
});