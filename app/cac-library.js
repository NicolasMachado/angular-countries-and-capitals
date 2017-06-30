angular.module('cacLibrary', [])

  .constant('CAC_LIST_URL', 'http://api.geonames.org/countryInfo?username=zeroots')
  .constant('CAC_INDIV_URL', 'http://api.geonames.org/search?username=zeroots')
  .constant('CAC_NEIGH_URL', 'http://api.geonames.org/neighbours?username=zeroots')

  .factory('listRequest', ['$http', '$q', 'CAC_LIST_URL', function($http, $q, CAC_LIST_URL){
    var bigList = [];
    var params = {
        type: 'JSON',
        nojsoncallback: 1
      }
    return {
      getAllCountries: function() {
        return $http.get(CAC_LIST_URL, {params: params})
          .then(function(response){
            bigList = response.data.geonames;
          })
      },
      returnAllCountries: function() {
        return bigList;
      }
    }
  }])

  .factory('cityRequest', ['$http', '$q', 'CAC_INDIV_URL',
      function($http, $q, CAC_INDIV_URL){
    return function(capital, countryCode) {
      params = {
        type: 'JSON',
        nojsoncallback: 1,
        q: capital,
        countryCode
      }
      return $http.get(CAC_INDIV_URL, {params: params})
        .then(function(response){
          return $q.when(response.data);
        });
    };
  }])

  .factory('neighborsRequest', ['$http', '$q', 'CAC_NEIGH_URL',
      function($http, $q, CAC_NEIGH_URL){
    return function(countryCode) {
      params = {
        type: 'JSON',
        nojsoncallback: 1,
        geonameId: countryCode
      }
      return $http.get(CAC_NEIGH_URL, {params: params})
        .then(function(response){
          return $q.when(response.data);
        });
    };
  }])
