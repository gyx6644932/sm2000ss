;(function(app){
	app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    	$stateProvider
        .state('index.alarm', {
            url: '/alarm',
            views: {
                'center@index': {
                    templateUrl: 'template/alarm/alarm.html',
                    controller : "alarmFilterCtrl"
                }
            }
        })
        .state('index.alarm.filter', {//告警过滤
            url: '/filter',
            templateUrl: 'template/alarm/alarmFilter.html',
            controller : "alarmFilterCtrl"
        })
        .state('index.alarm.alarmFilterEditAdd', {//告警过滤
            url: '/alarmFilterEditAdd',
            templateUrl: 'template/alarm/alarmFilterEditAdd.html',
            controller : "alarmFilterEditAddCtrl"
        })
        .state('index.alarm.alarmRule', {//前转规则
            url: '/alarmRule',
            templateUrl: 'template/alarm/alarmRule.html',
            controller : "alarmRuleCtrl"
        })
        .state('index.alarm.alarmRuleEditAdd', {//告警过滤
            url: '/alarmRuleEditAdd',
            templateUrl: 'template/alarm/alarmRuleEditAdd.html',
            controller : "alarmRuleEditAddCtrl"
        })
	}]);
})(routerApp)

