var app = angular.module('listaTelefonica', []);

app.controller('ListaTelefonicaController', ['$scope', '$interval', function ($scope, $interval) {
	
	$scope.titulo = 'Lista Telefônica';
	$scope.agora = new Date();
	$scope.ordenacao = {
		campo: 'contato.nome',
		direcao: false
	};

	$scope.paginacao = {
		totalPaginas: 1,
		qtdeRegistros: 5
	};

	$scope.controlarPaginacao = function (dados) {
		return $scope.paginacao.totalPaginas * $scope.paginacao.qtdeRegistros;
	};

	$scope.fimDaLista = function () {
		return $scope.paginacao.totalPaginas < ($scope.contatos.length / $scope.paginacao.qtdeRegistros);
	};

	$scope.maisContatos = function () {
		$scope.paginacao.totalPaginas++;
	};

	$scope.contatos = [];
	for(var indice = 0; indice < 1000; indice++){
		$scope.contatos[indice] = { nome: 'Teste ' + (indice + 1), telefone: '(00) 1234-5678', selecionado: 'N', operadora: { id: 1, nome: 'VIVO' }, dataCadastro: new Date() }
	}

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
			$scope.contatos.push(contato);
		}
		$scope.cancelarEdicaoContato();
	};

	$scope.editarContato = function (indice, contato) {
		contato.indice = indice;
		$scope.contato = {};
		angular.extend($scope.contato, contato);
	};

	$scope.cancelarEdicaoContato = function () {
		delete $scope.contato;
		delete $scope.novo;
		$scope.formularioCadastro.$setPristine();
	};

	function init(){
		$interval(function () {
			$scope.agora = new Date();
		}, 1000);
	}

	init();
}]);