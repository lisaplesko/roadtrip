roadTripApp.factory('albumFactory', ['$http', function($http){
  var factory = {};

  factory.getAlbums = function(username){
    return $http.get("/api/"+username+"/albums")
  };

  factory.getPhotos = function(username,album_title){
    return $http.get("/api/"+username+"/albums/"+album_title+'/photos')
  };

  return factory;
}]);
