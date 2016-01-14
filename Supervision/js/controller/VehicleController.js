/**
 * Controls the User
 */
angular.module('VehicleCtrl', [])

.controller('VehicleCtrl', ['$scope','$http','$route','$window', function($scope,$http,$route,$window) {


        var successCallback = function(vehicle){
          $scope.vehicle = vehicle.data;
          angular.forEach($scope.vehicle, function(value, key) {
            $http.get('http://localhost:1337/accountType/'+value.usedBy.accountType)
            .then(function(at){
 
                $scope.vehicle[key].usedBy.accountType = at.data.accountType;
                },function(){
                  console.log("Impossible de recuprer le type de compte");
                }
            );
          });


        //  console.log(vehicle.data);
        }

        var errorCallback = function(vehicle){
          console.log("Erreur");
        }

        $http.get('http://localhost:1337/vehicle')
        .then(successCallback, errorCallback);







}]);