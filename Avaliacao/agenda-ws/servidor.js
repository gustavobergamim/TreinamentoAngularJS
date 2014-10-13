var arrayUtils = require('./arrayUtils.js');
arrayUtils = arrayUtils();
var cors = require('cors');
var express = require('express');
var app = express();
var bp = require('body-parser');
var router = express.Router();
var url = require('url');
 
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(cors());

var operadoras = [
	{ id: 1, nome: 'VIVO' },
	{ id: 2, nome: 'Claro' },
	{ id: 3, nome: 'TIM' },
	{ id: 4, nome: 'Oi' }
];

var sexos = [
	{ id: 1, sigla: 'M', descricao: 'Masculino' },
	{ id: 2, sigla: 'F', descricao: 'Feminino' }
];

var identityContatos = 1;
var contatos = [
	{ id: identityContatos++, nome: 'Gustavo', telefone: '(00) 1234-5678', operadora: { id: 1, nome: 'VIVO' }, dataCadastro: new Date() }
];

function configurarResposta(res) {
	res.header('Access-Control-Allow-Origin', '*');
}

//listar operadoras
router.get('/operadora', function(req, res) {
	configurarResposta(res);
	res.json({ operadoras: operadoras });
});

//listar sexos
router.get('/sexo', function(req, res) {
	configurarResposta(res);
	res.json({ sexos: sexos });
});

//listar ou pesquisar por nome
router.get('/contato', function(req, res) {
	var filtroNome = req.body.nome;
	var resultadoConsulta;

	if (filtroNome != undefined && filtroNome.trim().length > 0) {
		resultadoConsulta = arrayUtils.filtrar(contatos, function(contato) {
			return contato.nome.toUpperCase().trim().indexOf(filtroNome.trim().toUpperCase()) > -1;
		});
	} else {
		resultadoConsulta = contatos;
	}

	configurarResposta(res);
	res.json({ contatos: resultadoConsulta });
});

//inserir
router.post('/contato', function(req, res) {
	var contato = req.body;
	contato.id = identityContatos++;
	contatos.push(contato);

	configurarResposta(res);
	res.json({ mensagem: 'Contato incluído com sucesso!' });
});

//alterar
router.put('/contato', function(req, res) {
	var contato = req.body;

	var indice = arrayUtils.getIndice(contatos, contato);
	if (indice > -1) {
		contatos[indice] = contato;
	}

	configurarResposta(res);
	res.json({ mensagem: 'Contato alterado com sucesso!' });
});

//excluir
router.delete('/contato', function(req, res) {

	var parametros = url.parse(req.url, true);

	var contato = {
		id: parametros.query['id']
	};

	var indice = arrayUtils.getIndice(contatos, contato);
	if (indice > -1) {
		contatos.splice(indice, 1);
	}

	configurarResposta(res);
	res.json({ mensagem: 'Contato excluído com sucesso!' });
});

app.use('/api', router);
 
app.listen(8888, function() {
	console.log('Servidor iniciado.');
});