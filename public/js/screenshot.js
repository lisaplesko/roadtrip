$(document).ready(function(){
  roadTripAdd.screenshot.init();
});

roadTripApp.screenshot = {
  init : function(){
    var that = this;
    $(document).keypress(function(e){
      if($('#screen') && e.keyCode == 32) {
        this.capture();
      }
    });
  },

  capture : function(){

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
