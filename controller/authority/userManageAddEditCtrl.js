;
(function(app) {
	app.controller('userManageAddEditCtrl', ['$scope', '$rootScope', "$state", "$timeout", 'publicService', function($scope, $rootScope, $state, $timeout, publicService) {

		$timeout(function() {
			if ($scope.mauto) {
				$scope.userTitle = "修改";
				$scope.formData = $scope.mauto;

				var obj = {
					userName: '',
					distribution: 0
				}
				publicService.doRequest("GET", 107, obj).success(function(r) {
						$scope.iformData = r.data;
					}) //获取角色列表
			} else {
				$scope.userTitle = "添加";
				var obj = {
					userName: '',
					distribution: 0
				}
				publicService.doRequest("GET", 107, obj).success(function(r) {
						$scope.iformData = r.data;
					}) //获取角色列表
			}
		}, 0)


		$scope.backArea = function() {
			window.history.back();
			delete $rootScope.mauto;
		}

		$scope.userManageSub = function(m) {
			var self = this;
			/*if(!verify.deviceManageEditAdd(m, publicService)) return;*/
			publicService.loading('start');

			var url, method;
			if (self.userTitle === "修改") {
				url = 104;
				method = "POST";
			} else {
				url = 101;
				method = "POST";
			}
			var roleListSS = [],
				roleListOBJ = {};
			for (var i = 0; i < self.oformData.length; i++) {
				roleListSS.push({
					'id': self.oformData[i].id
				});
			}
			roleListOBJ = roleListSS;
			m.roleList = roleListOBJ;
			self.disabledFlag = true;
			publicService.doRequest(method, url, m, self).success(function(r) {
				if (r.errCode) {
					publicService.ngAlert(r.message, "danger");
				} else {
					if (self.userTitle === "添加") {
						self.formData = {};
					}
					publicService.ngAlert(self.userTitle + '成功！', "success");
				}
				self.disabledFlag = false;
			})
		}
	}]);
})(routerApp);