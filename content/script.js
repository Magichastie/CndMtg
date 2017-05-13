var productsApp = angular.module('productsApp', []);
var all_products = [];
function init() {
	$('#card_name').focus();
}

productsApp.controller('productListController', function productListController($scope) {
	var socket = io.connect();

	socket.on('products', function(data) {
		var products = JSON.parse(data);
		//		console.log(products);
		$('#products').css('visibility', 'visible');
		$('.spinner').css('display', 'none');

		all_products = all_products.concat(products);
		$scope.products = $scope.products.concat(products);
		console.log($scope.products);
		$scope.$apply();
	});

	$scope.sortFunc = function (item) {
		if(item.price != null)
			item.price = parseFloat(item.price).toFixed(2);
		return item;
	}

	$scope.compareFunc = function(a, b) {
		var a_item = a.value;
		var b_item = b.value;
		
		if(a_item.price == null && b_item.price == null) {
			return a_item.quantity - b_item.quantity;
		}
		else if (a_item.price == null) {
			return 1;
		}
		else if (b_item.price == null) {
			return -1;
		}

		if(Boolean(a_item.quantity) ^ Boolean(b_item.quantity)){
			return b_item.quantity - a_item.quantity;
		}
		if(a_item.price == b_item.price) {
			return b_item.quantity - a_item.quantity;
		}

		return a_item.price - b_item.price;
	}

	$('.search_button').click(onSearch);
	$('#card_name').keypress(function (e) {
		if (e.which == 13) {
			onSearch();
			return false; 
		}
	});

	function onSearch() {
		all_products = [];
		$scope.products = [];
		$scope.$apply();
		$('#search_wrapper').removeClass('w3-display-middle');
		$('#products').css('visibility', 'hidden');
		$('.spinner').css('display', 'block');
		var name = $('#card_name').val();
		socket.emit('getPrices', name);
	}

});

$(document).ready(function() {
	init();
});
