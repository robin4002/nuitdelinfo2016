(function() {
	var controllers = angular.module('controllers', []);
	
	controllers.controller('MapController', ['$scope', function($scope) {
		
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