;(function(app){
	app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    	$stateProvider
        .state('login', {
            url: '/login',
            views: {
                '': {
                    templateUrl: 'template/login.html',
                    controller:'loginCtrl'
                }
            }
        })
	}]);
})(routerApp)