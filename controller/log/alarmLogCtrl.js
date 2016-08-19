;(function(app){
	app.controller('alarmLogCtrl', ['$scope', 'publicService', "deviceInfoData", function($scope, publicService, deviceInfoData){
        $scope.deviceInfo = deviceInfoData.data.data;
		$scope.seach = function(m){
			$scope.seachMod = m;
			if(!$scope.devId || typeof $scope.devId.id === 'undefined'){
				publicService.ngAlert("请选择设备！","warning");
				return;
			}
			$scope.paginationConf.onChange()
		}
        $scope.paginationConf = {
            currentPage: 0,
            totalItems: 0,
            itemsPerPage: 10,
            pagesLength: 15,
            perPageOptions: [10, 20, 30, 40, 50],
            rememberPerPage: 'perPageItems',
            onChange: function(){
            	$scope.seachMod = $scope.seachMod || {};
            	if(!$scope.devId || typeof $scope.devId.id === 'undefined') return;
            	var _self = this,
                	obj = {
            		page : _self.currentPage,
            		pageSize : _self.itemsPerPage,
            		activeAlarmSource : $scope.seachMod.activeAlarmSource || "",
            		activeAlarmLevel : $scope.seachMod.activeAlarmLevel || "",
            		activeAlarmReason : $scope.seachMod.activeAlarmReason || "",
            		activeAlarmId : $scope.seachMod.activeAlarmId || "",
            		activeAlarmtimeBgn : $scope.seachMod.activeAlarmtimeBgn || "",
            		activeAlarmtimeEnd : $scope.seachMod.activeAlarmtimeEnd || "",
            		state : $scope.seachMod.state || "",
            		clearTimeBgn : $scope.seachMod.clearTimeBgn || "",
            		clearTimeEnd : $scope.seachMod.clearTimeEnd || "",
            		confirmTimeBgn : $scope.seachMod.confirmTimeBgn || "",
            		confirmTimeEnd : $scope.seachMod.confirmTimeEnd || "",
            		confirmOperator : $scope.seachMod.confirmOperator || "",
            		deviceId : $scope.devId.id
            	};
                publicService.loading('start');
                publicService.doRequest("GET", 6, obj).success(function(r){
            		$scope.alarmlogList = r.data.result;
            		_self.currentPage = r.data.thisPage;
            		_self.totalItems = r.data.totalCount;
            		_self.itemsPerPage = r.data.pageSize;
            	})
            }
        };
	}]);
})(routerApp);
