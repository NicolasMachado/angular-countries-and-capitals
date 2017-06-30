viewsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/list", {
    templateUrl : "./countries-list/list.html"
  });
}]);

viewsModule.controller('ListCtrl', ['$scope', '$rootScope', '$location', '$q', 'listRequest',
  function($scope, $rootScope, $location, $q, listRequest) {
    const vm = this;
    $rootScope.loading = true;
    if (listRequest.returnAllCountries().length === 0) {
      listRequest.getAllCountries()
        .then (function() {
          $rootScope.loading = false;
          vm.allCities = listRequest.returnAllCountries();
        })
    } else {
      $rootScope.loading = false;
      vm.allCities = listRequest.returnAllCountries();
    }

    vm.goToCity = function (cityCode) {
      $location.path('/country/' + cityCode);
    }
}]);
