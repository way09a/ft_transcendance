(function () {
  'use strict';

  if (typeof window.PongGameAI === "undefined") {
    window.PongGameAI = {};
  }
  var GamePlayer = window.PongGameAI.GamePlayer = function (context, player_side, color_player, v_paddle) {
    this.context = context;
    var paddle_start_position = player_side == "left" ? [20, 215] : [780, 215];
    this.paddle = new PongGameAI.PlayerPaddle(this.context, paddle_start_position, color_player);
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
    var upKey = this.player_side == "left" ? 'KeyW' : 'KeyO';
    var downKey = this.player_side == "left" ? 'KeyS' : 'KeyL';
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
}

GamePlayer.prototype.cleanup = function() {
    window.removeEventListener("keydown", this.keypressListener);
    window.removeEventListener("keyup", this.keyupListener);
    this.paddle.cleanup();  // Make sure the Paddle class also has a cleanup method
    this.context = null;
    this.paddle = null;
    this.player_side = null;
    this.v_paddle = null;
    this.paddle_direction = null;
    this.player_points = null;
    console.log('Clean Player Resources');
  };
})();