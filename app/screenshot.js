$(document).ready(function(){

  $(document).keypress(function(e){
    if (e.keyCode == 32 && $('#spacebar').length) {
      alert('spacebar!');
      // Insert function to take screenshot
    }
    e.preventDefault();
  });


  // var canvas = document.getElementById('joyRide')
  // var image = new Image();
  // image.id = "pic"
  // image.src = canvas.toDataURL();


});
