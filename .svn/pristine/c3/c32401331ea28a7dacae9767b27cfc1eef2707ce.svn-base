;(function(app){
	app.controller('alarmRuleCtrl', ['$scope','$rootScope','$http','$state', 'publicService',  function($scope, $rootScope, $http, $state, publicService){
		$scope.seach = function(m){
			var self = this;
			self.seachMod = m;
			self.paginationConf.onChange()
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
            	var _self = this,
                	obj = {
            		page : _self.currentPage,
            		pageSize : _self.itemsPerPage,
            		activeAlarmId : $scope.seachMod.activeAlarmId || "",
            		activeAlarmLevel : $scope.seachMod.activeAlarmLevel || "",
            		activeAlarmModule : $scope.seachMod.activeAlarmModule || ""
            	}
            	if($scope.seachMod.emailFlag) obj.emailFlag = $scope.seachMod.emailFlag;
                publicService.loading('start');
                publicService.doRequest("GET", 24, obj).success(function(r){
            		$scope.alarmRuleList = r.data.result;
            		_self.currentPage = r.data.thisPage;
            		_self.totalItems = r.data.totalCount;
            		_self.itemsPerPage = r.data.pageSize;
            	})
            }
        };

		$scope.alarmRuleEditAdd = function(m){
			if(m){
				$rootScope.mauto = m
			}else{
				$rootScope.mauto && delete $rootScope.mauto;
			}
			$state.go('index.alarm.alarmRuleEditAdd');
		}

		$scope.alarmRuleDel = function(m){
			var self = this;
			if(confirm('确认删除？')){
				self.alarmRuleList.splice(self.alarmRuleList.indexOf(m),1)
				m.delete = 1;
				publicService.loading('start');
				publicService.doRequest("POST", 26, m).success(function(data){
					publicService.loading('end');
					publicService.ngAlert('删除成功！',"success")
				})
			}
		}
	}]);
})(routerApp);