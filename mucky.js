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

.controller('PlaylistsCtrl', function($scope, $cordovaGeolocation, $ionicPlatform) { //, NgMap
	
	
		  /*NgMap.getMap().then(function(map) {
			
			$scope.map = map;
		  });*/

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
			console.log(err);
		});	
	});

	/*$scope.getRestaurantDetails = function(restaurants){
		var restaurantDetails = restaurantJson;
		return restaurantDetails;	
	};*/
	
	//RESTAURANT DETAILS OBJECT
	/*var restaurants = [
		
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
		];*/
	
	/*$scope.restaurant = restaurants[0];
	
	$scope.showDetail = function(e, restaurant) {
		/*$scope.restaurant = restaurant;
		$scope.map.showInfoWindow('foo-iw', restaurant.id);
	};*/

	/*$scope.hideDetail = function() {
		$scope.map.hideInfoWindow('foo-iw');
	};*/
	
		$scope.getRestaurantDetails = function(){

			var restaurantDetails;
				$http({
					method: 'GET',
					url: 'www/mock.json'
					})
				.then(function successCallback(response) {
					// this callback will be called asynchronously
					console.log('response');
					// when the response is available
					});/**/
				return restaurantDetails;
			
                   
         } 
	
		
	
		

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
// JavaScript Document



<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <title></title>

    <link rel="manifest" href="manifest.json">

    <!-- un-comment this code to enable service worker
    <script>
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
          .then(() => console.log('service worker installed'))
          .catch(err => console.log('Error', err));
      }
    </script>-->

    <link href="lib/ionic/css/ionic.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

    <!-- IF using Sass (run gulp sass first), then uncomment below and remove the CSS includes above
    <link href="css/ionic.app.css" rel="stylesheet">
    -->

    <!-- ionic/angularjs js -->
    <script src="lib/ionic/js/ionic.bundle.js"></script>

    <!-- cordova script (this will be a 404 during development) -->
    <script src="cordova.js"></script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAIlBmEEBgms_hhbcyU-uNciPRknniNQY&"></script>
    
	  <script src="lib/ng-map.min.js"></script>
	  <script src="lib/ng-cordova/dist/ng-cordova.js"></script>
    <!-- your app's js -->
    <script src="js/app.js"></script>
    <script src="js/controllers.js"></script>
  </head>

  <body ng-app="starter">
    <ion-nav-view></ion-nav-view>
  </body>
</html>
  
  <ion-view view-title="Playlists">
	<ion-content>		
	
		<ng-map zoom="11" center="[{{coords.latitude}}, {{coords.longitude}}]">
			<marker ng-repeat="p in positions"
					position="{{p.pos}}"
					data="{{data[$index]}}"
					on-click="showDetail(p)"
					title="pos: {{p.pos}}">
			</marker>
			<!--<info-window id="foo-iw">
				
				
					
					<!--id: {{restaurant.id}}<br/>
					name: {{restaurant.name}}<br/>
					Position 1: {{vm.shop.position}}<br/>
					Position 2: {{anchor.getPosition()}}<br/>
					Position 3: {{vm.map.markers[vm.shop.id].getPosition()}}<br/>
					<a href="#" ng-click="{{clicked()}}">Click Here</a>
				
			</info-window>-->
		</ng-map>
		
		
	</ion-content>
</ion-view>

					
					// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ngMap'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});

