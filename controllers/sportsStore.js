angular.module("sportsStore")
	.constant("dataUrl", "http://localhost:2403/products")
	.constant("orderUrl", "http://localhost:2403/orders")
	.controller("sportsStoreCtrl", function ($scope, $http, $location, dataUrl, orderUrl, cart){
		$scope.data = {
		};
				
		$http.get(dataUrl).then(function (response) {
			console.log(response, 'res');
			$scope.data.products = response.data;
		},function (error){
			console.log(error, " can't get data.");
			$scope.data.error = error;
		});

		$scope.sendOrder = function(shippingDetails){
			var order = angular.copy(shippingDetails);
			order.products = cart.getProducts();
			$http.post(orderUrl, order).then(function (response){
				console.log(response, 'res');
				$scope.data.orderId = response.data.id;
				cart.getProducts().length = 0;
			},function(error){
				console.log(error, " can't get data.");
				$scope.data.orderError = error;
			}).finally(function(){
				$location.path("/complete");
			});
		}
	});
