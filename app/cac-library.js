angular.module('cacLibrary', [])

  .constant('CAC_LIST_URL', 'http://api.geonames.org/countryInfo?username=zeroots')
  .constant('CAC_INDIV_URL', 'http://api.geonames.org/search?username=zeroots')

  .factory('listRequest', ['$http', '$q', 'CAC_LIST_URL', function($http, $q, CAC_LIST_URL){
    var bigList = [];
    return function(){
      params = {
        type: 'JSON',
        nojsoncallback: 1
      }
      var reqParams = angular.extend({}, params);
      return $http.get(CAC_LIST_URL, {params: reqParams})
        .then(function(response){
          bigList = response.data.geonames;
          return $q.when(response.data);
        });
    };
  }])

  .factory('cityRequest', ['$http', '$q', 'CAC_INDIV_URL', function($http, $q, CAC_INDIV_URL){
    return function(params){
      params = {
        type: 'JSON',
        nojsoncallback: 1,
        q: 'Paris'
      }
      var reqParams = angular.extend({}, params);
      return $http.get(CAC_INDIV_URL, {params: reqParams})
        .then(function(response){
          return $q.when(response.data);
        });
    };
  }])
