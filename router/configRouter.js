;
(function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('index.config', {
                url: '/config',
                views: {
                    'center@index': {
                        templateUrl: 'template/config/outputCardConfig.html',
                        controller: "outputCardConfigCtrl",
                        resolve: {
                      /*      deviceInfoData: function(publicService) {
                                publicService.loading('start');
                                return publicService.doRequest("GET", 4, {
                                    type: "two"
                                });
                            }*/
                        }
                    }
                }
            })

        .state('index.config.outputCardConfig', {
            url: '/outputCardConfig',
            templateUrl: 'template/config/outputCardConfiglist.html',
            controller: "outputCardConfigCtrl"
        })

        .state('index.config.outPTPconfig', {
                url: '/outPTPconfig',
                templateUrl: 'template/config/outPTPconfig.html',
                controller: "outputCardPTPConfigCtrl"
            })

        .state('index.config.outE1config', {
                url: '/outE1config',
                templateUrl: 'template/config/outE1config.html',
                controller: "outputCardE1PConfigCtrl"
            })

        .state('index.config.outPPSTODconfig', {
                url: '/outPPSTODconfig',
                templateUrl: 'template/config/outPPSTODconfig.html',
                controller: "outputCardppstodConfigCtrl"
            })
         .state('index.config.gnss', {
                url: '/gnss',
                templateUrl: 'template/config/gnss.html',
                controller: "outputCardConfigCtrl"
            })

        .state('index.config.ppsTod', {
            url: '/ppsTod',
            templateUrl: 'template/config/ppsTod.html',
            controller: "outputCardConfigCtrl"
        })

        .state('index.config.e1', {
            url: '/e1',
            templateUrl: 'template/config/e1.html',
            controller: "outputCardConfigCtrl"
        })

        .state('index.config.otherOutput', {
            url: '/otherOutput',
            templateUrl: 'template/config/otherOutput.html',
            controller: "outputCardConfigCtrl"
        })

        .state('index.config.ntp', {
            url: '/ntp',
            templateUrl: 'template/config/ntp.html',
            controller: "outputCardConfigCtrl"
        })

        .state('index.config.ntpProbe', {
            url: '/ntpProbe',
            templateUrl: 'template/config/ntpProbe.html',
            controller: "outputCardConfigCtrl"
        })

        .state('index.config.ntpStatus', {
            url: '/ntpStatus',
            templateUrl: 'template/config/ntpStatus.html',
            controller: "outputCardConfigCtrl"
        })

        .state('index.config.zptpCommon', {
            url: '/zptpCommon',
            templateUrl: 'template/config/zptpCommon.html',
            controller: "outputCardConfigCtrl"
        })

        .state('index.config.zptpMulticast', {
            url: '/zptpMulticast',
            templateUrl: 'template/config/zptpMulticast.html',
            controller: "outputCardConfigCtrl"
        })

        .state('index.config.zUnicastClinet', {
            url: '/zUnicastClinet',
            templateUrl: 'template/config/zUnicastClinet.html',
            controller: "outputCardConfigCtrl"
        })

        .state('index.config.zptpProbe', {
            url: '/zptpProbe',
            templateUrl: 'template/config/zptpProbe.html',
            controller: "outputCardConfigCtrl"
        })

        .state('index.config.alarmModle', {
            url: '/alarmModle',
            templateUrl: 'template/config/alarmModle.html',
            controller: "outputCardConfigCtrl"
        })

        .state('index.config.alarmModleSub', {
            url: '/alarmModleSub',
            templateUrl: 'template/config/alarmModleSub.html',
            controller: "outputCardConfigCtrl"
        })

        .state('index.config.IPETH', {
            url: '/IPETH',
            templateUrl: 'template/config/IPETH.html',
            controller: "outputCardConfigCtrl"
        })

        .state('index.config.vlan', {
            url: '/vlan',
            templateUrl: 'template/config/vlan.html',
            controller: "outputCardConfigCtrl"
        })
    }]);
})(routerApp)