roadTripApp.controller('AlbumCtrl', ['$scope', 'albumFactory', function($scope, albumFactory){

  function init(){
    // pass in user id
    console.log('initing?')
    albumFactory.getAlbums().success( function(data){
      $scope.albums = data;
    })
    .error(function(data){
      console.log('oh no! i, the getalbums controller, am the problem')
      console.log(data);
    });

    albumFactory.getPhotos().success( function(data){
      $scope.photos = data; })
    .error(function(data){
      console.log('oh no! i, the getphotos controller, am the problem')
      console.log(data);
    });
  }

  init();
}])

