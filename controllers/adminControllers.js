angular.module("sportsStoreAdmin")
.constant("authUrl", "http://localhost:2403/users/login")
.controller("authCtrl", function($scope, $http, $location, authUrl){
	$scope.authenticate = function(user, pass){
		$http.post(authUrl, {
			username: user,
			password: pass
		},{
			withCredentials: true
		}).then(function(response){
			consol.log(response, "res");
			$location.path("/main");
		},function(error){
			consol.log(error, "can't connect");
			$scope.authentucationError = error
		});
	}
});
