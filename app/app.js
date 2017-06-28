angular.module('cacApp', ['cacViews', 'ngRoute', 'ngAnimate'])
  .config(function($locationProvider, $routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({
      redirectTo : '/'
    });
  });
