(function () {

	'use strict';

	var nome = 'dominioService';

	angular.module('agenda').factory(nome, ['$http', dominioService]);

	function dominioService($http) {

		var urlOperadora = 'http://localhost:8888/api/operadora';
		var urlSexo = 'http://localhost:8888/api/sexo';

		var listarOperadoras = function () {
			return $http.get(urlOperadora);
		};

		var listarSexos = function () {
			return $http.get(urlSexo);
		};

		return {
			listarOperadoras: listarOperadoras,
			listarSexos: listarSexos
		};
	};

})();