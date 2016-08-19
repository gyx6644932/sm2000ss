;
(function(app) {
    app.controller('menuManageCtrl', ['$scope', '$rootScope', '$http', '$state', "ngDialog", 'publicService', function($scope, $rootScope, $http, $state, ngDialog, publicService) {

        $scope.showSelected = function(sel) {
            $scope.selectedNode = sel;
        };

        //加载拓扑与设备树
        publicService.doRequest("GET", 102, {
            level: "1"
        }).success(function(data) {
            if (data.data && data.data.length > 0) {
                $scope.menuTreeData = data.data;
                /*                for (var i = 0; i < data.data.length; i++) {
                                    if (data.data[i].subMenuList && data.data[i].subMenuList.length > 0) {
                                        $scope.tuopu = data.data[i].subMenuList;
                                        $scope.tuopuAreaId = data.data[i].id;
                                        $scope.flag = data.data[i].flag;
                                        break;
                                    }
                                }*/
            }
        });

        //打开菜单
        $scope.menuFun = function(sel) {
            ngDialog.open({
                template: "template/dialog/menuDialog.html",
                className: 'ngdialog-theme-flat ngdialog-theme-custom',
                width: 407,
                controller: function($scope, publicService) {
                    if (sel.level === '1') {
                        $scope.level = '一级';
                    } else if (sel.level === '2') {
                        $scope.level = '二级';
                    }
                    //添加菜单
                    $scope.menuAdd = function() {
                        ngDialog.close({
                            template: "template/dialog/menuDialog.html",
                            className: 'ngdialog-theme-flat ngdialog-theme-custom',
                            width: 407,
                            controller: function($scope, publicService) {

                            },
                            preCloseCallback: function($scope) {}
                        });

                        ngDialog.open({
                            template: "template/dialog/menuManageAdd.html",
                            className: 'ngdialog-theme-flat ngdialog-theme-custom',
                            width: 407,
                            controller: function($scope, publicService) {
                                if (sel.url === '111') {
                                    $scope.gg = '123';
                                } else if (sel.url === '2') {
                                    $scope.gg = '123';
                                }
                            },
                            preCloseCallback: function($scope) {}
                        });
                        /*            ngDialog.open({
                                        template: "template/dialog/menuAdd.html",
                                        className: 'ngdialog-theme-flat ngdialog-theme-custom',
                                        width: 407,
                                        controller: function($scope, publicService) {
                                            if(sel.level === '1'){
                                              $scope.level = '一级';
                                            }else if(sel.level === '2'){
                                              $scope.level = '二级';
                                            }
                                        },
                                        preCloseCallback: function($scope) {
                                            // if(!scope.dialogClose){
                                            //     instance.detach(connection);
                                            //     scope.dialogClose = false;
                                            // }
                                        }
                                    });*/
                        /*            var self = this;
                                    $scope.flag = sel.flag; //切换标识
                                    if (sel.flag && sel.flag === "area" && $scope.tuopuAreaId !== sel.id) {
                                        $scope.instance.unbind('dblclick'); //处理绑定事件
                                        $state.go('index');
                                        $scope.tuopu = sel.children;
                                        $scope.tuopuAreaId = sel.id;
                                        publicService.loads(function() {
                                            var f = {};
                                            f.areaId = $scope.tuopuAreaId,
                                                f.userid = localStorage.getItem("curUserId");
                                            publicService.doRequest("GET", 5, f).success(function(r) {
                                                $scope.tuopoData = r.data.length === 0 ? {} : r.data[0];
                                                $scope.tuopoData.data && ($scope.tuopoData.data = JSON.parse($scope.tuopoData.data));
                                                jsPlumbas($scope, publicService, ngDialog);
                                            })

                                        })
                                    }
                                    if (sel.flag && sel.flag === "device") {
                                        publicService.loading('start');
                                    }*/
                    };
                },
                preCloseCallback: function($scope) {}
            });

        };


    }]);
})(routerApp)