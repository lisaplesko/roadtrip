'use strict';

var roadTripApp = angular.module('roadTripApp', ['ngRoute']);

// Routes

roadTripApp.config(['$routeProvider', function ($routeProvider){

  $routeProvider
    .when('/',
    {
      controller:
      templateUrl:
    })
    .when('/albums',
    {
      controller:
      templateUrl:
    })
    .when('/trip',
    {
      controller:
      templateUrl:
    })
    .otherwise({ redirectTo: '/' });

}])
