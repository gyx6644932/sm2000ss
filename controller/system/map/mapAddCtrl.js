;(function(app){
	app.controller('mapAddCtrl', ['$scope','$state', 'publicService', 'FileUploader', function($scope, $state, publicService, FileUploader){
		var uploader = $scope.uploader = new FileUploader({
            url: '/nms/spring/files/uploadImage',
            method: 'POST'
        });
        
        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        $scope.backMap = function(){
            $state.go('index.system.map');
        	//window.history.back();
        }

        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            if (!response.errCode) {
                publicService.ngAlert('上传成功！',"success")
            } else {
                publicService.ngAlert(response.message,"danger")
            }
           
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
        	publicService.ngAlert(status,"danger")
        };
	}]);
})(routerApp)