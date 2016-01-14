/**
 * Controls the User
 */
angular.module('UserCtrl', [])

.controller('UserCtrl', ['$scope','$http','$route','$window', function($scope,$http,$route,$window) {


/// Scope Function



  	 $scope.connection = function(user) {
  	 		console.log("Connection");
  	 		var successCallback = function(user){
          // Si user exist in bdd
          if(user.data[0]){
            var loginBdd = user.data[0].login;
            var passwordBdd = user.data[0].password;  
            if(loginBdd == $scope.user.login && passwordBdd == $scope.user.password){
              sessionStorage.user = user.data[0];
              console.log("User connected");
              $window.location.href = '#/user/';
            }
          }else{
            console.log("User / password incorrect");
          }
        }

  	 		var errorCallback = function(user){
  	 			console.log("Erreur");
  	 		}

  	 		$http.get('http://localhost:1337/user?login='+$scope.user.login)
  	 		.then(successCallback, errorCallback);
      };


      $scope.deconnection = function(){
      	console.log("Déconnection");
      	sessionStorage.clear();
      	console.log(sessionStorage);
      	$route.reload();
      };


      $scope.isConnected = function(){
        console.log("isConnected");
        $scope.user = sessionStorage.user;
      };


      $scope.showUsers = function(){
          var succesShowUsers = function(users){
               $scope.users = users.data;
            console.log($scope.users);
          }
          var errorShowUsers = function(users){

            console.log("Erreur affichage des users.");
          }
        $http.get('http://localhost:1337/user')
        .then(succesShowUsers, errorShowUsers);
      };



// au démarrage du controller



$scope.showUsers();










}]);