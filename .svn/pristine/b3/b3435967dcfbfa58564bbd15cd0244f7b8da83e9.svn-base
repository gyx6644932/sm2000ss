;(function(app){
	app.controller('alarmFilterCtrl', ['$scope','$rootScope','$http','$state', 'publicService',  function($scope, $rootScope, $http, $state, publicService){
		var obj = {
			activeAlarmId : "",
			activeAlarmModule : "",
			activeAlarmLevel : ""
		}
		publicService.doRequest("GET", 22, obj).success(function(r){
			$scope.alarmFilterList = r.data;
		})
		
		$scope.alarmFilterEditAdd = function(m){
			if(m){
				$rootScope.mauto = m
			}else{
				$rootScope.mauto && delete $rootScope.mauto;
			}
			$state.go('index.alarm.alarmFilterEditAdd');
		}
		$scope.seach = function(m){
			if(!m) m = {};
			var o = {
				activeAlarmId : m.activeAlarmId || "",
				activeAlarmModule : m.activeAlarmModule || "",
				activeAlarmLevel : m.activeAlarmLevel || ""
			}
			publicService.doRequest("GET", 22, o).success(function(r){
				$scope.alarmFilterList = r.data;
			})
		}
		$scope.alarmFilterDel = function(m){
			var self = this;
			if(confirm('确认删除？')){
				self.alarmFilterList.splice(self.alarmFilterList.indexOf(m),1)
				m.delete = 1;
				publicService.loading('start');
				publicService.doRequest("POST", 23, m).success(function(data){
					publicService.loading('end');
					publicService.ngAlert('删除成功！',"success")
				})
			}
		}
	}]);
})(routerApp)

