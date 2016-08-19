;(function(app){
	app.controller('mapCtrl', ['$scope','publicService', "mapDate", function($scope, publicService, mapDate){
		$scope.mapList = mapDate.data.data || [];
		$scope.mapDel = function(k, v){
			var self = this;
			if(confirm('确认删除？')){
				delete $scope.mapList[k]
				publicService.doRequest("DELETE", "/nms/spring/files/delImageMap/" + v, {}).success(function(r){
					if (r.errCode) {
		               publicService.ngAlert(message, "danger")
		            } else {
		                publicService.ngAlert('删除成功！',"success")
		            }
				})
			}
		}
	}]);
})(routerApp)