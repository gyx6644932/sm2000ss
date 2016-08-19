;(function(app){
	app.controller('databaseAutoAddEditCtrl', ['$scope','$rootScope',"$timeout",'$state', 'publicService',  function($scope, $rootScope, $timeout, $state, publicService){
		function bianhuan(n){
			if($scope.modelAuto && $scope.modelAuto.backupStrategy != 1){
				var f = true;
				if($scope.databaseTableName.length > 0){
					angular.forEach($scope.databaseTableName,function(data){
						if(data.objectName == n && data.subList && data.subList.length > 0){
							$scope.subTypeList = data.subList;
							f = false;
						}
					})
				}
				if(f){
					$scope.subTypeList = [];
					$scope.modelAuto.subType = "";
				}
			}
		}

		$scope.$watch("modelAuto.tableName", function(n,o){
			bianhuan(n)
		})
		$scope.backupStrategyFun = function(m){
			bianhuan(this.modelAuto.tableName)
		}
		$scope.dababaseAutoSub = function(m){
			m.isDelete = 0;
			publicService.loading('start');
			var self = this;
			self.disabledFlag = true;
			publicService.doRequest("POST", 13, m, self).success(function(data){
				publicService.ngAlert($scope.autoT + '成功！',"success");
				publicService.loading('end');
				self.disabledFlag = false;
			})
		}
		$scope.backAuto = function(){
			delete $rootScope.mauto;
			delete $rootScope.databaseTableName; 
			window.history.back();
		}
		$timeout(function() {
		    if($scope.mauto){
				$scope.modelAuto = $scope.mauto;
				$scope.autoT = '修改';
			}else{
				$scope.autoT = "添加";
				$scope.modelAuto = {};
				$scope.modelAuto.backupStrategy = 0;
			}
		}, 10);
	}]);
	// app.directive('databasetablend', function ($timeout) {
	//     return {
	//         restrict: 'A',
	//         link: function(scope, element, attr) {
	//             if (scope.$last === true) {
	//                	if(scope.$parent.databaseAutoModle){
	// 					scope.$parent.modelAuto = scope.$parent.databaseAutoModle.modelAuto;
	// 					scope.$parent.autoT = '修改';
	// 				}else{
	// 					scope.$parent.autoT = "添加";
	// 					scope.$parent.modelAuto = {};
	// 					scope.$parent.modelAuto.backupStrategy = 0;
	// 				}
	//             }
	//         }
	//     };
	// });
})(routerApp)