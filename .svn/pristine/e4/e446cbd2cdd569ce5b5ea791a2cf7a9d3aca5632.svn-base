;
(function(app) {
	app.controller('outputCardPTPConfigCtrl', ['$scope', '$rootScope', '$http', '$state', 'publicService', function($scope, $rootScope, $http, $state, publicService) {

		$scope.ptpData = $scope.mauto;
		$scope.mainframeNum = $scope.mauto.mainframeNum;
		$scope.solt = $scope.mauto.solt;
		$scope.devID = $scope.mauto.devID;

		if ($scope.port == null || $scope.port == undefined) {
			var index = '.' + $scope.mainframeNum + '.' + $scope.solt + '.1';
		} else {
			var index = '.' + $scope.mainframeNum + '.' + $scope.solt + '.' + $scope.port;

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

		function outputPTPConfigOBJ(OBJ) {
			publicService.doRequest("POST", "/nms/spring/devices/" + $scope.devID.id + "/getDeviceParamColl", 
				OBJ).success(function(result) {
				if (!result || !result.data || result.data.length < 0) return;
				$scope.PTPCommonConfig = result.data;
/*				for (var i = 0; i < data.length; i++) {
					if (OBJ[i].node == "outputPTPNetworkConfigIpInfo") {
						ip = data[i][OBJ[i].node].split(',');
						addr = ip[0];
						mask = ip[1];
						gateway = ip[2];
						$('#ipAddress').val(addr);
						$('#maskAddress').val(mask);
						$('#gatewayAddress').val(gateway);
					} else {
						$('#' + OBJ[i].node + '').val(data[i][OBJ[i].node]);
					}
				}*/
			})
		}

	}]);
})(routerApp)