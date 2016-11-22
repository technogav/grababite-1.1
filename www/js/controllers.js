angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $http, $cordovaGeolocation, $ionicPlatform, RestaurantService, NgMap) {//
		'use strict';
	var main = this;
	
	
	main.newRestaurant = {
				"id": "",
				"name": "",
				"description": "",
				"deal": "",
				"coords": []
	};
	$scope.restaurants = RestaurantService.getRestaurants();
	
	
	NgMap.getMap().then(function(map) {
		console.log('map', map);
		main.map = map;
	});
	$scope.lat = "" ;
	$scope.long = "" ;
	$scope.mapOptions = {
			zoom: 15		
	};

	$ionicPlatform.ready(function(){
		var posOptions = {timeout: 10000, enableHighAccuracy: true};
		$cordovaGeolocation.getCurrentPosition(posOptions)
			.then(function (position) {		
					$scope.lat = position.coords.latitude;console.log($scope.lat);
					$scope.long = position.coords.longitude;
				
				//call the generate marker method
				/*$scope.positions = $scope.generateMarkers($scope.coords);*/
				
		}, function(err) {
			console.log(err);
		});
		
	});
	
	
	
	
	
		
	 $scope.onMapIdle = function() {
      var updateCenter = function() {
        var ll = new google.maps.LatLng($scope.lat, $scope.long);
        $scope.myMap.panTo(ll)
        	
        
      }
      $scope.$watch('lat', updateCenter);
      $scope.$watch('long', updateCenter);
    };
	 /* main.clicked = function() {
		alert('Clicked a link inside infoWindow');
	  };

	  
	  main.restaurant = $scope.restaurants[0];

	  main.showDetail = function(e, restaurant) {
		main.restaurant = restaurant;
		main.map.showInfoWindow('foo-iw', restaurant.id);
	  };

	  main.hideDetail = function() {
		main.map.hideInfoWindow('foo-iw');
	  };
	*/
		
	main.addRestaurantDetails = function(){
		
		RestaurantService.addRestaurantDetails(angular.copy(main.newRestaurant));
		main.newRestaurant = {
				"id": "",
				"name": "",
				"description": "",
				"deal": "",
				"coords": []
		};
		
	};
	
	
	//GET CURERENT COORDS ON DEVICE
	
	
	
	$scope.repositionMap = function(){
		//get the long lat coords from the choice
		/*var lat = "";
		var lng = "";
		if(){*/ 
			console.log('1');
			//extract the location using
			//var address = $(#searchButton).value;
			var url = "http://maps.google.com/maps/api/geocode/json?address=dublin ireland";
				$http({
					method: 'GET',
					url: url
				}).then(function successCallback(response) {
					var releventMapData = response.data.results[0];
					var searched_lat = releventMapData.geometry.location.lat;
					var searched_long = releventMapData.geometry.location.lng;
					$scope.lat = searched_lat;
					$scope.long = searched_long;
					
				}, function errorCallback(response) {
					console.log(response.message);
				});
			
			/*//append location to url string http://maps.google.com/maps/api/geocode/json?address=append+this+new,+address
			//send ajax request to this url string
			//then update the  $scope.coords
					//!? use a listener for change to refresh the map view!?*/
	};
			//get the map object from the dom
				//might be a better idea to set the map center in the dom for real time experience
			
			
			//set $scope.coords.latitude == new lat and set $scope.coords.longitude == new long
			//apply the new coords to the map
				//maybe a refresh this will require a spinner
		
		//$scope.coords = [{latitude: 53.3450897},{longitude: -6.2638032}];
	
	
		
		
		
	/*var vm = this;
  vm.positions =[
    [40.71, -74.21], [40.72, -74.20], [40.73, -74.19], [40.74, -74.18],
    [40.75, -74.17], [40.76, -74.16], [40.77, -74.15], [40.77, -74.15]
  ];

  $interval(function() {
    
  }, 2000);
});

custom marker
var vm = this;
    vm.image = {
      url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      size: [20, 32],
      origin: [0,0],
      anchor: [0, 32]
    };
    vm.shape = {
      coords: [1, 1, 1, 20, 18, 20, 18 , 1],
      type: 'poly'
    };
    vm.beaches = [
      ['Bondi Beach', -33.890542, 151.274856, 4],
      ['Coogee Beach', -33.923036, 151.259052, 5],
      ['Cronulla Beach', -34.028249, 151.157507, 3],
      ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
      ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];
  });
  
  */

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
