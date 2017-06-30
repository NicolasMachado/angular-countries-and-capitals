viewsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/country/:code", {
    templateUrl : "./country/country.html"
  });
}]);

viewsModule.controller('CityCtrl', ['$scope', '$rootScope', '$location', '$q', 'cityRequest', '$routeParams', 'listRequest', 'neighborsRequest',
  function($scope, $rootScope, $location, $q, cityRequest, routeParams, listRequest, neighborsRequest) {
    const vm = this;
    $rootScope.loading = true;
    vm.country = '';
    vm.neighbours = [];

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
          vm.capital = result.geonames[0];
        })
        .then (function() {
          neighborsRequest(vm.country.geonameId)
          .then (function(result) {
            vm.neighbours = result.geonames ? result.geonames.slice(0, 3) : [];
            $rootScope.loading = false;
          })
        });
    }
}]);
