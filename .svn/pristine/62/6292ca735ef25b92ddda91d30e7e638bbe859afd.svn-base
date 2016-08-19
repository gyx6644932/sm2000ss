
;(function(app){
	app.controller('userManageCtrl', ['$scope','$rootScope',"$state",'publicService',  function($scope, $rootScope, $state, publicService){
		
        $scope.seach = function(m){
			$scope.seachMod = m;
			$scope.paginationConf.onChange()
		}
        $scope.paginationConf = {
            currentPage: 1,
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
            		userName : $scope.seachMod.secuLogUser || ""
            	}
                publicService.loading('start');
                publicService.doRequest("GET", 100, obj).success(function(r){
            		$scope.userManageList = r.data.content;
            		$scope.userManageList = r.data.content;
            		_self.currentPage = parseInt(r.data.number + 1);
            		_self.totalItems = r.data.totalElements;
            		_self.itemsPerPage = r.data.size;
            	})
            }
        };

        $scope.userMangeAddEdit = function(m){
            if(m){
                $rootScope.mauto = m;
            }
            $state.go("index.authority.userManageAddEdit");
        }
        
		$scope.userMangeDel = function(m){
			var self = this;
			if(confirm('确认删除？')){
				self.userManageList.splice(self.userManageList.indexOf(m),1)
				publicService.loading('start');
				publicService.doRequest("DELETE", "/nms/spring/user/" + m.id, {}).success(function(r){
					publicService.loading('end');
					publicService.ngAlert('删除成功！', "success");
				})
			}
		}
	}]);
})(routerApp);