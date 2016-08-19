;(function(app){
	app.controller('networkLogCtrl', ['$scope','publicService', function($scope, publicService){
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
            	$scope.seachMod = $scope.seachMod || {};
            	var _self = this,
                	obj = {
            		page : _self.currentPage,
            		pageSize : _self.itemsPerPage,
            		description : $scope.seachMod.description || "",
            		bgnDate : $scope.seachMod.bgnDate || "",
            		endDate : $scope.seachMod.endDate || ""
            	}
                publicService.loading('start');
                publicService.doRequest("GET", 7, obj).success(function(r){
            		$scope.networkLogList = r.data.result;
            		_self.currentPage = r.data.thisPage;
            		_self.totalItems = r.data.totalCount;
            		_self.itemsPerPage = r.data.pageSize;
            	})
            }
        };
	}]);
})(routerApp)