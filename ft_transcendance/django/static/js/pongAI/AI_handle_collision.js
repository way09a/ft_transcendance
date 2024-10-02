(function () {
  'use strict';
  if (typeof window.PongGameAI === "undefined") {
    window.PongGameAI = {};
  }

  var HandleCollision = window.PongGameAI.HandleCollision = function (GamePlayer, GameBall, context) {
    this.Gplayer = GamePlayer;
    this.ball = GameBall;
    this.context = context;
    this.hits = 0;
  }

  HandleCollision.prototype.hit_left = function() {
    return (this.ball.more_left(this.Gplayer.paddle.paddle_position[0], this.Gplayer.paddle.paddle_position[0] + this.Gplayer.paddle.width) && 
            this.ball.between_Y(this.Gplayer.paddle.paddle_position[1], this.Gplayer.paddle.paddle_position[1] + this.Gplayer.paddle.height));
  }

  HandleCollision.prototype.hit_right = function() {
    return (this.ball.more_right(this.Gplayer.paddle.paddle_position[0], this.Gplayer.paddle.paddle_position[0] + this.Gplayer.paddle.width) &&
            this.ball.between_Y(this.Gplayer.paddle.paddle_position[1], this.Gplayer.paddle.paddle_position[1] + this.Gplayer.paddle.height));
  }

  HandleCollision.prototype.check_collision = function() {
    if (this.Gplayer.player_side == "left" && this.hit_left()) {
      this.ball.change_ball_direction()
      this.ball.ball_hits += 1;
      this.ball.ball_newHit += 1;
    } else if (this.Gplayer.player_side == "right" && this.hit_right()) {
      this.ball.change_ball_direction()
      this.ball.ball_hits += 1;
      this.ball.ball_newHit += 1;
    }
  };

  HandleCollision.prototype.score = function () {
    if (this.Gplayer.player_side == "right" && this.ball.is_left()) {
        this.Gplayer.player_points += 1;
        this.ball.reset_increment();
        this.ball.change_ball_direction();
        this.ball.ball_position[0] = this.context.canvas.width / 2;
        this.ball.ball_position[1] = this.context.canvas.height / 2;
        
    } else if (this.Gplayer.player_side == "left" && this.ball.is_right()) {
              this.Gplayer.player_points +=1;
              this.ball.reset_increment();
              //this.ball.changeBallDirection();
              this.ball.ball_position[0] = this.context.canvas.width / 2;
              this.ball.ball_position[1] = this.context.canvas.height / 2;
    }
  };

  HandleCollision.prototype.cleanup = function() {
    // Removing references to objects
    this.Gplayer = null;
    this.ball = null;
    this.context = null;
    this.hits = null;
    console.log('Cleaned HandleCollision resources');
  };
})();