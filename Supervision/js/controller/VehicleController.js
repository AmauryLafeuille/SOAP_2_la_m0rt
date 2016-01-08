/**
 * Controls the User
 */
angular.module('VehicleCtrl', [])

.controller('VehicleCtrl', ['$scope','$http','$route','$window', function($scope,$http,$route,$window) {


        var successCallback = function(vehicle){
          $scope.vehicle = vehicle.data;
          console.log(vehicle.data);
        }

        var errorCallback = function(vehicle){
          console.log("Erreur");
        }

        $http.get('http://localhost:1337/vehicle')
        .then(successCallback, errorCallback);





}]);