;(function(app){
	app.controller('areaManageCtrl', ['$scope', "$state",'publicService', "areaData", function($scope, $state, publicService, areaData){
		$scope.areaList = areaData.data.data;
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