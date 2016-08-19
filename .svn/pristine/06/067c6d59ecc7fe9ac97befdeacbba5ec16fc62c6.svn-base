;(function(app){
	app.controller('processMessageCtrl', ['$scope', 'publicService', "processDate", function($scope, publicService,processDate){
		$scope.processList = processDate.data.data;
	}]);

	app.filter('processDomfilter',function(){
	    return function(inputArray){
	    	var array = [];
	    	if(inputArray){
	    		array = inputArray.split(/\s/);
	    		nullArr(array).splice(6, 1);
	    		array[9] =array.slice(9, array.length).join(" ")
	    		array = array.splice(0, 10);
	    	}
	    	function nullArr(arr) {
			    for (var i = 0; i < arr.length; i++) {
			        if (arr[i] == "" || typeof(arr[i]) == "undefined") {
			            arr.splice(i, 1);
			            i = i - 1;
			        }
			    }
			    return arr;
			}
	        return array;
	    }
	});
})(routerApp)