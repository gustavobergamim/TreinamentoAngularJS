var app = angular.module('listaTelefonica', []);

app.controller('ListaTelefonicaController', function($scope){
	
	$scope.titulo = 'Lista Telefônica';
	$scope.contatos = [
		/*{ nome: 'Teste 1', telefone: '(00) 1234-5678', selecionado: true, operadora:{ id:1, nome: 'VIVO' } },
		{ nome: 'Teste 2', telefone: '(00) 1234-5678', selecionado: true, operadora:{ id:1, nome: 'VIVO' } },
		{ nome: 'Teste 3', telefone: '(00) 1234-5678', selecionado: true, operadora:{ id:1, nome: 'VIVO' } },
		{ nome: 'Teste 4', telefone: '(00) 1234-5678', selecionado: false, operadora:{ id:1, nome: 'VIVO' } }*/
	];

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

	$scope.existemContatos = function(){
		return $scope.contatos != undefined && $scope.contatos.length > 0;
	};

	$scope.edicaoAtiva = function(){
		return $scope.novo || $scope.contato != undefined && $scope.contato.indice > -1;
	};

	$scope.camposPreenchidos = function(){
		return $scope.contato 
			&& $scope.contato.nome 
			&& $scope.contato.nome.length > 0 
			&& $scope.contato.telefone
			&& $scope.contato.telefone.length > 0;

	};

	$scope.salvarContato = function(){
		var contato = $scope.contato;
		if(contato == undefined) return;
		if(contato.indice != undefined && contato.indice > -1){
			$scope.contatos[contato.indice] = contato;
		}else{
			$scope.contatos.push(contato);
		}
		delete $scope.contato;
		delete $scope.novo;
	};

	$scope.novoContato = function(){	
		$scope.novo = true;
	};

	$scope.editarContato = function(indice, contato){
		contato.indice = indice;
		$scope.contato = {};
		angular.extend($scope.contato, contato);
	};

	$scope.cancelarEdicaoContato = function(){
		delete $scope.contato;
		delete $scope.novo;
	};		
});