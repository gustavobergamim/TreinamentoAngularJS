module.exports = function ArrayUtils() {

	function filtrar(array, comparador) {
		comparador = comparador == undefined ? comparadorId : comparador;
		var resultado = [];
		for (var item in array) {
			if (comparador(item)) {
				resultado.push(item);
			}
		}
		return resultado;
	}

	function getIndice(array, itemBusca, comparador) {
		var indiceItem = -1;
		comparador = comparador == undefined ? comparadorId : comparador;
		for (var indice = 0; indice < array.length; indice++) {
			var item = array[indice];
			if (comparador(itemBusca, item)) {
				indiceItem = indice;
				break;
			}
		}
		return indiceItem;
	}

	function comparadorId(itemA, itemB) {
		return itemA.id == itemB.id;
	}

	return {
		filtrar: filtrar,
		getIndice: getIndice
	};
	
};