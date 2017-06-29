viewsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/city/:code", {
    templateUrl : "./city/city.html"
  });
}]);

viewsModule.controller('CityCtrl', ['$scope', '$rootScope', '$location', '$q', 'cityRequest', '$routeParams', 'listRequest',
  function($scope, $rootScope, $location, $q, cityRequest, routeParams, listRequest) {
    const vm = this;
    $rootScope.loading = true;
    vm.country = '';

    let allCountries = listRequest.returnAllCountries();
    if (allCountries.length === 0) {
      listRequest.getAllCountries()
        .then(function() {
          allCountries = listRequest.returnAllCountries();
          singleOutCountry(routeParams.code);
        })
    } else {
      singleOutCountry(routeParams.code);
    }

    function singleOutCountry(code) {
      for (var i = 0; i<allCountries.length; i++) {
        if (allCountries[i].countryCode === code) {
          vm.country = allCountries[i];
        }
      }
      getCapitalDetails(vm.country.capital, vm.country.countryCode);
    }

    function getCapitalDetails(capital, countryCode) {
      cityRequest(capital, countryCode)
        .then (function(result) {
          $rootScope.loading = false;
          vm.capital = result.geonames[0];
          vm.name = vm.capital.name;
          console.log(vm.capital)
        })
    }
}]);
