;(function(app){
	app.controller('systemLogCtrl', ['$scope','$rootScope','$http','$state', 'publicService', "ngDialog", function($scope, $rootScope, $http, $state, publicService,ngDialog){
		$scope.seach = function(m){
			$scope.seachMod = m;
			$scope.paginationConf.onChange()
		}
		$scope.paginationConf = {
		    currentPage: 0,
		    totalItems: 0,
		    itemsPerPage: 10,
		    pagesLength: 15,
		    perPageOptions: [10, 20, 30, 40, 50],
		    rememberPerPage: 'perPageItems',
		    onChange: function(){
		    	$scope.seachMod = $scope.seachMod || {}
		    	var _self = this,
		        	obj = {
		    		page : _self.currentPage,
		    		pageSize : _self.itemsPerPage,
		    		activeEventModule : $scope.seachMod.activeEventModule || "",
		    		activeEventDesc : $scope.seachMod.activeEventDesc || "",
		    		activeEventTimeBgn : $scope.seachMod.activeEventTimeBgn || "",
		    		activeEventTimeEnd : $scope.seachMod.activeEventTimeEnd || ""
		    	}
		        publicService.loading('start');
		        publicService.doRequest("GET", 9, obj).success(function(r){
		    		$scope.systemLogList = r.data.result;
		    		_self.currentPage = r.data.thisPage;
		    		_self.totalItems = r.data.totalCount;
		    		_self.itemsPerPage = r.data.pageSize;
		    	})
		    }
		};
	}]);
})(routerApp)