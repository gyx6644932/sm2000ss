;(function(app){
	app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    	$stateProvider
        .state('index.device', {
            url: '/device',
            views: {
                'center@index': {
                    templateUrl: 'template/device/device.html',
                    controller : "areaManageCtrl",
                    resolve: {
                        areaData:function(publicService){
                            publicService.loading('start');
                            return publicService.doRequest("GET", 18, {})
                        }
                    }
                }
            }
        })
        .state('index.device.deviceManage', {//设备管理
            url: '/deviceManage',
            templateUrl: 'template/device/deviceManage.html',
            controller : "deviceManageCtrl"
        })
        .state('index.device.deviceManageEditAdd', {//设备管理添加修改
            url: '/deviceManageEditAdd',
            templateUrl: 'template/device/deviceManageEditAdd.html',
            controller : "deviceManageEditAddCtrl",
            resolve: {
                areaData:function(publicService){
                    publicService.loading('start');
                    return publicService.doRequest("GET", 18, {})
                }
            }
        })
        .state('index.device.areaManage', {//区域管理
            url: '/areaManage',
            templateUrl: 'template/device/areaManage.html',
            controller : "areaManageCtrl",
            resolve: {
                areaData:function(publicService){
                    publicService.loading('start');
                    return publicService.doRequest("GET", 18, {})
                }
            }
        })
        .state('index.device.areaManageAdd', {
            url: '/areaManageAdd',
            templateUrl: 'template/device/areaManageAdd.html',
            controller : "areaManageAddCtrl"
        })
	}]);
})(routerApp)