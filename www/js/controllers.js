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

.controller('PlaylistsCtrl', function($scope, $cordovaGeolocation, $ionicPlatform, NgMap) {
	
	
		  NgMap.getMap().then(function(map) {
			
			$scope.map = map;
		  });

		  /*vm.clicked = function() {
			alert('Clicked a link inside infoWindow');
		  };

		  vm.shops = [
			{id:'foo', name: 'FOO SHOP', position:[41,-87]},
			{id:'bar', name: 'BAR SHOP', position:[42,-86]}
		  ];
		  vm.shop = vm.shops[0];

		  vm.showDetail = function(e, shop) {
			vm.shop = shop;
			vm.map.showInfoWindow('foo-iw', shop.id);
		  };

		  vm.hideDetail = function() {
			vm.map.hideInfoWindow('foo-iw');
		  };
	
	
	*/
	
	
	
	
	
	
	var posOptions = {timeout: 10000, enableHighAccuracy: true};
	
	//GET CURERENT COORDS ON DEVICE
	$ionicPlatform.ready(function(){
		$cordovaGeolocation.getCurrentPosition(posOptions)
			.then(function (position) {
			
				$scope.coords = position.coords;
				//call the generate marker method
				$scope.positions = $scope.generateMarkers($scope.coords);
				$scope.restaurantDetails = $scope.getRestaurantDetails;
		}, function(err) {
			console.log("error " + angular.toJson(err));
		});	
	});

	$scope.getRestaurantDetails = function(restaurants){
		var restaurantDetails = restaurantJson;
		return restaurantDetails;	
	};
	
	//RESTAURANT DETAILS OBJECT
	var restaurants = [
		
		{
		"id": 1,
		"name": "The green door",
		"description": "The green door is a fine dining restaurant",
		"deal": "2 for One dining tonight",
		"coords": ["54.1536", "-6.73495"]
		},
		{
		"id": 2,
		"name": "The flaming Wok",
		"description": "The flaming Wok is a fine dining restaurant",
		"deal": "2 for One dining tonight",
		"coords": ["54.14978", "-6.743545"]
		}
		];
	
	$scope.restaurant = restaurants[0];
	
	$scope.showDetail = function(e, restaurant) {
		$scope.restaurant = restaurant;
		$scope.map.showInfoWindow('foo-iw', restaurant.id);
	};

	$scope.hideDetail = function() {
		$scope.map.hideInfoWindow('foo-iw');
	};
		/*$scope.getRestaurantDetails = function(){
               
			
			
			var restaurantDetails = (function)
               return restaurantDetails;    
         } */
	
		/*$http({
			method: 'GET',
			url: 'mock.json'
			})
		.then(function successCallback(response) {
			// this callback will be called asynchronously
			console.log('success');
			// when the response is available
			}, 
			  
		function errorCallback(response) {
			// called asynchronously if an error occurs
			console.log('no success');
			// or server returns response with an error status.
			});*/
	
		

	//METHOSD TO GET RANDOM COORDS IN A RADIUS FROM YOU RCURRENT POSITION	
	$scope.randomGeo = function(center, radius) {
         
         var y0 = center.latitude;
         var x0 = center.longitude;
         var rd = radius / 111300; 
     
         var u = Math.random();
         var v = Math.random();
     
         var w = rd * Math.sqrt(u);
         var t = 2 * Math.PI * v;
         var x = w * Math.cos(t);
         var y = w * Math.sin(t);
     
         //Adjust the x-coordinate for the shrinking of the east-west distances
         //var xp = x / Math.cos(y0);
     
         var newlat = y + y0;
         var newlon = x + x0;
         
         return {
             latitude: newlat.toFixed(5),
             longitude: newlon.toFixed(5)
        };
    
     };
	
	//GENERATE MARKERS USING THE RANDOMGEO METHOD
	$scope.generateMarkers = function(coords){
			var center = {'latitude': coords.latitude, 'longitude': coords.longitude};	
			var positions = {};
		   for(var i=0; i<5; i++){
				var randomCoordsObj = ($scope.randomGeo(center, 500));
				 positions[i] = {
								pos:[randomCoordsObj.latitude, randomCoordsObj.longitude],
					 			id: i,
					 			name: "kmkkmll" 
								};            
		   }     
		   //console.log(positions[0].pos);
		   return positions;  

	};
	
    $scope.showData = function() {
      alert(this.data.foo);
    };
 
	
	
  
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
