angular.module('starter.controllers', ['ngToast'])

.controller('DashCtrl',['$scope','$interval','$http','ngToast','$window','$rootScope',
 function($scope,$interval,$http,ngToast,$window,$rootScope) {
  if(!$rootScope.userConnecte){
    $window.location.href= '#/tab/dash';
  }


    $scope.connectionUser = function(user){
        var successgetUser = function(userBdd){
          if(userBdd.data.length > 0){   
              if(userBdd.data[0].login == user.login && userBdd.data[0].password == user.password){
              $rootScope.userConnecte = userBdd.data[0];
              console.log("User connected");
              $window.location.href = '#/tab/account';
            }
          }else{
               console.log('Login or password incorrect');
          }
          

        }
        var errorGetUser = function(){
          console.log("Erreur connexion user");
        }

        $http.get('http://localhost:1337/user?login='+user.login)
        .then(successgetUser,errorGetUser);

    }


    $scope.deconnection = function(){
      console.log("deconnection");
      $rootScope.userConnecte=null;
      $window.location.href='#/tab/dash';
    }




    navigator.geolocation.getCurrentPosition(function (position) {

      $interval(function(){

          $scope.positions = "lat:" + position.coords.latitude + ",lng: " + position.coords.longitude;
          console.log($scope.positions);
        },1000);


    });
  }])

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

.controller('AccountCtrl', function ($scope,$window,$http,$rootScope) {
     $scope.user = $rootScope.userConnecte;
     $http.get('http://localhost:1337/vehicle?usedBy='+$scope.user.id)
      .then(function(vehicle){
        $scope.vehicle = vehicle.data[0];
        console.log($scope.vehicle);
      },function(){
        console.log("Erreur recupértion vehicle");
      });


      $scope.formAskHelp = function(data){
        console.log($scope.vehicle);
        var successRegisterLogVehicle = function(){
          console.log("Etat du vehicule courant mis en base pour historique");
        }
        var errorRegistrerLogVehicle = function(){
          console.log("Erreur enregistrement etat en base historique");
        }


            var req = {
             method: 'POST',
             url: 'http://localhost:1337/logvehicle',
             headers: {
               'Content-Type': undefined
             },
             data: { 

                vehicle: $scope.vehicle.id,
                user : $scope.vehicle.usedBy.login,
                stateVehicle : $scope.vehicle.stateVehicle.stateVehicle,
                levelBreakdown : $scope.vehicle.levelBreakdown,
            }
          }
        $http(req).then(successRegisterLogVehicle,errorRegistrerLogVehicle);  
      }



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
