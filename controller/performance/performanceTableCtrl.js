;
(function(app) {
    app.controller('performanceTableCtrl', ['$scope', '$rootScope', "$state", 'publicService', function($scope, $rootScope, $state, publicService) {
        publicService.doRequest("GET", 4, {
            type: "two"
        }).success(function(data) {
            if (data.data && data.data.length > 0) {
                $scope.deviceInfo = data.data;

            }
        });
         $scope.performanceFrameM='0';
        $scope.seach = function(x) {
            if (x == 0) {
                url = 'mtie';
                time = 13;
            } else if (x == 1) {
                url = 'tdev';
                time = 11;
            } else if (x == 2) {
                url = 'freq';
                time = 11;
                0
            }
            var self = this;
            devId = self.devID.id;
            publicService.doRequest("GET", "/nms/spring/devices/" + devId + "/performance/" + url + "/" + time + "?bgnDate=", {}).success(function(r) {
                $scope.performanceList = r.data;
            })
        }
        $scope.performanceChange = function() {
            delete $scope.performanceList; 
        }


    }]);
})(routerApp);