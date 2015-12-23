/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('tutorialWebApp', [
  'ngRoute','UserCtrl'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Index
    .when("/", {templateUrl: "partials/User/registration.html", controller: "UserCtrl"})
    .when("/user/", {templateUrl: "partials/User/isConnected.html", controller: "UserCtrl"})
    // Pages

    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);




/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});