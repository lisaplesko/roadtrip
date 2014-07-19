$(document).ready(function(){
  roadTripApp.screenshot.init();
});

roadTripApp.screenshot = {
  init : function(){
    var that = this;
    $(document).keypress(function(e){
      if($('#screen') && e.keyCode == 32) {
        that.capture();
      }
    });
  },

  capture : function(){
    // Fetch canvas and apply screenshot to a new Image object.

    var canvas = document.getElementById('hyperFixed');

    var image = new Image();
    image.src = canvas.toDataURL();
    var image_data = image.src
    // Persist the image - save the whole image or just the url?????
    var title = document.title.split('|')
    // var username = title[0]
    // var album_name = title[1]
    var username = 'trinity'
    var album_name = 'peru'
    var new_image = this.postPhoto(username, album_name,image_data);

    console.log(image_data)
    // Update the list.
    // var template = '<li class="" data-id="' + new_image.id + '"><img src="'+new_image.url + '"/></li>';
    // var picList = $('#picList');
    // picList.append(template);
  },

  postPhoto: function(username,album_name,image_data){
    $.ajax({
      url: '/api/'+username+'/albums/'+album_name+'/add_to_album',
      method: 'post',
      dataType: 'json',
      data: {file: image_data}
    }).done( function(data){
      console.log("Added to album!");
    });
  }
};
