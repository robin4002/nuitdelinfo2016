(function() {
	var controllers = angular.module('controllers', []);
	
	controllers.controller('MapController', ['$scope', function($scope) {
		
	}])
	.controller('InfosController', ['$scope', function($scope) {
		
		$scope.infos = {
			hide : true,
			catastropheType : "avalanche" 
		}
		
	}])
	.controller('notifsController', ['$scope', function($scope) {
		
		$scope.infos = {
			hide : true,
			catastropheType : "avalanche" 
		}
		
	}]);
}).call(this);
