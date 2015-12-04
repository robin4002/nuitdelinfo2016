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
		
		$scope.findPathToward = function(destination, waypoints) {
			$scope.findPath($scope.userPosition, destination, undefined, function(response) {
				$scope.directionsDisplay.setDirections(response);
			});
			return;
			if (waypoints === undefined) {
				waypoints = new Array();
			}
			$scope.findPath($scope.userPosition, destination, waypoints, function(response) {
				console.log(response);
				var first = true;
				for (var i in response.routes[0].overview_path) {
					if (first) {
						first = false;
						continue;
					}
					var coef = (destination.lng - $scope.userPosition.lng) / (destination.lat - $scope.userPosition.lat);
					var add = ($scope.userPosition.lng - ($scope.userPosition.lat * coef));
					
					var x = $scope.userPosition.lat;
					while ((($scope.userPosition.lat < destination.lat) && x < destination.lat) || (($scope.userPosition.lat > destination.lat) && x > destination.lat)) {
						x += 0.01;
						var y = x * coef + add;
						for (j in $scope.dangerousPlaces) {
							var dist = Math.sqrt(Math.pow(destination.lat - $scope.userPosition.lat, 2) + Math.pow(destination.lng - $scope.userPosition.lng, 2));
							if (dist < 0.1) {
								var newX = x + 0.15;
								var newY = newX * (1 / coef);
								waypoints = [{
									location: {
										lat: newX,
										lng: newY
									}
								}];
								$scope.findPathToward(destination, waypoints);
								return;
							}
						}
						$scope.directionsDisplay.setDirections(response);
					}
				}
			});
		}
		
		$timeout(function() {
			var initMap = function() {
				navigator.geolocation.getCurrentPosition(function(position) {
					$scope.userPosition = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					$scope.map = new google.maps.Map(document.getElementById('map'), {
						center: {
							lat: position.coords.latitude,
							lng: position.coords.longitude
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
								$scope.dangerousPlaces = dangerousPlaces;
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
								
								$scope.findPathToward({lat: safePlaces[0].coordinates[0], lng: safePlaces[0].coordinates[1]});
							});
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
		
		$scope.findPath = function(origin, destination, waypoints, callback) {
			$scope.directionsService.route({
				origin: origin,
				destination: destination,
				travelMode: google.maps.TravelMode.DRIVING,
				waypoints: waypoints
			}, function(response, status) {
				if (status === google.maps.DirectionsStatus.OK) {
					callback(response);
				} else {
					window.alert('Directions request failed due to ' + status);
				}
			});
		};
		
		
			
		$scope.$root.safeState = "start";
		$scope.car = false;
		$scope.questions = false;
		$scope.step = 0;
		$scope.toggleCar = function(bool){
			$scope.car = bool;
		};
		$scope.saveMe = function(){
			$scope.$root.safeState = "unsafe";
			$scope.questions = true;
			$scope.step = 1;
		};
		$scope.signalMeSafe = function(){
			$scope.$root.safeState = "safe";
		};
		
	}])
	.controller('InfosController', ['$scope', function($scope) {
		
		$scope.infos = {
			hide : true,
			catastropheType : "avalanche" 
		}
		
	}])
	.controller('NotifsController', ['$scope', 'ModelsManager', function($scope, ModelsManager) {
		$scope.Notifs = new ModelsManager('notification');
		$scope.Notifs.get().then(function(notifications) {

			console.log(notifications)
		});
		
	}]);
}).call(this);
