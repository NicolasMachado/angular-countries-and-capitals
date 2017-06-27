angular.module('cacApp', ['ngRoute', 'ngAnimate'])
  .config(function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({
      redirectTo : '/'
    });
    $routeProvider.when('/', {
        templateUrl : 'home/home.html',
        controller : 'HomeCtrl'
    });
    $routeProvider.when('/list', {
        templateUrl : 'countries-list/list.html',
        controller : 'HomeCtrl'
    });
  });
