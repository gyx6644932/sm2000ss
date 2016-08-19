;
(function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('index.performance', {
                url: '/performance',
                views: {
                    'center@index': {
                        templateUrl: 'template/performance/performance.html',
                        controller: "performanceTableCtrl"
                    }
                }
            })
            .state('index.performance.performanceTable', { //用户管理
                url: '/performanceTable',
                templateUrl: 'template/performance/performanceTable.html',
                controller: "performanceTableCtrl"
            })
            .state('index.performance.performanceChart', { //用户管理
                url: '/performanceChart',
                templateUrl: 'template/performance/performanceChart.html',
                controller: "performanceChartCtrl"
            })
            .state('index.performance.performanceChartM1', { //用户管理
                url: '/performanceChartM1',
                templateUrl: 'template/performance/performanceChartM1.html',
                controller: "performanceChartM1Ctrl"
            })
    }]);
})(routerApp)