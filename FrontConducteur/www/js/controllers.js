angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$interval) {

    navigator.geolocation.getCurrentPosition(function (position) {

      $interval(function(){

          $scope.positions = "lat:" + position.coords.latitude + ",lng: " + position.coords.longitude;
          console.log($scope.positions);
        },1000);


    });
  })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope, $auth) {



  $scope.authenticate = function(provider) {
    $auth.authenticate(provider);
  };

})

  .controller('GeoCtrl', function() {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

  })
;
