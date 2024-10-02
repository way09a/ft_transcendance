(function () {
  'use strict';
  
	if (typeof window.PingPongGameFour === "undefined") {
    window.PingPongGameFour = {};
  }

	var GameField = window.PingPongGameFour.GameField = function(context, field_height, field_width, color_ground, url_ground) {
    this.context = context;
    this.color_ground = color_ground;
    this.url_ground = url_ground;
    if (url_ground !== 'none'){
      this.image_ground = new Image();
      this.image_ground.src = this.url_ground;
    }
    else {
      this.image_ground = null;
    }
    this.size = [field_height, field_width];
  };

  
  GameField.prototype.render = function () {
    if ((this.url_ground !== 'none') && this.image_ground.complete && (this.image_ground.naturalWidth > 0)) {
      this.context.drawImage(this.image_ground, 0, 0, this.size[0], this.size[1]);
    } else {
      this.context.fillStyle = this.color_ground;
      this.context.fillRect(0, 0, this.size[0], this.size[1]);
    }
  }

  GameField.prototype.cleanup = function() {
    this.context = null;
    this.color_ground = null;
    this.url_ground = null;
    if (this.image_ground) {
      this.image_ground = null;
    }
    this.size = null;
    console.log('Clean GameField Resources');
  };
})();