;(function(app){
	app.controller('systemDatabaseAutoCtrl', ['$scope','$rootScope','$http','$state', 'publicService',  function($scope, $rootScope, $http, $state, publicService){
		$scope.databaseAutoAdd = function(m){
			if(m){
				$rootScope.mauto = m;
			}
			$state.go("index.system.databaseAutoAddEdit");
		}
		publicService.loading('start');
		publicService.doRequest("GET", 11, {tableName : ""}).success(function(r){
			$scope.databaseAutoList = r.data;
			publicService.loading('end');
    	})

    	publicService.doRequest("GET", 12, {}).success(function(r){
    		$rootScope.databaseTableName = r.data;
    		publicService.loading('end');
    	})
		$scope.databaseAutoDel = function(m){
			var self = this;
			if(confirm('确认删除？')){
				self.databaseAutoList.splice(self.databaseAutoList.indexOf(m),1)
				m.isDelete = 1;
				m.delete = 1;
				publicService.loading('start');
				publicService.doRequest("POST", 13, m).success(function(data){
					publicService.loading('end');
					publicService.ngAlert('删除成功！',"success")
				})
			}
		}
	}]);
})(routerApp)