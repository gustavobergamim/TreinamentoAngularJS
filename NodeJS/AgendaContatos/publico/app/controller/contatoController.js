(function () {

	'use strict';

	var nome = 'ContatoController';

	angular.module('agenda').controller(nome, ['$scope', '$interval', '$http', 'contatoService', contatoController]);

	function contatoController ($scope, $interval, $http, contatoService) {
		
		$scope.titulo = 'Lista Telefônica';
		$scope.agora = new Date();
		$scope.ordenacao = {
			campo: 'contato.nome',
			inversa: false
		};

		$scope.paginacao = {
			totalPaginas: 1,
			qtdeRegistros: 5
		};

		$scope.contatos = [];

		$scope.operadoras = [
			{ id: 1, nome: 'VIVO'},
			{ id: 2, nome: 'Claro'},
			{ id: 3, nome: 'TIM'},
			{ id: 4, nome: 'Oi'}
	    ];

	    $scope.sexos = [
	    	{id:1, sigla:'M', descricao:'Masculino'},
	    	{id:2, sigla:'F', descricao:'Feminino'}
	    ];

		$scope.controlarPaginacao = function (dados) {
			return $scope.paginacao.totalPaginas * $scope.paginacao.qtdeRegistros;
		};

		$scope.fimDaLista = function () {
			return $scope.paginacao.totalPaginas < ($scope.contatos.length / $scope.paginacao.qtdeRegistros);
		};

		$scope.maisContatos = function () {
			$scope.paginacao.totalPaginas++;
		};

		$scope.definirOrdenacao = function (campo) {
			if($scope.ordenacao.campo == campo){
				$scope.ordenacao.inversa = !$scope.ordenacao.inversa;
			} else {
				$scope.ordenacao.campo = campo;
				$scope.ordenacao.inversa = false;
			}
		};

		$scope.existemContatos = function () {
			return $scope.contatos != undefined && $scope.contatos.length > 0;
		};

		$scope.edicaoAtiva = function () {
			return $scope.novo || $scope.contato != undefined && $scope.contato.indice > -1;
		};

		$scope.salvarContato = function () {
			if($scope.formularioCadastro.$invalid){
				$scope.formularioCadastro.$setDirty();
				for(var propName in $scope.formularioCadastro){
					var prop = $scope.formularioCadastro[propName];
					if(prop.$setViewValue != undefined){
						prop.$setViewValue(prop.$viewValue);
					}
				}
				return;
			}
			var contato = $scope.contato;
			if(contato == undefined) return;
			if(contato.indice != undefined && contato.indice > -1){
				contato.dataAtualizacao = new Date();
				$scope.contatos[contato.indice] = contato;
			}else{
				contato.dataCadastro = new Date();
				contatoService.incluir(contato)
					.success(function (data) {
						$scope.carregarContatos();
					})
					.error(tratarErro);
				//$scope.contatos.push(contato);
			}
			$scope.cancelarEdicaoContato();
		};

		$scope.editarContato = function (contato) {
			var indice = $scope.contatos.indexOf(contato);
			if(indice > -1){
				contato.indice = indice;
				$scope.contato = {};
				angular.extend($scope.contato, contato);
			}
		};

		$scope.excluirContato = function (contato) {
			var indice = $scope.contatos.indexOf(contato);
			if(indice > -1){
				$scope.contatos.splice(indice, 1);
			}
		};

		$scope.cancelarEdicaoContato = function () {
			delete $scope.contato;
			delete $scope.novo;
			$scope.formularioCadastro.$setPristine();
		};

		$scope.carregarContatos = function () {
			contatoService.listar()
				.success(function (data) {
					$scope.contatos = data.contatos;
				})
				.error(tratarErro);
		};

		function tratarErro (data) {
			alert('Ocorreu um erro.');
		}

		function init(){
			$interval(function () {
				$scope.agora = new Date();
			}, 1000);
			$scope.carregarContatos();
		}

		init();
	};

})();