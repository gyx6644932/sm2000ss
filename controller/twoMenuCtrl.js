;(function(app){
	app.controller('twoMenuCtrl', ['$scope','$rootScope','$http','$state', 'publicService', function($scope, $rootScope, $http, $state, publicService){
		$scope.tMenu = $scope.twoMenu
		$scope.clo = 0;
		$scope.colorOne = function(i){
			$scope.clo = i;
		}
	}]);
})(routerApp)