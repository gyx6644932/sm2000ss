;(function(app){
	app.controller('deviceManageEditAddCtrl', ['$scope','$rootScope', 'publicService', "$timeout", "areaData", function($scope,$rootScope, publicService,$timeout,areaData){
		$scope.backDevice = function(){
			window.history.back();
			delete $rootScope.mauto;
		}
		$scope.areaData = areaData.data.data;
		$timeout(function(){
			if($scope.mauto){
				$scope.deviceTitle = "修改";
				$scope.deviceModel = $scope.mauto;
			}else{
				$scope.deviceTitle = "添加";
				$scope.deviceModel = {};
				$scope.deviceModel.parentId = "1";//未分配区别的ID 1
				$scope.deviceModel.deviceType = "SM2000";
			}
		},0)
		$scope.deviceManageSub = function(m){
			var self = this;
			m.nodeType = 1;
			m.status = 0;
			m.ownerId = "";
			if(!verify.deviceManageEditAdd(m, publicService)) return;
			publicService.loading('start');

			var url, method;
			if(self.deviceTitle === "修改"){
				url = 21;
				method = "PUT";
				m.deviceId = m.id;
			}else{
				url = 20;
				method = "POST";
			}
			if(m.children){
				delete m.children;
				delete m.timestamp;
				delete m.imageVersion;
				delete m.moduleId;
				delete m.disconnectCount;
				delete m.parentInfo;
				delete m.flag;
				delete m.label;
				delete m.type;
				delete m.deviceStatus;
				delete m.$$hashKey;
			}
			self.disabledFlag = true;
			publicService.doRequest(method, url, m, self).success(function(r){
				if(r.errCode){
					publicService.ngAlert(r.message, "danger");
				}else{
					if(self.deviceTitle === "添加"){
						self.deviceModel = {};
						self.deviceModel.parentId = "1";//未分配区别的ID 1
						self.deviceModel.deviceType = "SM2000";
					}
					publicService.ngAlert(self.deviceTitle + '成功！', "success");
				}
				self.disabledFlag = false;
			})
		}
	}]);
})(routerApp)