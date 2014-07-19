roadTripApp.controller('HomeCtrl', ['$scope', 'homeFactory', function($scope, homeFactory){

  function init(){
    // pass in user id
    console.log('initing?')
    homeFactory.getMongoItems().success( function(data){
      $scope.images = (["dog","cat"],["boy","man"]);
    })
    .error(function(data){
      console.log('oh no! i, the controller, am the problem')
      console.log(data);
    });
  }

  init();
}])

