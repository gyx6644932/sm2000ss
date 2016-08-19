;(function(app){
	app.controller('otherSoundCtrl', ['$scope','$rootScope','$http','$state', 'publicService',  function($scope, $rootScope, $http, $state, publicService){
		var otherSound = JSON.parse(localStorage.getItem("otherSound"));
		$scope.otherSoundMod = {};
		$scope.otherSoundMod.soundOffOn = (otherSound && otherSound.soundOffOn) === "off" ? false : true;
		$scope.otherSoundMod.soundInterval = (otherSound && otherSound.soundInterval) || 30;
		$scope.otherSoundMod.soundLength = (otherSound && otherSound.soundLength) || 6;
		$scope.otherSoundOffOn = function(){
			var self = this;
			self.otherSoundMod.soundOffOn = !self.otherSoundMod.soundOffOn;
		}
		$scope.deviceManageSub = function(m){
			var obj = {
				soundOffOn : m.soundOffOn ? "on" : "off",
				soundInterval : m.soundInterval,
				soundLength : m.soundLength
			}
			$scope.$emit("otherSoundMsg", obj);//将消息传topbar
			localStorage.setItem("otherSound", angular.toJson(obj));
			publicService.ngAlert('设置成功！', "success");
		}
	}]);
})(routerApp);
