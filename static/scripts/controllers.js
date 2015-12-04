(function() {
	var controllers = angular.module('controllers', []);
	
	controllers.controller('MapController', ['$scope', function($scope) {
		$scope.$root.safeState = "start";
		
<<<<<<< HEAD
	}])
	.controller('InfosController', ['$scope', function($scope) {
		
		$scope.infos = {
			hide : true,
			catastropheType : "avalanche" 
		}
		
=======
		$scope.saveMe = function(){
			$scope.$root.safeState = "unsafe";
		}
		
		$scope.signalMeSafe = function(){
			$scope.$root.safeState = "safe";
		}
	}]);
	
	controllers.controller('TestController', ['$scope', 'ModelsManager', function($scope, ModelsManager) {
		$scope.SafePlacesManager = new ModelsManager('safePlace');
		$scope.SafePlacesManager.get().then(function(safePlaces) {
			console.log(safePlaces);
		}, function(data) {
			console.log(data);
		});
>>>>>>> eeaceafa98df6204efea007356871ddd039c2bd8
	}]);
}).call(this);
