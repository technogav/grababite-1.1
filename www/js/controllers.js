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

.controller('PlaylistsCtrl', function($scope, $http, $cordovaGeolocation, $ionicPlatform, RestaurantService, NgMap) {
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
	
	/*NgMap.getMap().then(function(map) {
		console.log('map', map);
		main.map = map;
	  });

	  main.clicked = function() {
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
		'use strict';
		RestaurantService.addRestaurantDetails(angular.copy(main.newRestaurant));
		main.newRestaurant = {
				"id": "",
				"name": "",
				"description": "",
				"deal": "",
				"coords": []
		};
		
	};
	
	

	$scope.coords = [];
	//GET CURERENT COORDS ON DEVICE
	$ionicPlatform.ready(function(){
		var posOptions = {timeout: 10000, enableHighAccuracy: true};
		$cordovaGeolocation.getCurrentPosition(posOptions)
			.then(function (position) {
				
			
					$scope.coords = position.coords;
				
			
				
				//call the generate marker method
				/*$scope.positions = $scope.generateMarkers($scope.coords);*/
				
		}, function(err) {
			console.log(err);
		});
		console.log(2 + $scope.coords);
	});
	
	$scope.repositionMap = function(){
		
		$scope.coords = [{latitude: 53.3450897},{longitude: -6.2638032}];
	}
	
		
		
		
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
