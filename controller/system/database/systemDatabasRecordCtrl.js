;(function(app){
	app.controller('systemDatabasRecordCtrl', ['$scope',"$http", 'publicService',  function($scope, $http, publicService){
		publicService.loading('start');
		$scope.seachMod = {};
		$scope.seachMod.backupStrategy = 0
		publicService.doRequest("GET", 14, {"tableName" : "","backupStrategy" : "0"}).success(function(r){
			$scope.databaseRecordList = r.data;
    	})

		$scope.seach = function(m){
			!m.tableName && (m.tableName = "");
			publicService.loading('start');
			publicService.doRequest("GET", 14, m).success(function(r){
				$scope.databaseRecordList = r.data;
	    	})
		}
		$scope.recordDel = function(m){
			var self = this;
			if(confirm('确认删除？')){
				self.databaseRecordList.splice(self.databaseRecordList.indexOf(m),1);
				publicService.doRequest("DELETE", 15, {"id" : m.id}).success(function(data){
					publicService.ngAlert('删除成功！',"success")
				})
			}
		}
	}]);
})(routerApp)