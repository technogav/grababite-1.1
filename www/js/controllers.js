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

.controller('PlaylistsCtrl', function($scope ,$cordovaGeolocation, $ionicPlatform) {
	
	$scope.hello = "hello";
	

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
	});
	
	$scope.center = [53.3450897, -6.2638032];
	$scope.getRestaurantDetails  = [
			{
				"id": 1,
				"name": "Dublin Castle",
				"description": "Dublin castle, food fit for a king",
				"deal": "2 for One dining tonight",
				"coords": [53.3428848 , -6.2674266]
				},
				{
				"id": 2,
				"name": "The Brazen Head",
				"description": "Restaurant with BOLD flavour",
				"deal": "2 for One dining tonight",
				"coords": [53.3449312, -6.2763315]
			},
		{
				"id": 3,
				"name": "St. James",
				"description": "'Fresh Food' served in the comfort of your own bed (or trolly)",
				"deal": "2 for One dining tonight",
				"coords": [53.3400471, -6.2941736]
				},
				{
				"id": 4,
				"name": "Dicey's",
				"description": "Roll on up and give us a 'chance'",
				"deal": "2 for One dining tonight",
				"coords": [53.3358639, -6.2635589]
			}
		];
		
		
		
	/*var vm = this;
  vm.positions =[
    [40.71, -74.21], [40.72, -74.20], [40.73, -74.19], [40.74, -74.18],
    [40.75, -74.17], [40.76, -74.16], [40.77, -74.15], [40.77, -74.15]
  ];

  $interval(function() {
    
  }, 2000);
});*/

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
