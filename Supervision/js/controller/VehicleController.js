/**
 * Controls the User
 */
angular.module('VehicleCtrl', [])

.controller('VehicleCtrl', ['$scope','$http', 'socket', function($scope,$http, socket) {

        var map = L.map('map').setView([44.8584622, -0.5730805], 13);

        socket.on('send:time', function (data) {
            $scope.time = data.time;
        });
        socket.on('send:name', function (data) {
            $scope.name = data.name;
        });

        $scope.showForm = false;
        $scope.buttonShowHide = "Add Vehicle";
        $scope.vehicle =
        $http.get('http://localhost:1337/user')
            .then(function(data){
                $scope.user = data.data;
            }, function(){console.log("error get user")});

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'pedroc.on2148bk',
            accessToken: 'pk.eyJ1IjoicGVkcm9jIiwiYSI6ImNpamZrMjczdzAwMGd2bGx4ZWJyYTh3NTIifQ.RJ8GQ1EoWKL_OPdVR-HQEA'
        }).addTo(map);



        


        $scope.registerVehicle = function(vehicle){


           var succesCreateVehicle = function(immatricul){
                var reqV = {
                    method: 'POST',
                    url: 'http://localhost:1337/Vehicle',
                    headers: {
                        'Content-Type': undefined
                    },
                    data: {
                        immatricul: immatricul.data.id,
                    },
                }
               $http(reqV).then(function(){},function(){});
               console.log(immatricul.data.id);
            };

            var errorCreateVehicle = function(){
                console.log("Erreur création vehicle");
            };


            var req = {
                method: 'POST',
                url: 'http://localhost:1337/Immatricul',
                headers: {
                    'Content-Type': undefined
                },
                data: {
                    immatricul: vehicle.immatricul.immatricul,
                }
            }
            $http(req).then(succesCreateVehicle,errorCreateVehicle);
        };



        $scope.showFormAddVehicle = function(){
            $scope.showForm = !$scope.showForm;
            if($scope.showForm){
                $scope.buttonShowHide = "Hide form";
            }else{
                $scope.buttonShowHide = "Add Vehicle";
            }
        }

        $scope.getVehicle = function(){
            var successCallback = function(vehicle){

          $scope.vehicle = vehicle.data;
          angular.forEach($scope.vehicle, function(value, key) {

              if (value.usedBy !== undefined && value.usedBy != null) {

              var marker = L.marker([value.geolocalisation.latitude, value.geolocalisation.longitude]).addTo(map);
              marker.bindPopup("<b>Immatriculation : " + value.immatricul.immatricul + "</b><br>Conduit par " + value.usedBy.firstname + " " + value.usedBy.lastname + "<br />Etat : " + value.stateVehicle.stateVehicle).openPopup();


              $http.get('http://localhost:1337/accountType/' + value.usedBy.accountType)
                  .then(function (at) {


                      $scope.vehicle[key].usedBy.accountType = at.data.accountType;
                  }, function () {
                      console.log("Impossible de recuprer le type de compte");
                  }
              );
          }
          });




        //  console.log(vehicle.data);
        }

        var errorCallback = function(vehicle){
          console.log("Erreur");
        }

        $http.get('http://localhost:1337/vehicle')
            .then(successCallback, errorCallback);


        }

        $scope.getVehicle();

        $http.get('http://localhost:1337/user?accountType=2')
            .then(function(data){
                $scope.techniciens = data.data;

            }, function(){console.log("error get techniciens")});



            $scope.deleteVehicle = function(v){
              $http.delete('http://localhost:1337/vehicle/'+v.id)
              .then(function(){console.log("Delete vehicle ok")},function(){console.log("delete vehicle ko")});
            }


}]);