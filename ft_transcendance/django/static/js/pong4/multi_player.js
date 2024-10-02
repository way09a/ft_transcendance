(function () {
  'use strict';

  if (typeof window.PingPongGameFour === "undefined") {
    window.PingPongGameFour = {};
  }
  var GamePlayer = window.PingPongGameFour.GamePlayer = function (context, player_side, color_player, v_paddle) {
    this.context = context;


    if( player_side == "left"){
      var paddle_start_position = [20, 143];
    }else if (player_side == "left1"){
      var paddle_start_position = [20, 246];
    }else if (player_side == "right"){
      var paddle_start_position =  [780, 143];
    }else{
      var paddle_start_position =  [780, 246];
    }

    this.paddle = new PingPongGameFour.PlayerPaddle(this.context, paddle_start_position, color_player);
    this.player_side = player_side;
    this.v_paddle = v_paddle;
    this.paddle_direction = 0;
    this.player_points = 0;
    this.set_listeners();
  }

  GamePlayer.prototype.render = function () {
    this.paddle.move(this.paddle_direction);
    this.paddle.render();
  }

  GamePlayer.prototype.check_paddle_position = function () {
    if (this.paddle.is_top()) {
        this.paddle_direction = 0;
    } else if (this.paddle.is_bottom()) {
        this.paddle_direction = 0;
    }
  }

  GamePlayer.prototype.set_listeners = function () {
    var player = this;
    if( this.player_side === "left"){
      var upKey = 'KeyW'; //w
      var downKey = 'KeyS';  //s
    }else if (this.player_side === "left1"){
      var upKey = 'KeyT'; //t
      var downKey = 'KeyG';  //g
    }else if (this.player_side === "right"){
      var upKey = 'KeyO'; //o
      var downKey = 'KeyL';  //l
    }else{
      var upKey = 'KeyU'; // u
      var downKey = 'KeyJ';  //j
    }
    window.addEventListener("keydown", function (event) {
        if (event.code == upKey) {
            player.paddle_direction = -1 * player.v_paddle;
        } else if (event.code == downKey) {
            player.paddle_direction = player.v_paddle;
        }
    });
    window.addEventListener("keyup", function (event) {
        if (event.code == upKey || event.code == downKey) {
            player.paddle_direction = 0;
        }
    });
    window.addEventListener("keyup", function (event) {
      player.paddle_direction = 0;
    });
  }

  GamePlayer.prototype.cleanup = function() {
    window.removeEventListener("keypress", this.keypressListener);
    window.removeEventListener("keyup", this.keyupListener);
    this.paddle.cleanup();  // Make sure the Paddle class also has a cleanup method
    this.context = null;
    this.paddle = null;
    this.player_side = null;
    this.v_paddle = null;
    this.paddle_direction = null;
    this.player_points = null;
    console.log('Clean GamePlayer Resources');
  };
})();