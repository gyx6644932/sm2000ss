;
(function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('index.authority', {
                url: '/authority',
                views: {
                    'center@index': {
                        templateUrl: 'template/authority/authority.html',
                        controller: "userManageCtrl"
                    }
                }
            })
            .state('index.authority.userManage', { //用户管理
                url: '/userManage',
                templateUrl: 'template/authority/userManage.html',
                controller: "userManageCtrl"
            })


           .state('index.authority.userManageAddEdit', {
                url: '/userManageAddEdit',
                templateUrl: 'template/authority/userManageAddEdit.html',
                controller: "userManageAddEditCtrl"
            })

     

            .state('index.authority.menuManage', { //菜单管理
                url: '/menuManage',
                templateUrl: 'template/authority/menuManage.html',
                controller: "menuManageCtrl"
            })
           .state('index.authority.menuManageAdd', {
                url: '/menuManageAdd',
                templateUrl: 'template/dialog/menuManageAdd.html',
                controller: "userManageAddCtrl"
            })



           .state('index.authority.roleManageAddEdit', {
                url: '/roleManageAddEdit',
                templateUrl: 'template/authority/roleManageAddEdit.html',
                controller: "roleManageAddEditCtrl"
            })
           
            .state('index.authority.roleManage', { //角色管理
                url: '/roleManage',
                templateUrl: 'template/authority/roleManage.html',
                controller: "roleManageCtrl"
            })
            .state('index.authority.deviceManage', { //设备权限
                url: '/deviceManage',
                templateUrl: 'template/authority/deviceManage.html',
                controller: "deviceManageCtrl"
            })
    }]);
})(routerApp)