;(function(app){
	app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    	$stateProvider
        .state('index.system', {
            url: '/system',
            views: {
                'center@index': {
                    templateUrl: 'template/system/system.html',
                    controller : "mapCtrl",
                    resolve: {
                        mapDate:function($http,publicService){
                           return publicService.doRequest("GET", 17, {})
                        }
                    }
                }
            }
        })
        .state('index.system.databaseAuto', {//自动
            url: '/auto',
            templateUrl: 'template/system/database/systemDatabaseAuto.html',
            controller : "systemDatabaseAutoCtrl"
        })
        .state('index.system.databaseAutoAddEdit', {//自动添加修改
            url: '/dbaddedit',
            templateUrl: 'template/system/database/addEdit.html',
            controller:"databaseAutoAddEditCtrl"
        })
        .state('index.system.databaseManual', {//手动
            url: '/manual',
            templateUrl: 'template/system/database/systemDatabaseManual.html',
            controller : "systemDatabasManualCtrl"
        })
        .state('index.system.databaseRecord', {//记录
            url: '/record',
            templateUrl: 'template/system/database/systemDatabaseRecord.html',
            controller : "systemDatabasRecordCtrl"
        })
        .state('index.system.hardVersionMessage', {// Soft and hard软硬件管理
            url: '/hard',
            templateUrl: 'template/system/softHard/hardVersionMessage.html'
        })
        .state('index.system.softVersionMessage', {//软件版本
            url: '/soft',
            templateUrl: 'template/system/softHard/softVersionMessage.html'
        })
        .state('index.system.processMessage', {//软件进程
            url: '/process',
            templateUrl: 'template/system/softHard/processMessage.html',
            controller : "processMessageCtrl",
            resolve: {
                processDate:function($http,publicService){
                    publicService.loading('start')
                   return publicService.doRequest("GET", 16, {})
                }
            }
        })
        .state('index.system.map', {//地图管理
            url: '/map',
            templateUrl: 'template/system/map/map.html',
            controller : "mapCtrl",
            resolve: {
                mapDate:function($http,publicService){
                   return publicService.doRequest("GET", 17, {})
                }
            }
        })
        .state('index.system.mapAdd', {//地图管理
            url: '/mapAdd',
            templateUrl: 'template/system/map/mapAdd.html',
            controller : "mapAddCtrl"
        })
	}]);
})(routerApp)
