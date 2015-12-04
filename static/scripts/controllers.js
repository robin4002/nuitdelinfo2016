(function() {
	var controllers = angular.module('controllers', []);
	
	controllers.controller('MapController', ['$scope', function($scope) {
		$scope.$root.safeState = "start";
		$scope.car = false;
		
		$scope.toggleCar = function(bool){
			$scope.car = bool;
		}
		
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
	}]);
}).call(this);