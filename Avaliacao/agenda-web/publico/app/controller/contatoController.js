(function () {

	'use strict';

	var nome = 'ContatoController';

	angular.module('agenda').controller(nome, ['$scope', '$interval', '$http', 'contatoService', 'dominioService', contatoController]);

	function contatoController ($scope, $interval, $http, contatoService, dominioService) {
		
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
		$scope.operadoras = [];
	    $scope.sexos = [];

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
			return $scope.novo || $scope.contato != undefined && $scope.contato.id > 0;
		};

		$scope.novoContato = function () {
			limparMensagens();
			$scope.novo = true;
		};

		$scope.salvarContato = function () {
			limparMensagens();
			if ($scope.formularioCadastro.$invalid) {
				$scope.formularioCadastro.$setDirty();
				for (var propName in $scope.formularioCadastro) {
					var prop = $scope.formularioCadastro[propName];
					if (prop.$setViewValue != undefined) {
						prop.$setViewValue(prop.$viewValue);
					}
				}
				return;
			}
			var contato = $scope.contato;
			if (contato == undefined) return;
			if (contato.id != undefined && contato.id > 0) {
				contato.dataAtualizacao = new Date();
			} else {
				contato.dataCadastro = new Date();
			}
			contatoService.salvar(contato)
				.success(function (data) {
					$scope.carregarContatos();
					$scope.mensagemSucesso = data.mensagem;
				})
				.error(tratarErro);
			$scope.cancelarEdicaoContato();
		};

		$scope.editarContato = function (contato) {
			limparMensagens();
			$scope.contato = {};
			angular.extend($scope.contato, contato);
		};

		$scope.excluirContato = function (contato) {
			if(!confirm('Deseja mesmo excluir o contato "' + contato.nome + '"?')) return;
			limparMensagens();
			contatoService.excluir(contato.id)
				.success(function (data) {
					$scope.carregarContatos();
					$scope.mensagemSucesso = data.mensagem;
				})
				.error(tratarErro);
		};

		$scope.cancelarEdicaoContato = function () {
			limparMensagens();
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

		$scope.carregarDominios = function () {
			dominioService.listarOperadoras()
				.success(function (data) {
					$scope.operadoras = data.operadoras;
				})
				.error(tratarErro);
			dominioService.listarSexos()
				.success(function (data) {
					$scope.sexos = data.sexos;
				})
				.error(tratarErro);
		};

		function limparMensagens() {
			delete $scope.mensagemSucesso;
			delete $scope.mensagemErro;
		}

		function tratarErro (data) {
			$scope.mensagemErro = 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde.';
		}

		function init(){
			$interval(function () {
				$scope.agora = new Date();
			}, 1000);
			$scope.carregarContatos();
			$scope.carregarDominios();
		}

		init();
	};

})();