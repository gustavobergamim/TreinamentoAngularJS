(function () {

	'use strict';

	var nome = 'contatoService';

	angular.module('agenda').factory(nome, ['$http', contatoService]);

	function contatoService($http) {

		var urlBase = 'http://localhost:8888/api/contato';

		var listar = function () {
			return $http.get(urlBase);
		};

		var pesquisar = function (nome) {
			return $http.get(urlBase + '?nome=' + nome);
		};

		var salvar = function (contato) {
			if (contato.id == undefined || contato.id <= 0) {
				return incluir(contato);
			} else {
				return alterar(contato);
			}
		}

		var incluir = function (contato) {
			return $http.post(urlBase, contato);
		};

		var alterar = function (contato) {
			return $http.put(urlBase, contato);
		};

		var excluir = function (id) {
			return $http.delete(urlBase + '?id=' + id);
		};

		return {
			listar: listar,
			pesquisar: pesquisar,
			incluir: incluir,
			alterar: alterar,
			salvar: salvar,
			excluir: excluir
		};
	};

})();