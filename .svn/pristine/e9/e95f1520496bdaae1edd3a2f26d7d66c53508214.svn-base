;
(function(app) {
	app.controller('outputCardConfigCtrl', ['$scope', '$rootScope', '$http', '$state', 'publicService', function($scope, $rootScope, $http, $state, publicService) {
		publicService.doRequest("GET", 4, {
			type: "two"
		}).success(function(data) {
			if (data.data && data.data.length > 0) {
				$scope.deviceInfo = data.data;

			}
		});


		$scope.macChange = function(x) {
			var self = this;
			devId = self.devID.id;
			publicService.doRequest("GET", "/nms/spring/devices/parents?type=all&id=" + devId, {}).success(function(r) {
				$scope.macConfigList = r.data;
			})
		}

		$scope.outPTPconfigEnt = function(m,mainframeNum,solt,devID) {
			if (m) {
				m.mainframeNum = mainframeNum;
				m.solt = solt;
				m.devID = devID;
				$rootScope.mauto = m;
			}
			if (m.ioSignal == "PPS-TOD" || m.ioSignal == "IRIG") {
				$state.go("index.config.outPPSTODconfig");

			} else if (m.ioSignal == "PTP") {
				$state.go("index.config.outPTPconfig");
				
			} else if (m.ioSignal == "E1-T1") {
				$state.go("index.config.outE1config");
			}
		}
		$scope.seach = function(m, x) {
			var self = this;
			if (!self.devID || typeof self.devID.id === 'undefined') {
				publicService.ngAlert("请选择设备！", "warning");
				return;
			}
			var devId = self.devID.id;
			publicService.doRequest("GET", "/nms/spring/deviceInfo/" + devId + "/getIoStatus", {
				shelfIndex: x
			}).success(function(r) {
				$scope.frameConfigList = r.data;
			})
		}


	}]);
})(routerApp)