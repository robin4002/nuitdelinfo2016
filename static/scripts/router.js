(function() {
	var saveMe = angular.module('SaveMe', [
		'ui.router',
		'services',
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
			.state('test', {
				url: '/test',
				templateUrl: '/partials/test.html',
				controller: 'TestController'
			})
	}]);
}).call(this);