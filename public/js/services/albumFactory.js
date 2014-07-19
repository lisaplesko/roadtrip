roadTripApp.factory('albumFactory', ['$http', function($http){
  var factory = {};

  factory.getAlbums = function(){
    return $http.get("/api/albums/trinity")
  };

  factory.getPhotos = function(){
    return $http.get("/api/photos/peru")
  };

  return factory;
}]);
