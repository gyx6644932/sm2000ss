
;(function(app){
	app.controller('userManageCtrl', ['$scope', "$state",'publicService',  function($scope, $state, publicService){
		
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
            		userName : $scope.seachMod.description || ""
            	}
                publicService.loading('start');
                publicService.doRequest("GET", 100, obj).success(function(r){
            		$scope.userManageList = r.data.content;
            		_self.currentPage = r.data.thisPage;
            		_self.totalItems = r.data.totalCount;
            		_self.itemsPerPage = r.data.pageSize;
            	})
            }
        };
		$scope.areaMangeDel = function(m){
			var self = this;
			if(confirm('确认删除？')){
				self.areaList.splice(self.areaList.indexOf(m),1)
				publicService.loading('start');
				publicService.doRequest("DELETE", "/nms/spring/devices/" + m.id, {}).success(function(r){
					publicService.loading('end');
					publicService.ngAlert('删除成功！', "success");
				})
			}
		}
	}]);
})(routerApp);