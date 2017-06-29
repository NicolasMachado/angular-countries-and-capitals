viewsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/city/:code", {
    templateUrl : "./city/city.html",
    controller : 'CityCtrl'
  });
}]);

viewsModule.controller('CityCtrl', ['$scope', '$rootScope', '$location', '$q', 'cityRequest',
  function($scope, $rootScope, $location, $q, cityRequest) {
    const vm = this;
    $rootScope.loading = true;
    cityRequest()
      .then (function(result) {
        console.log(result);
        $rootScope.loading = false;
        vm.indivCity = result;
      })
}]);
