;(function(app){
    app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'template/index.html',
                    controller : 'indexCtrl'
                },
                'topbar@index': {
                    templateUrl: 'template/topbar.html',
                    controller:'topbarCtrl'
                }
                ,'center@index': {
                    templateUrl: 'template/tuopu.html',
                    controller:'tuopuCtrl',
                    resolve: {
                        areaData:function(publicService){
                            publicService.loading('start');/*
                            return publicService.doRequest("GET", 18, {});*/
                        },
                        mapData:function(publicService){
                            publicService.loading('start');/*
                            return publicService.doRequest("GET", 17, {});*/
                        }
                    }
                },
                'footer@index': {
                    templateUrl: 'template/footer.html'
                }
            }
        })
        .state('index.tuopuDeviceAddEdit', { //拓扑图添加修改设备
            url: '/tuopuDeviceAddEdit',
            views: {
                'center@index': {
                    templateUrl: 'template/device/deviceManageEditAdd.html',
                    controller : "deviceManageEditAddCtrl",
                    resolve: {
                        areaData:function(publicService){
                            publicService.loading('start');
                            return publicService.doRequest("GET", 18, {})
                        }
                    }
                }
            }
        })
        .state('index.alwaysAlarm', { //时实告警
            url: '/alwaysAlarm?id',
            views: {
                'center@index': {
                    templateUrl: 'template/alarm/alwaysAlarm.html',
                    controller : "alwaysAlarm"
                }
            }
        })
    }]);
})(routerApp)