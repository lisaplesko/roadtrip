roadTripApp.controller('HomeCtrl', ['$scope', 'homeFactory', function($scope, homeFactory){

  function init(){
    // pass in user id
    console.log('initing?')
    homeFactory.getAlbums().success( function(data){
      $scope.albums = data;
    })
    .error(function(data){
      console.log('oh no! i, the controller, am the problem')
      console.log(data);
    });
  }

  init();
}])

