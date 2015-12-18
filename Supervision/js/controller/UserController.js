/**
 * Controls the User
 */
angular.module('UserCtrl', [])

.controller('UserCtrl', ['$scope','$http','$route', function($scope,$http,$route) {


  	 $scope.connection = function(user) {
  	 		

  	 		var successCallback = function(user){
  	 			$scope.userReponse = user.data[0];
  	 			sessionStorage.user = user.data[0];  	 		
  	 		}
  	 		var errorCallback = function(user){
  	 			console.log("Erreur");
  	 		}
  	 		$http.get('http://localhost:1337/user?login='+$scope.user.login)
  	 		.then(successCallback, errorCallback);

  	 		if(sessionStorage){
  	 			console.log('Connecté');
  	 		}

      };


      $scope.deconnection = function(){
      	console.log("deconnection");
      	sessionStorage.clear();
      	console.log(sessionStorage);
      	$route.reload();
      };

}]);