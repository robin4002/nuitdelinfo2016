(function() {
	var saveMe = angular.module('SaveMe', [
		'ui.router',
		'controllers'
	]);
	
	saveMe.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/map');
		$stateProvider
			.state('map', {
				url: '/map',
				templateUrl: '/partials/map.html',
				controller: 'MapController'
			})
	}]);
}).call(this);