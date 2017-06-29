viewsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/list", {
    templateUrl : "./countries-list/list.html",
    controller : 'ListCtrl'
  });
}]);

viewsModule.controller('ListCtrl', ['$scope', '$rootScope', '$location', '$q', 'listRequest',
  function($scope, $rootScope, $location, $q, listRequest) {
    const vm = this;
    $rootScope.loading = true;
    console.log(listRequest)
    listRequest()
      .then (function(result) {
        $rootScope.loading = false;
        vm.allCities = result.geonames;
      })

    vm.goToCity = function (cityCode) {
      $location.path('/city/' + cityCode);
    }
}]);
