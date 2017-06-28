viewsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/list", {
    templateUrl : "./countries-list/list.html",
    controller : 'ListCtrl'
  });
}]);

viewsModule.controller('ListCtrl', ['$scope', '$rootScope', '$location', '$q', 'listRequest',
  function($scope, $rootScope, $location, $q, listRequest) {
    var vm = this;
    $rootScope.loading = true;
    listRequest()
      .then (function(result) {
        $rootScope.loading = false;
        vm.allCities = result.geonames;
        console.log(vm.allCities);
      })
}]);
