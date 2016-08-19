;
(function(app) {
	app.controller('outputCardppstodConfigCtrl', ['$scope', '$rootScope', '$http', '$state', 'publicService', function($scope, $rootScope, $http, $state, publicService) {
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

		$scope.outPTPconfigEnt = function(m,mainframeNum,solt) {
			if (m) {
				$rootScope.mauto = m;
			}
			if (m.ioSignal == "PPS-TOD" || m.ioSignal == "IRIG") {
				$state.go("index.config.outPPSTODconfig");

			} else if (m.ioSignal == "PTP") {
				$state.go("index.config.outPTPconfig");
				if (port == null || port == undefined) {
					var index = '.' + mainframeNum + '.' + solt;
				} else {
					var index = '.' + mainframeNum + '.' + solt + '.' + port;

				}
				var outputPTPCommonConfig = [{
					"node": "outputPTPCommonConfigServiceMode",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigPTPstate",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigMaxClients",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigProfile",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigClockID",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigPriority1",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigPriority2",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigDomain",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigDSCP",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigAnnounceLimit",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigSyncLimit",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigDelayLimit",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigDSCPstate",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigTTL",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigTwoStep",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigUnicastNegotiate",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigAlternateMaster",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigMgmtAddrMode",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigDither",
					"index": index,
					"num": ""
				}, {
					"node": "outputPTPCommonConfigUnicastLeaseDuration",
					"index": index,
					"num": ""
				}];
				outputPTPConfigOBJ(outputPTPCommonConfig);
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