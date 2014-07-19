$(document).ready(function(){
  takePhoto();
});


var takePhoto = function(){
  $(document).keypress(function(e){
    if (e.keyCode == 32 && $('#spacebar').length) {
      alert('spacebar!');
      // Insert function to take screenshot

      sendToS3(image)
    }
    e.preventDefault();
  });
  // var canvas = document.getElementById('joyRide')
  // var image = new Image();
  // image.id = "pic"
  // image.src = canvas.toDataURL();
}

var sendToS3 = function(image){
  $.ajax({
          url: '/add_to_album',
          method: 'post',
          dataType: 'json',
          data: image
        }).done(function(data) {
          console.log(data);
          console.log("Added to album!")
            });

}
