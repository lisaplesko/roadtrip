$(document).ready(function(){
  roadTripAdd.screenshot.init();
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
    image.id = IdGenerator.generateId();
    image.src = canvas.toDataURL();

    // Persist the image - save the whole image or just the url?????
    this.sendToS3(image);

    // Updat the list.
    var template = '<li class="" data-id="' + image.id + '"></li>';
    var picList = $('#picList');
    picList.append(template);
    picList.children().last().append(image);
  },

  sendToS3 : function(image){
    $.ajax({
      url: '/add_to_album',
      method: 'post',
      dataType: 'json',
      data: image
    }).done(function(data) {
      console.log(data);
      console.log("Added to album!");
    });

  }
};

var IdGenerator = {
  generateId : function(){
    return new Date().getTime();
  }
};
