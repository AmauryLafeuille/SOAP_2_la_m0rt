angular.module('starter.controllers', ['ngToast','ngRoute'])

.controller('DashCtrl',['$scope','$interval','$http','ngToast','$window','$route',
 function($scope,$interval,$http,ngToast,$window,$route) {
  if(!sessionStorage.userId){
    $window.location.href= '#/tab/dash';
    $route.reload();
  }


    $scope.connectionUser = function(user){
        var successgetUser = function(userBdd){
          if(userBdd.data.length > 0){   
              if(userBdd.data[0].login == user.login && userBdd.data[0].password == user.password){;
             sessionStorage.userId = userBdd.data[0].id;
             sessionStorage.userLogin = userBdd.data[0].login;
             sessionStorage.userFirstname = userBdd.data[0].firstname;
             sessionStorage.userLastname = userBdd.data[0].lastname; 
              console.log("User connected");
              $window.location.href = '#/tab/info';
              $route.reload();
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



    navigator.geolocation.getCurrentPosition(function (position) {

      $interval(function(){

          $scope.positions = "lat:" + position.coords.latitude + ",lng: " + position.coords.longitude;
          console.log($scope.positions);
        },1000);


    });
  }])

.controller('InfoCtrl', function ($scope,$window,$http,$route) {


  $scope.getAction = function(){
    var successGetAction = function(action){
      $scope.actionGet = action.data;
      var action = action.data;
      angular.forEach(action, function(value, key) {
        $http.get('http://localhost:1337/immatricul/' + value.vehicle.immatricul).then(
          function(imma){
            $scope.actionGet[key].vehicle.stringimmatricul = imma.data.immatricul; 
          },function(){console.log('error get imma imma');})
        
      });

    };
    var errorGetAction = function(){
      console.log("Erreur get action");
    };
    $http.get('http://localhost:1337/action?repairman='+sessionStorage.userId)
    .then(successGetAction,errorGetAction);
  };


  $scope.showVehicleOnMap = function(){
    //@ TODO
  }








  $scope.getAction();





     
})

;
