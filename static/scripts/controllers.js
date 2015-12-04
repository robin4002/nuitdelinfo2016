(function() {
	var controllers = angular.module('controllers', []);
	


	controllers.controller('MapController', ['$scope', '$timeout', 'ModelsManager', function($scope, $timeout, ModelsManager) {
		$scope.SafePlacesManager = new ModelsManager('safePlace');
		$scope.DangerousPlacesManager = new ModelsManager('dangerousPlace');
		$scope.HealthPlacesManager = new ModelsManager('healthPlace');
		$scope.map;
		$scope.markers = new Array();
		$scope.directionsService = new google.maps.DirectionsService;
		$scope.directionsDisplay = new google.maps.DirectionsRenderer;
		
		$scope.findPathToward = function(destination) {
			
		}
		
		$timeout(function() {
			var initMap = function() {
				$scope.map = new google.maps.Map(document.getElementById('map'), {
					center: {
						lat: -34.397,
						lng: 150.644
					},
					zoom: 17
				});
				$scope.directionsDisplay.setMap($scope.map);
				
				navigator.geolocation.watchPosition(function(position) {
					$scope.userPosition = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					$scope.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
				});
				
				$scope.SafePlacesManager.get().then(function(safePlaces) {
					$scope.DangerousPlacesManager.get().then(function(dangerousPlaces) {
						$scope.HealthPlacesManager.get().then(function(healthPlaces) {
							for (var i in $scope.markers) {
								$scope.markers[i].setMap($scope.map);
							}
							$scope.markers = new Array();
							
							for (var i in safePlaces) {
								$scope.addMarker({
									lat: safePlaces[i].coordinates[0],
									lng: safePlaces[i].coordinates[1]
								}, safePlaces[i].name, '/img/good.png');
							}
							
							for (var i in dangerousPlaces) {
								$scope.addMarker({
									lat: dangerousPlaces[i].coordinates[0],
									lng: dangerousPlaces[i].coordinates[1]
								}, dangerousPlaces[i].name, '/img/bad.png');
							}
							
							for (var i in healthPlaces) {
								$scope.addMarker({
									lat: healthPlaces[i].coordinates[0],
									lng: healthPlaces[i].coordinates[1]
								}, healthPlaces[i].name, '/img/good.png');
							}
						});
					});
				});
			};
			initMap();
		});
		
		$scope.addMarker = function(coordinates, name, icon) {
			var marker = new google.maps.Marker({
				position: coordinates,
				map: $scope.map,
				title: name || '',
				icon: icon
			});
			$scope.markers.push(marker);
		};
		
		$scope.findPath = function(origin, destination) {
			$scope.directionsService.route({
				origin: origin,
				destination: destination,
				travelMode: google.maps.TravelMode.DRIVING
			}, function(response, status) {
				if (status === google.maps.DirectionsStatus.OK) {
					console.log(response);
					$scope.directionsDisplay.setDirections(response);
				} else {
					window.alert('Directions request failed due to ' + status);
				}
			});
		};
			
		$scope.$root.safeState = "start";
		$scope.car = false;
		
		$scope.toggleCar = function(bool){
			$scope.car = bool;
		}

		
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
