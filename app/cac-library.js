angular.module('cacLibrary', [])

  .constant('CAC_LIST_URL', 'http://api.geonames.org/countryInfo?username=zeroots')
  .factory('listRequest', ['$http', '$q', 'CAC_LIST_URL', function($http, $q, CAC_LIST_URL){
    return function(params){
      params = {
        type: 'JSON',
        nojsoncallback: 1
      }
      var reqParams = angular.extend({}, params);
      return $http.get(CAC_LIST_URL, {params: reqParams})
        .then(function(response){
          return $q.when(response.data);
        });
    };
  }])
