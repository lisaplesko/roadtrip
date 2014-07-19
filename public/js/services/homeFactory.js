roadTripApp.factory('homeFactory', ['$http', function($http){
  var factory = {};

  factory.getAlbums = function(){
    return $http.get("/api/albums/trinity")
  };

  return factory;
}]);
