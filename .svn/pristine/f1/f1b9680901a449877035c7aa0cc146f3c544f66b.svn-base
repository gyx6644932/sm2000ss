;(function(app){
	app.controller('indexCtrl', ['$scope','$rootScope','$http','$state',function($scope,$rootScope,$http,$state){
	    if($rootScope.isLogin == false){
	        $state.go('index');
	    }
		$scope.$on("otherSoundMsg",function (event, msg) { //声音功能;
	        $scope.$broadcast("otherSoundMod", msg);
	    });

	}]);
})(routerApp)