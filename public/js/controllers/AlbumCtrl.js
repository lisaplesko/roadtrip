roadTripApp.controller('AlbumCtrl', ['$scope', 'albumFactory', function($scope, albumFactory){

  function init(){
    // pass in user id
    console.log('initing?')
    albumFactory.getAlbums().success( function(data){
      $scope.albums = data;
    })
    .error(function(data){
      console.log('oh no! i, the controller, am the problem')
      console.log(data);
    });
  }

  init();
}])

