routerApp.factory('publicService', ["$http", "ngDialog","ngTip" ,"cfpLoadingBar", function($http, ngDialog, ngTip, cfpLoadingBar){
    var req = function(method, flag, data, scope){
        var url = {
            "1" : "data/menu.json",//菜单
            "3" : "/nms/spring/logs/getSecuLogByFliter", //安全日志GET
            "4" : "/nms/spring/devices/parents", //设备树GET
            "5" : "/nms/spring/viewData", //拓扑设备图位置连绑存GET POST
            "6" : "/nms/spring/activeAlarm/getByFliter", //告警日志
            "7" : "/nms/spring/logs/getGetLog", //网管日志
            "8" : "/nms/spring/logs/getCmdLogByFliter", //操作日志
            "9" : "/nms/spring/logs/getActiveEventByFliter", //系统日志
            "10" : "/nms/spring/performance/getByFliter", // 性能日志
            "11" : "/nms/spring/databaseBackup/getConfigParamByFilter", //数据库自动备份列表
            "12" : "/nms/spring/databaseBackup/getBackupObectSelect", //数据库表名下拉框数据
            "13" : "/nms/spring/databaseBackup/updateConfigParam", //数据库自动备份归档策略 添加修改POST
            "14" : "/nms/spring/databaseBackup/getBackupLogByFilter", // 归档/备份记录GET
            "15" : "/nms/spring/databaseBackup/deleteBackup", // 归档/备份记录删除
            "16" : "/nms/spring/systemManage/softwareProcessInfo", //软件进程信息\
            "17" : "/nms/spring/files/getImageMapInfo", // 地图管理GET
            "18" : "/nms/spring/devices/parents/0", //区域列表GET
            "19" : "/nms/spring/devices/parents/1", //未分配设备列表GET
            "20" : "/nms/spring/devices", //添加设备
            "21" : "/nms/spring/devices/update", //修改设备
            "22" : "/nms/spring/activeAlarm/getFilterConfigByFliter", //告警过滤GET
            "23" : "/nms/spring/activeAlarm/updateFilterConfig", //告警过滤 post 添加修改删除
            "24" : "/nms/spring/alarmRules/getByFilter", //前传规则GET
            "25" : "/nms/spring/alarmRules/add", //前传规则 添加修 改
            "26" : "/nms/spring/alarmRules/del", //前传规则 删除
            "100" : "/nms/spring/user/page", //用户读取
            "101" : "/nms/spring/user", //用户添加
            "102" : "/nms/spring/menu/page", //菜单读取
            "103" : "/nms/spring/role/page", //角色读取
            "104" : "/nms/spring/user", //用户编辑
            "105" : "/nms/spring/role", //角色添加
            "106" : "/nms/spring/role", //角色编辑
            "107" : "/nms/spring/role/getRole",//用户分配角色
            "108" : "/nms/spring/menu/getMenu",//角色分配菜单
            "109" : "/nms/spring/device/getDevice",//角色分配设备
            "110" : "/nms/spring/menu"//菜单添加
        }, 
        s = typeof flag === "number" ? url[flag] : flag,
        f = (method === "POST" || method === "DELETE" || method === "PUT") ? "data" : "params",
        o = {};
        o.method = method;
        o.url = s;
        o[f] = data;
        o.headers= {'Content-Type': 'application/json;charset=UTF-8'};
        return $http(o).error(function(e,l, s){
            ngTip.tip("error:    " + l, "danger");
            cfpLoadingBar.complete();
            typeof scope !== "undefined" && (scope.disabledFlag = false);
        })
    }
    return {
        doRequest : function(method, flag, data, scope){
            return req(method, flag, data, scope);
        },
        loads: function(fn){//angular 数据加载完执行
            angular.element(document).ready(function() {fn();});
        },
        loading: function(r){//进度条加载
            r === "start" ? (cfpLoadingBar.start()) :(cfpLoadingBar.complete());
        },
        ngAlert:function(title, type){
            ngTip.tip(title, type) //type类型有success warning danger
        },
        ngDialog: function(width, url, scope , fn, closeFn){
            ngDialog.open({ 
                width : width,
                template : url,
                className : 'ngdialog-theme-default ngdialog-theme-custom',
                //className: 'ngdialog-theme-flat ngdialog-theme-custom',//className: 'ngdialog-theme-plain',
                scope : scope, //将scope传给test.html,以便显示地址详细信息
                controller : function($scope){fn();}
                // ,preCloseCallback : function($scope){closeFn();} 
            });
        }  
    };
}]);