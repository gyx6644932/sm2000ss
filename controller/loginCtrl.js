;(function(app){
	app.controller('loginCtrl', ['$scope','$rootScope','$http','$state',function($scope,$rootScope,$http,$state){
		$scope.loginin = function(){
			$rootScope.isLogin = true;
			$state.go('index');
		}
	}]);
})(routerApp)