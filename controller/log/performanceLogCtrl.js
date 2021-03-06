;(function(app){
	app.controller('performanceLogCtrl', ['$scope', 'publicService', "deviceInfoData", function($scope, publicService,deviceInfoData){
        $scope.deviceInfo = deviceInfoData.data.data;
		$scope.seach = function(m){
            var self = this;
			self.type = self.seachMod.type;
			self.seachMod = m;
			if(!self.devID || typeof self.devID.id === 'undefined'){
				publicService.ngAlert("请选择设备！","warning");
				return;
			}
			self.paginationConf.onChange(self)
		}
        $scope.seachMod = {};
		$scope.seachMod.type = "freq"; 
        $scope.paginationConf = {
            currentPage: 0,
            totalItems: 0,
            itemsPerPage: 10,
            pagesLength: 15,
            perPageOptions: [10, 20, 30, 40, 50],
            rememberPerPage: 'perPageItems',
            onChange: function(self){
                if(self) $scope = self;
            	$scope.seachMod = $scope.seachMod || {};
            	if(!$scope.devID || typeof $scope.devID.id === 'undefined') return;
            	var _self = this,
                	obj = {
            		page : _self.currentPage,
            		pageSize : _self.itemsPerPage,    
            		devID : $scope.devID.id || "",
            		type : $scope.seachMod.type  || "",
            		monitorTimeBgn : $scope.seachMod.monitorTimeBgn  || "",
            		monitorTimeEnd : $scope.seachMod.monitorTimeEnd  || "",
            		port : $scope.seachMod.port  || ""
            	};
                publicService.loading('start');
                publicService.doRequest("GET", 10, obj).success(function(r){
            		$scope.performanceLogList = r.data.result;
            		_self.currentPage = r.data.thisPage;
            		_self.totalItems = r.data.totalCount;
            		_self.itemsPerPage = r.data.pageSize;
            	})
            }
        };
	}]);
})(routerApp)
