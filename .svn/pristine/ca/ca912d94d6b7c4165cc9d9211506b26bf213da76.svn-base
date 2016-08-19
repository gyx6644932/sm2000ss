;(function(app){
	app.controller('alwaysAlarm', ['$scope','$rootScope','$timeout','$stateParams', "$window", 'publicService',  function($scope, $rootScope, $timeout, $stateParams,$window, publicService){
		publicService.alwaysAlarmLoad = function(id){
			if(id){
				$timeout(function(){
					publicService.loading('start');
					publicService.doRequest("GET", "/nms/spring/devices/"+ id +"/alarms", {}).success(function(data){
						publicService.loading('end');
						if (data.errCode) {
							publicService.ngAlert(data.message, "danger");
						}else{
							$scope.alwaysAlarmList = data.data;
						}
					})
				})
			}
		}
		publicService.alwaysAlarmLoad($stateParams.id)
		$scope.alwaysAlarmSub = function(m){
			if(m.state === 2) return ;
			m.state = 2;
			publicService.loading('start');
			publicService.doRequest("POST", "/nms/spring/devices2/"+ m.deviceId +"/updateActiveAlarmState", m).success(function(data){
				// publicService.loading('end');
				// if (data.errCode) {
				// 	publicService.ngAlert(data.message, "danger");
				// }else{
				// 	$scope.init();
				// }
			})
		}
		$scope.alwaysAlarmClear = function(m){
			m.state = 3;
			var self = this;
			self.alwaysAlarmList.splice(self.alwaysAlarmList.indexOf(m), 1)
			publicService.doRequest("POST", "/nms/spring/devices2/"+ m.deviceId +"/updateActiveAlarmState", m).success(function(data){
				debugger
			})
		}
		$scope.alwaysAlarmBack = function(){
			window.history.back();
		}
	}]);
})(routerApp);