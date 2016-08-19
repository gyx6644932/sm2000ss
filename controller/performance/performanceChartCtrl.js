;
(function(app) {
	app.controller('performanceChartCtrl', ['$scope', '$rootScope', "$state", 'publicService', function($scope, $rootScope, $state, publicService) {
		loadChart(0, 0)
		publicService.doRequest("GET", 4, {
			type: "two"
		}).success(function(data) {
			if (data.data && data.data.length > 0) {
				$scope.deviceInfo = data.data;

			}
		});
		$scope.performanceFrameM = '0';
		$scope.seach = function() {
			if ($scope.performanceFrameM == 0) {
				url = 'mtie';
				time = 13;
				labelData = ["01", "04", "10", "40", "100", "300", "900", "1800", "3600", "7200", "14400", "28800", "86400"];
			} else if ($scope.performanceFrameM == 1) {
				url = 'tdev';
				time = 11;
				labelData = ["01", "02", "04", "08", "16", "32", "64", "128", "256", "512", "1024"];
			} else if ($scope.performanceFrameM == 2) {
				url = 'freq';
				time = 11;
				labelData = ["01", "02", "04", "08", "16", "32", "64", "128", "256", "512", "1024"];
			}
			var data = [],
				self = this;
			devId = self.devID.id;
			publicService.doRequest("GET", "/nms/spring/devices/" + devId + "/performance/" + url + "/" + time + "?bgnDate="+$scope.monitorTimeBgn, {}).success(function(r) {
				var d = r.data;
				for (var i = 0; i < d.length; i++) {
					var obj = {};
					obj.value = d[i].x;
					obj.name = i;
					obj.color = getRandomColor();
					obj.line_width = 2;
					data.push(obj);
				}
				loadChart(data, labelData)
			})
		}


		function loadChart(datax, datay) {
			datax == 0 ? datax = [{
				name: 'PV',
				value: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
				color: '#aad0db',
				line_width: 2
			}] : datax = datax;
			var data = datax;
			datay == 0 ? datay = ["01", "04", "10", "40", "100", "300", "900", "1800", "3600", "7200", "14400", "28800", "86400"] : datay = datay;
			var labels = datay;

			var chart = new iChart.LineBasic2D({
				render: 'canvasDiv',
				data: data,
				align: 'center',
				title: {
					text: '性能曲线',
					font: '微软雅黑',
					fontsize: 18,
					color: '#b4b4b4'
				},
				/*			subtitle: {
								text: '14:00-16:00访问量达到最大值',
								font: '微软雅黑',
								color: '#b4b4b4'
							},*/
				/*	footnote: {
						text: 'ichartjs.com',
						font: '微软雅黑',
						fontsize: 11,
						fontweight: 600,
						padding: '0 28',
						color: '#b4b4b4'
					},*/
				width: 1100,
				height: 450,
				shadow: true,
				shadow_color: '#202020',
				shadow_blur: 8,
				shadow_offsetx: 0,
				shadow_offsety: 0,
				background_color: '#2e2e2e',
				tip: {
					enable: true,
					shadow: true,
					move_duration: 400,
					border: {
						enable: true,
						radius: 5,
						width: 2,
						color: '#3f8695'
					},
					listeners: {
						//tip:提示框对象、name:数据名称、value:数据值、text:当前文本、i:数据点的索引
						parseText: function(tip, name, value, text, i) {
							return name + "访问量:" + value + "万";
						}
					}
				},
				tipMocker: function(tips, i) {
					return "<div style='font-weight:600'>" +
						labels[Math.floor(i / 12)] + " " + //日期
						(((i % 12) * 2 < 10 ? "0" : "") + (i % 12) * 2) + ":00" + //时间
						"</div>" + tips.join("<br/>");
				},
				crosshair: {
					enable: true,
					line_color: '#ec4646'
				},
				sub_option: {
					smooth: true,
					label: false,
					hollow: false,
					hollow_inside: false,
					point_size: 8
				},
				coordinate: {
					width: 910,
					height: 300,
					striped_factor: 0.18,
					grid_color: '#4e4e4e',
					axis: {
						color: '#252525',
						width: [0, 0, 4, 4]
					},
					scale: [{
						position: 'left',
						start_scale: 0,
						end_scale: 100,
						scale_space: 10,
						scale_size: 2,
						scale_enable: false,
						label: {
							color: '#9d987a',
							font: '微软雅黑',
							fontsize: 11,
							fontweight: 600
						},
						scale_color: '#9f9f9f'
					}, {
						position: 'bottom',
						label: {
							color: '#9d987a',
							font: '微软雅黑',
							fontsize: 11,
							fontweight: 600
						},
						scale_enable: false,
						labels: labels
					}]
				}
			});
			//利用自定义组件构造左侧说明文本
			chart.plugin(new iChart.Custom({
				drawFn: function() {
					//计算位置
					var coo = chart.getCoordinate(),
						x = coo.get('originx'),
						y = coo.get('originy'),
						w = coo.width,
						h = coo.height;
					//在左上侧的位置，渲染一个单位的文字
					chart.target.textAlign('start')
						.textBaseline('bottom')
						.textFont('600 11px 微软雅黑')
						.fillText('/纳秒', x - 40, y - 12, false, '#9d987a')
						.textBaseline('top')
						.fillText('(时间)', x + w + 12, y + h + 10, false, '#9d987a');

				}
			}));
			//开始画图
			chart.draw();
		}


		function getRandomColor() {
			return '#' +
				(function(color) {
					return (color += '0123456789abcdef' [Math.floor(Math.random() * 16)]) && (color.length == 6) ? color : arguments.callee(color);
				})('');
		}
	}]);
})(routerApp);