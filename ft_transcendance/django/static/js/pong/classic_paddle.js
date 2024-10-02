(function () {
  'use strict';

  if (typeof window.PingPongGame === "undefined") {
    window.PingPongGame = {};
  }

  var PlayerPaddle = window.PingPongGame.PlayerPaddle = function (context, paddle_position, color_player) {
    this.context = context;
    this.paddle_position = paddle_position;
    this.color_player = color_player;
    this.width = 10;
    this.height = 70;
  }

  PlayerPaddle.prototype.render = function () {
    this.context.beginPath();
    this.context.rect(this.paddle_position[0], this.paddle_position[1], this.width, this.height);
    this.context.fillStyle = this.color_player;
    this.context.fill();
  }

  PlayerPaddle.prototype.move = function (direction) {
    this.paddle_position[1] += direction;
    if (this.paddle_position[1] < 0) {
        this.paddle_position[1] = 0;
    } else if (this.paddle_position[1] + this.height > this.context.canvas.height) {
      this.paddle_position[1] = this.context.canvas.height - this.height;
    }
  }

  PlayerPaddle.prototype.is_top = function () {
    return (this.paddle_position[1] <= 0)
  }

  PlayerPaddle.prototype.is_bottom = function () {
    return (this.paddle_position[1] + this.height >= this.context.canvas.height)
  }

  PlayerPaddle.prototype.cleanup = function() {
    this.context = null;
    this.paddle_position = null;
    this.color_player = null;
    this.width = null;
    this.height = null;
    console.log('Clean Paddle Features');
  };

})();