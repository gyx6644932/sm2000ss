;(function(app){
	app.controller('alarmFilterEditAddCtrl', ['$scope','$rootScope','$http','$state', "$window", 'publicService',  function($scope, $rootScope, $http, $state,$window, publicService){
		if($scope.mauto){
			$scope.alarmFilterTitle = "修改";
		}else{
			$scope.alarmFilterTitle = "添加";
		}
		$scope.alarmFilterEditAddsub = function(m){
			if(!m) m = {};
			if(!verify.alarmFilterEditAdd(m, publicService)) return;
			publicService.doRequest("POST", 23, m).success(function(data){
				publicService.loading('end');
				publicService.ngAlert($scope.alarmFilterTitle + '成功！',"success");
				if($scope.alarmFilterTitle === "添加"){
					delete $scope.mauto
				}
			})
		}
		$scope.backFilter = function(){
			$rootScope.mauto && delete $rootScope.mauto;
			//window.history.back();
			$state.go('index.alarm.filter');
		}
	}]);
})(routerApp);
