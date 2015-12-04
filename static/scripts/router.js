(function() {
	var saveMe = angular.module('SaveMe', [
		'ui.router'
	]);
	
	saveMe.config([function($stateProvider, $urlRouterProvider, $compileProvider) {
		$stateProvider
			.state('index', {
				url: '/',
				templateUrl: '/partials/index.html',
				controller: 'IndexController'
			})
	}]);
}).call(this);