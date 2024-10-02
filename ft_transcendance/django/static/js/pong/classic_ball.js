(function () {
  'use strict';

  if (typeof window.PingPongGame === "undefined") {
    window.PingPongGame = {};
  }


  var GameBall = window.PingPongGame.GameBall = function(context, color_ball, url_ball, v_init) {
    this.context = context;
    this.color_ball = color_ball;
    if (url_ball !== 'none'){
      this.image_ball = new Image()
      this.image_ball.src = url_ball;
    }
    else
    {
      this.image_ball = null
    }
    this.url_ball = url_ball;
    this.ball_position = [400, 250];
    this.ball_radius = 10;
    this.ball_speed = [v_init, v_init];
    this.v_init = v_init;
    this.ball_hits = 0;
    this.ball_newHit = 0;
  };

  GameBall.prototype.is_top = function() {
    return (this.ball_position[1] - this.ball_radius) <= 0;
  }

  GameBall.prototype.is_bottom = function() {
    return (this.ball_position[1] + this.ball_radius) > this.context.canvas.height;
  } 

  GameBall.prototype.is_left = function() {
    return (this.ball_position[0] + this.ball_radius) < 0 && this.ball_speed[0] < 0;
  }

  GameBall.prototype.is_right = function() {
    return (this.ball_position[0] + this.ball_radius) > this.context.canvas.width && this.ball_speed[0] > 0;
  }

  GameBall.prototype.more_left = function(x1, x2) {
    return (this.ball_position[0] - this.ball_radius >= x1 && this.ball_position[0] - this.ball_radius <= x2);
  }

  GameBall.prototype.more_right = function(x1, x2) {
    return (this.ball_position[0] + this.ball_radius >= x1 && this.ball_position[0] + this.ball_radius <=x2);
  }

  GameBall.prototype.between_Y = function(y1, y2) {
    return (this.ball_position[1] >= y1 && this.ball_position[1] <=y2);
  }

  GameBall.prototype.move = function () {
    if (this.is_top() || this.is_bottom()) {
      this.ball_speed[1] = -this.ball_speed[1];
    } 
    this.ball_position[0] += this.ball_speed[0];
    this.ball_position[1] += this.ball_speed[1];
  };

  GameBall.prototype.change_ball_direction = function() {
    this.ball_speed[0] = -this.ball_speed[0];
  }

  GameBall.prototype.reset_increment = function () {
    this.ball_speed[0] = this.v_init;
    this.ball_speed[1] = this.v_init;
    this.ball_hits = 0;
    this.ball_newHit = 0;
  };

  GameBall.prototype.check_hits = function () {
    return (this.ball_newHit > 0)
  };

  GameBall.prototype.increase_ball_speed = function () {
    if (this.check_hits()) {
      this.ball_speed[0] += (this.ball_speed[0] < 0) ? -0.5 : 0.5;
      this.ball_speed[1] += (this.ball_speed[1] < 0) ? -0.5 : 0.5;
      this.ball_newHit = 0;
    }

  };

  GameBall.prototype.render = function () {
    if ((this.url_ball !== 'none') && this.image_ball.complete) {
      this.context.drawImage(this.image_ball, this.ball_position[0] - this.ball_radius, this.ball_position[1] - this.ball_radius, this.ball_radius * 2, this.ball_radius * 2);
    }
    else {
      this.context.beginPath();
      this.context.arc(this.ball_position[0], this.ball_position[1], this.ball_radius, 0, 2 * Math.PI);
      this.context.fillStyle = this.color_ball;
      this.context.fill();
    }
  }

  GameBall.prototype.cleanup = function() {
    // Removing references to objects
    this.context = null;
    this.color_ball = null;
    if (this.image_ball) {
      this.image_ball.src = '';
      this.image_ball = null;
    }
    this.url_ball = null;
    this.ball_position = null;
    this.ball_speed = null;
    this.v_init = null;
    this.ball_hits = null;
    this.ball_newHit = null;
    console.log('Clean GameBall Resources');
  };
})();