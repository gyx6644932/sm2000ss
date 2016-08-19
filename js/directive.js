routerApp.directive('tmPagination',[function(){
    return {
        restrict: 'EA',
        template: '<div class="page-list">' +
            '<ul class="pagination" ng-show="conf.totalItems > 0">' +
            '<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><span>&laquo;</span></li>' +
            '<li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ' +
            'ng-click="changeCurrentPage(item)">' +
            '<span>{{ item }}</span>' +
            '</li>' +
            '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><span>&raquo;</span></li>' +
            '</ul>' +
            '<div class="page-total" style="margin: 23px 20px;" ng-show="conf.totalItems > 0">' +
            '<select ng-model="conf.itemsPerPage" ng-options="option for option in conf.perPageOptions " ng-change="changeItemsPerPage()"></select>' +
            '共<strong>{{ conf.totalItems }}</strong>条，' +
            '到第<input type="text" ng-model="jumpPageNum" style="padding-left: 14px;" />页<button class="btn btn-primary btn-xs" style="margin-bottom: 4px;" ng-click="jumpToPage()">GO</button>' +
            '</div>' +
            // '<div class="no-items" ng-show="conf.totalItems <= 0">暂无数据</div>' +
            '</div>',
        replace: true,
        scope: {
            conf: '='
        },
        link: function(scope, element, attrs){
            // 变更当前页
            scope.changeCurrentPage = function(item){
                if(item == '...'){
                    return;
                }else{
                    scope.conf.currentPage = item;
                    ax();
                }
            };

            // 定义分页的长度必须为奇数 (default:9)
            scope.conf.pagesLength = parseInt(scope.conf.pagesLength) ? parseInt(scope.conf.pagesLength) : 9 ;
            if(scope.conf.pagesLength % 2 === 0){
                // 如果不是奇数的时候处理一下
                scope.conf.pagesLength = scope.conf.pagesLength -1;
            }

            // conf.erPageOptions
            if(!scope.conf.perPageOptions){
                scope.conf.perPageOptions = [10, 15, 20, 30, 50];
            }

            // pageList数组
            function getPagination(){
                // conf.currentPage
                scope.conf.currentPage = parseInt(scope.conf.currentPage) ? parseInt(scope.conf.currentPage) : 1;
                // conf.totalItems
                scope.conf.totalItems = parseInt(scope.conf.totalItems);

                // conf.itemsPerPage (default:15)
                // 先判断一下本地存储中有没有这个值
                if(scope.conf.rememberPerPage){
                    // if(!parseInt(localStorage[scope.conf.rememberPerPage])){
                    //     localStorage[scope.conf.rememberPerPage] = parseInt(scope.conf.itemsPerPage) ? parseInt(scope.conf.itemsPerPage) : 15;
                    // }

                    // scope.conf.itemsPerPage = parseInt(localStorage[scope.conf.rememberPerPage]);


                }else{
                    scope.conf.itemsPerPage = parseInt(scope.conf.itemsPerPage) ? parseInt(scope.conf.itemsPerPage) : 15;
                }

                // numberOfPages
                scope.conf.numberOfPages = Math.ceil(scope.conf.totalItems/scope.conf.itemsPerPage);

                // judge currentPage > scope.numberOfPages
                if(scope.conf.currentPage < 1){
                    scope.conf.currentPage = 1;
                }

                if(scope.conf.currentPage > scope.conf.numberOfPages){
                    scope.conf.currentPage = scope.conf.numberOfPages;
                }

                // jumpPageNum
                scope.jumpPageNum = scope.conf.currentPage;

                // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                var perPageOptionsLength = scope.conf.perPageOptions.length;
                // 定义状态
                var perPageOptionsStatus;
                for(var i = 0; i < perPageOptionsLength; i++){
                    if(scope.conf.perPageOptions[i] == scope.conf.itemsPerPage){
                        perPageOptionsStatus = true;
                    }
                }
                // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                if(!perPageOptionsStatus){
                    scope.conf.perPageOptions.push(scope.conf.itemsPerPage);
                }

                // 对选项进行sort
                scope.conf.perPageOptions.sort(function(a, b){return a-b});

                scope.pageList = [];
                if(scope.conf.numberOfPages <= scope.conf.pagesLength){
                    // 判断总页数如果小于等于分页的长度，若小于则直接显示
                    for(i =1; i <= scope.conf.numberOfPages; i++){
                        scope.pageList.push(i);
                    }
                }else{
                    // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                    // 计算中心偏移量
                    var offset = (scope.conf.pagesLength - 1)/2;
                    if(scope.conf.currentPage <= offset){
                        // 左边没有...
                        for(i =1; i <= offset +1; i++){
                            scope.pageList.push(i);
                        }
                        scope.pageList.push('...');
                        scope.pageList.push(scope.conf.numberOfPages);
                    }else if(scope.conf.currentPage > scope.conf.numberOfPages - offset){
                        scope.pageList.push(1);
                        scope.pageList.push('...');
                        for(i = offset + 1; i >= 1; i--){
                            scope.pageList.push(scope.conf.numberOfPages - i);
                        }
                        scope.pageList.push(scope.conf.numberOfPages);
                    }else{
                        // 最后一种情况，两边都有...
                        scope.pageList.push(1);
                        scope.pageList.push('...');

                        for(i = Math.ceil(offset/2) ; i >= 1; i--){
                            scope.pageList.push(scope.conf.currentPage - i);
                        }
                        scope.pageList.push(scope.conf.currentPage);
                        for(i = 1; i <= offset/2; i++){
                            scope.pageList.push(scope.conf.currentPage + i);
                        }

                        scope.pageList.push('...');
                        scope.pageList.push(scope.conf.numberOfPages);
                    }
                }
                scope.$parent.conf = scope.conf;
            }

            // prevPage
            scope.prevPage = function(){
                if(scope.conf.currentPage > 1){
                    scope.conf.currentPage -= 1;
                    ax();
                }
            };
            // nextPage
            scope.nextPage = function(){
                if(scope.conf.currentPage < scope.conf.numberOfPages){
                    scope.conf.currentPage += 1;
                    ax();
                }
            };

            // 跳转页
            scope.jumpToPage = function(){
                typeof scope.jumpPageNum === "number" && (scope.jumpPageNum += "");
                scope.jumpPageNum = scope.jumpPageNum.replace(/[^0-9]/g,'');
                if(scope.jumpPageNum > scope.conf.numberOfPages) return;
                if(scope.jumpPageNum !== ''){
                    scope.conf.currentPage = scope.jumpPageNum;
                    ax();
                }
            };

            // 修改每页显示的条数
            scope.changeItemsPerPage = function(){
                if(scope.conf.rememberPerPage){
                    scope.conf.currentPage = 1
                    ax();
                }
            };

            scope.$watch(function(){
                var newValue = scope.conf.currentPage + ' ' + scope.conf.totalItems + ' ';
                newValue += scope.conf.itemsPerPage;
                return newValue;
            }, getPagination);

            function ax(){
                if(scope.conf.onChange){
                    scope.conf.onChange();
                }
            }
            ax();
        }
    };
}]);
routerApp.directive('toggleClass', function(){
    return {
        restrict: 'A',
        scope: {
            toggleClass: '@'
        },
        link: function($scope, $element){
            $element.on('click', function(){
                $element.parent().parent().find('a').removeClass("activeOneMenu");
                $element.addClass('activeOneMenu');
            });
        }
    };
});
routerApp.directive('datatogg', function(){
    return {
        restrict: 'A',
        scope: {
            dataTogg: '@'
        },
        link: function(scope, element){
            var mapUlr = localStorage.getItem("mapUlr");
            if(mapUlr){
                angular.element(document.getElementById("canvas")).css({
                    "background": "url(" + 'http://' + location.host + '/mapImg/' + mapUlr + ") no-repeat",
                    'background-size': "100% 100%"
                })
            }
            element.on('click', function(e){
                if(element.find('ul').hasClass('btnFlagHide')){
                    element.find('ul').removeClass('btnFlagHide');
                    element.find('ul').addClass('btnFlagShow');
                }else if(element.find('ul').hasClass('btnFlagShow')){
                    element.find('ul').removeClass('btnFlagShow');
                    element.find('ul').addClass('btnFlagHide');
                }
                e.stopPropagation();
            });
        }
    };
});
routerApp.directive('deviceFrame', function(){
    return {
        restrict: 'A',
        link: function(scope, element){
            var slot = scope.$index;
            scope.$watch("frameList",function(a,b){
                var list = a;
                if(list && list.length > 0){
                    for (var i = 0; i < list.length; i++) {
                        if(list[i].index == slot){
                            if(list[i].card !== null){
                                element.append(cardObj.choseCard(list[i].card.cardLed, list[i].card.type));
                            }else{
                                element.append(cardObj.cardNull());
                            }
                            break;
                        }
                    }
                }
            })
            scope.$last && element.css('border-right',"1px solid black");
        }
    };
});


//$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {指令DOM加载后运行});
routerApp.directive('menuplug', function ($timeout) {
    return {
        restrict: 'AE',
        scope : {},
        link: function(scope, element, attr) {
            scope.tog = false;
            element.children().eq(0).on('click', function(e){
                // element.parent().children('li').removeClass('active');
                // element.addClass('active');
                if(scope.tog){
                    element.children().eq(0).removeClass('collapsed');
                    element.children().eq(0).find("span").removeClass('glyphicon-chevron-down');
                    element.children().eq(0).find("span").addClass('glyphicon-chevron-up');
                    element.children().eq(1).removeClass('in');
                }else{
                    element.children().eq(0).addClass('collapsed');
                    element.children().eq(0).find("span").removeClass('glyphicon-chevron-up');
                    element.children().eq(0).find("span").addClass('glyphicon-chevron-down');
                    element.children().eq(1).addClass('in');
                }
                scope.tog = !scope.tog;
            });
        }
    };
});
routerApp.directive('ngThumb', ['$window', function($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}]);
