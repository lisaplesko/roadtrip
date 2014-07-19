roadTripApp.factory('homeFactory', ['$http', function($http){
  var factory = {};

  factory.getMongoItems = function(){
    return $http.get("/api/photos")
  };

  return factory;
}]);
