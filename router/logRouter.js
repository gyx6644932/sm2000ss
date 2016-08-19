;(function(app){
	app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    	$stateProvider
        .state('index.log', {
            url: '/log',
            views: {
                'center@index': {
                    templateUrl: 'template/log/log.html',
                    controller : "performanceLogCtrl",
                    resolve: {
                        deviceInfoData:function(publicService){
                            publicService.loading('start');
                            return publicService.doRequest("GET", 4, {type : "two"});
                        }
                    }
                }
            }
        })
        .state('index.log.safeLog', {//安全
            url: '/safeLog',
            templateUrl: 'template/log/safeLog.html',
            controller : "safeLogCtrl"
        })
        .state('index.log.alarmLog', {//告警
            url: '/alarmLog',
            templateUrl: 'template/log/alarmLog.html',
            controller : "alarmLogCtrl",
            resolve: {
                deviceInfoData:function(publicService){
                    publicService.loading('start');
                    return publicService.doRequest("GET", 4, {type : "two"});
                }
            }
        })
        .state('index.log.networkLog', {//网管
            url: '/networkLog',
            templateUrl: 'template/log/networkLog.html',
            controller : "networkLogCtrl"
        })
        .state('index.log.operationLog', {//操作
            url: '/operationLog',
            templateUrl: 'template/log/operationLog.html',
            controller : "operationLogCtrl"
        })
        .state('index.log.performanceLog', {//性能
            url: '/performanceLog',
            templateUrl: 'template/log/performanceLog.html',
            controller : "performanceLogCtrl",
            resolve: {
                deviceInfoData:function(publicService){
                    publicService.loading('start');
                    return publicService.doRequest("GET", 4, {type : "two"});
                }
            }
        })
        .state('index.log.systemLog', {//系统
            url: '/systemLog',
            templateUrl: 'template/log/systemLog.html',
            controller : "systemLogCtrl"
        })        
	}]);
})(routerApp);