;
(function(app) {
	app.controller('roleManageAddEditCtrl', ['$scope', '$rootScope', "$state", "$timeout", 'publicService', function($scope, $rootScope, $state, $timeout, publicService) {

		$timeout(function() {
			if ($scope.mauto) {
				$scope.roleTitle = "修改";
				$scope.formData = $scope.mauto;
				var obj = {
					roleName: '',
					distribution: 0
				}
				publicService.doRequest("GET", 108, obj).success(function(r) {
						$scope.iMenuData = r.data;
					}) //获取菜单列表


				var obj = {
					roleName: '',
					distribution: 0
				}
				publicService.doRequest("GET", 109, obj).success(function(r) {
						$scope.iDeviceData = r.data;
					}) //获取设备列表
			} else {
				$scope.roleTitle = "添加";
				$scope.formData = {};

				var obj = {
					roleName: '',
					distribution: 0
				}
				publicService.doRequest("GET", 108, obj).success(function(r) {
						$scope.iMenuData = r.data;
					}) //获取菜单列表


				var obj = {
					roleName: '',
					distribution: 0
				}
				publicService.doRequest("GET", 109, obj).success(function(r) {
						$scope.iDeviceData = r.data;
					}) //获取设备列表
			}
		}, 0)


		$scope.backArea = function() {
			window.history.back();
			delete $rootScope.mauto;
		}

		$scope.roleManageSub = function(m) {
			var self = this;
			/*if(!verify.deviceManageEditAdd(m, publicService)) return;*/
			publicService.loading('start');

			var url, method;
			if (self.roleTitle === "修改") {
				url = 106;
				method = "POST";
			} else {
				url = 105;
				method = "POST";
			}
			var menuListSS = [],
				menuListOBJ = {};
			for (var i = 0; i < self.oMenuData.length; i++) {
				menuListSS.push({
					'id': self.oMenuData[i].id
				});
			}
			menuListOBJ = menuListSS;
			m.menuList = menuListOBJ;
			//获取菜单列表
			var deviceListSS = [],
				deviceListOBJ = {};
			for (var i = 0; i < self.oDeviceData.length; i++) {
				deviceListSS.push({
					'id': self.oDeviceData[i].id
				});
			}
			deviceListOBJ = deviceListSS;
			m.deviceList = deviceListOBJ;
			//获取设备列表
			publicService.doRequest(method, url, m, self).success(function(r) {
				if (r.errCode) {
					publicService.ngAlert(r.message, "danger");
				} else {
					if (self.roleTitle === "添加") {
						self.formData = {};
					}
					publicService.ngAlert(self.roleTitle + '成功！', "success");
				}
				self.disabledFlag = false;
			})
		}
	}]);
})(routerApp);