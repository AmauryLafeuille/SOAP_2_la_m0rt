/**
 * Controls the User
 */
angular.module('VehicleCtrl', [])

    .controller('VehicleCtrl', ['$scope', '$http', 'socket', function ($scope, $http, socket) {

        var map = L.map('map').setView([44.8584622, -0.5730805], 13);

        var truckGreenIcon = L.icon({
            iconUrl: '/img/marker-repairman.png',

            iconSize: [125, 125], // size of the icon
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        socket.on('send:vehicle', function () {
            console.log('socket');
            $scope.getVehicle();
        });


        $scope.showForm = false;
        $scope.buttonShowHide = "Add Vehicle";
        $scope.vehicle =
            $http.get('http://localhost:1337/user')
                .then(function (data) {
                    $scope.user = data.data;
                }, function () {
                    console.log("error get user")
                });

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'pedroc.on2148bk',
            accessToken: 'pk.eyJ1IjoicGVkcm9jIiwiYSI6ImNpamZrMjczdzAwMGd2bGx4ZWJyYTh3NTIifQ.RJ8GQ1EoWKL_OPdVR-HQEA'
        }).addTo(map);


        $scope.registerVehicle = function (vehicle) {


            var succesCreateVehicle = function (immatricul) {
                var reqV = {
                    method: 'POST',
                    url: 'http://localhost:1337/Vehicle',
                    headers: {
                        'Content-Type': undefined
                    },
                    data: {
                        immatricul: immatricul.data.id,
                        stateVehicle: 4,
                        levelBreakdown: 5,
                        usedBy: 0,
                    },
                }
                $http(reqV).then(function () {
                    $scope.refreshVehicle = !$scope.refreshVehicle;
                }, function () {
                });
                console.log(immatricul.data.id);
            };

            var errorCreateVehicle = function () {
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
            $http(req).then(succesCreateVehicle, errorCreateVehicle);
        };


        $scope.gotoMap = function (latitude, longitude) {
            if (latitude !== undefined && longitude !== undefined)
                map.setView([latitude, longitude], 13);
        };

        $scope.showFormAddVehicle = function () {
            $scope.showForm = !$scope.showForm;
            if ($scope.showForm) {
                $scope.buttonShowHide = "Hide form";
            } else {
                $scope.buttonShowHide = "Add Vehicle";
            }
        }

        $scope.getVehicle = function () {
            var successCallback = function (vehicle) {

                $scope.vehicle = vehicle.data;
                angular.forEach($scope.vehicle, function (value, key) {

                    if (value.usedBy !== undefined && value.usedBy != null) {

                        if (value.geolocalisation !== undefined && value.geolocalisation != null) {
                            var marker = L.marker([value.geolocalisation.latitude, value.geolocalisation.longitude]/*,{icon: truckGreenIcon}*/).addTo(map);
                            marker.bindPopup("<b>Immatriculation : " + value.immatricul.immatricul + "</b><br>Conduit par " + value.usedBy.firstname + " " + value.usedBy.lastname + "<br />Etat : " + value.stateVehicle.stateVehicle).openPopup();

                        }
                        $http.get('http://localhost:1337/accountType/' + value.usedBy.accountType)
                            .then(function (at) {


                                $scope.vehicle[key].usedBy.accountType = at.data.accountType;
                            }, function () {
                                console.log("Impossible de recuprer le type de compte");
                            }
                        );
                    }
                });
            };

            var errorCallback = function (vehicle) {
                console.log("Erreur");
            };
            $http.get('http://localhost:1337/vehicle')
                .then(successCallback, errorCallback);
        };

        $scope.getVehicle();


        $http.get('http://localhost:1337/user?accountType=1')
            .then(function (data) {
                $scope.techniciens = data.data;

            }, function () {
                console.log("error get techniciens")
            });


        $scope.$watch("refreshVehicle", function () {
            $scope.getVehicle();
        })

        $scope.deleteVehicle = function (v) {
            $http.delete('http://localhost:1337/vehicle/' + v.id)
                .then(function () {
                    console.log("Delete vehicle ok")
                    $scope.refreshVehicle = !$scope.refreshVehicle;
                }, function () {
                    console.log("delete vehicle ko")
                });
        }

        $http.get('http://localhost:1337/action?repairman=' + 3 + '&stateAction=2')
            .then(function (data) {
                console.log("OK");
            }, function () {
                console.log("Erreur lors de l'appel de l'api")
            });


    }]);