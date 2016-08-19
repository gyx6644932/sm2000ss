// 引入 gulp
var gulp = require("gulp");
// 引入组件
var imagemin = require("gulp-imagemin");
var minifycss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var jshint = require("gulp-jshint");
var concat = require("gulp-concat");
var paths = {
    scripts: [
        "js/angular-1.3.0.js",
        "js/angular-ui-router.js",
        "js/ui-bootstrap-tpls.0.11.2.js",
        "js/angular-tree-control.js",
        "js/angular-animate.min.js",
        "js/ngDialog.min.js",
        "js/ngTip.js",
        "js/loading-bar.js",
        "js/angular-file-upload.min.js",
        "js/angular-ui-switch.js",
        "js/macTopology.js",
        "js/topologyConfig.js",
        "js/JSPlumb/lib/jsBezier-0.7.js",
        "js/JSPlumb/lib/mottle-0.7.1.js",
        "js/JSPlumb/lib/biltong-0.2.js",
        "js/JSPlumb/lib/katavorio-0.13.0.js",
        "js/JSPlumb/util.js",
        "js/JSPlumb/browser-util.js",
        "js/JSPlumb/jsPlumb.js",
        "js/JSPlumb/dom-adapter.js",
        "js/JSPlumb/overlay-component.js",
        "js/JSPlumb/endpoint.js",
        "js/JSPlumb/connection.js",
        "js/JSPlumb/anchors.js",
        "js/JSPlumb/defaults.js",
        "js/JSPlumb/connectors-bezier.js",
        "js/JSPlumb/connectors-statemachine.js",
        "js/JSPlumb/connectors-flowchart.js",
        "js/JSPlumb/renderers-svg.js",
        "js/JSPlumb/base-library-adapter.js",
        "js/JSPlumb/dom.jsPlumb.js",
        "app.js",
        "js/service.js",
        "js/directive.js",
        "js/verify.js",
        "router/loginRouter.js",
        "router/indexRouter.js",
        "router/authorityRouter.js",
        "router/systemRouter.js",
        "router/alarmRouter.js",
        "router/deviceRouter.js",
        "router/logRouter.js",
        "router/performanceRouter.js",
        "router/configRouter.js",
        "router/otherRouter.js",
        "controller/indexCtrl.js",
        "controller/loginCtrl.js",
        "controller/tuopuCtrl.js",
        "controller/topbarCtrl.js",
        "controller/twoMenuCtrl.js",
        "controller/authorityCtrl.js",
        "controller/alarm/alarmFilterCtrl.js",
        "controller/alarm/alarmFilterEditAddCtrl.js",
        "controller/alarm/alarmRuleCtrl.js",
        "controller/alarm/alarmRuleEditAddCtrl.js",
        "controller/alarm/alwaysAlarm.js",
        "controller/log/safeLogCtrl.js",
        "controller/log/alarmLogCtrl.js",
        "controller/log/networkLogCtrl.js",
        "controller/log/operationLogCtrl.js",
        "controller/log/performanceLogCtrl.js",
        "controller/log/systemLogCtrl.js",
        "controller/system/database/systemDatabaseAutoCtrl.js",
        "controller/system/database/systemDatabasManualCtrl.js",
        "controller/system/database/systemDatabasRecordCtrl.js",
        "controller/system/database/databaseAutoAddEditCtrl.js",
        "controller/system/softHard/processMessageCtrl.js",
        "controller/system/map/mapCtrl.js",
        "controller/system/map/mapAddCtrl.js",
        "controller/device/deviceManageCtrl.js",
        "controller/device/deviceManageEditAdd.js",
        "controller/device/areaManageCtrl.js",
        "controller/device/areaManageAddCtrl.js",
        "controller/authority/authorityCtrl.js",
        "controller/authority/userManageCtrl.js",
        "controller/authority/menuManageCtrl.js",
        "controller/authority/roleManageCtrl.js",
        "controller/other/otherSoundCtrl.js",
        "controller/performanceCtrl.js",
        "controller/configCtrl.js"
    ],
    images: [
        "static/images/*",
        "static/css/images/*",
        "static/js/plugin/img/*",
        "static/js/plugin/treeview/images/*",
        "static/js/plugin/selectseach/images/*.png"
    ],
    css: [
        "css/bootstrap.min.css",
       "css/tree-control.css",
       "css/tree-control-attribute.css",
       "css/jsPlumbToolkit-defaults.css",
       "css/jsPlumbToolkit-demo.css",
       "css/demo.css",
       "css/ngDialog.min.css",
       "css/ngDialog-theme-default.min.css",
       "css/ngDialog-theme-plain.min.css",
       "css/ngDialog-theme-flat.css",
       "css/loading-bar.css",
       "css/angular-ui-switch.css",
       "css/index.css"
    ]
};

gulp.task("images", function(){
    return gulp.src(paths.images)
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest("v1/images"))
});
// 合并、压缩、重命名css
gulp.task("minifycss", function(){
    return gulp.src(paths.css)
        .pipe(minifycss())
        .pipe(concat("all.min.css"))
        .pipe(gulp.dest("v1/css"));
});
// 检查js
gulp.task("lint", function(){
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});
// 合并，压缩js文件
gulp.task("javascripts", function(){
    return gulp.src(paths.scripts)
        .pipe(uglify({
            //mangle: false,//类型：Boolean 默认：true 是否修改变量名
            mangle: {except: ["$timeout", "$scope", "$http", "publicService"]}//排除混淆关键字
        }))
        .pipe(concat("all.min.js"))
        .pipe(gulp.dest("v1/js"));
});

gulp.task("watch", function() {
  gulp.watch(paths.scripts, ["javascripts"]);
  gulp.watch(paths.css, ["minifycss"]);
});

// 默认任务
gulp.task("default", ["minifycss","javascripts", "watch"]);

// css + js
gulp.task("d", ["minifycss","javascripts",]);
