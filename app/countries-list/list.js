viewsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/list", {
    templateUrl : "./countries-list/list.html",
    controller : 'HomeCtrl'
  });
}]);
