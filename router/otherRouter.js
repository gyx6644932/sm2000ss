;(function(app){
	app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    	$stateProvider
        .state('index.other', {
            url: '/other',
            views: {
                'center@index': {
                    templateUrl: 'template/other/other.html'
                }
            }
        })
        .state('index.other.sound', {//安全
            url: '/sound',
            templateUrl: 'template/other/otherSound.html',
            controller : "otherSoundCtrl"
        })
	}]);
})(routerApp);