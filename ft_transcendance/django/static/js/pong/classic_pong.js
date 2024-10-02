(function () {
  'use strict';

  if (typeof window.PingPongGame === "undefined") {
    window.PingPongGame = {};
  }
    var Game = PingPongGame.Game = function (canvas, defines) {
      this.canvas = canvas;
      this.context = canvas.getContext('2d');
      this.canvas.width = defines.game_width;
      this.canvas.height = defines.game_height;
      this.ball = new PingPongGame.GameBall(this.context, defines.color_ball, defines.url_ball, defines.v_init);
      this.field = new PingPongGame.GameField(this.context, defines.game_width, defines.game_height, defines.color_ground, defines.url_ground);

      this.player_left = new PingPongGame.GamePlayer(this.context, "left", defines.left_color, defines.v_paddle);
      this.player_right = new PingPongGame.GamePlayer(this.context, "right", defines.right_color, defines.v_paddle);
  
      this.left_collision = new PingPongGame.HandleCollision(this.player_left, this.ball, this.context);
      this.right_collision = new PingPongGame.HandleCollision(this.player_right, this.ball, this.context);
    
      this.maxPoints = defines.max_points;
    
      this.player_leftName = defines.player_name_left;
      this.player_rightName = defines.player_name_right;
    
      this.match_interval = null;
      this.match_active = true;
      this.match_running = true;
      this.match_winner = null;
    
      // This line creates an instance of the handle_route_change function and sets its context to the this object of the Game class. 
	  this.handle_route_change_bound = this.handle_route_change.bind(this);
      //This line creates a function that sends a new event called locationchange to the browser window. This is used to handle URL changes or date shifts for SPAs .
	  this.locationChangeHandler = () => { window.dispatchEvent(new Event('locationchange')) };

     // This adds a listener for the visibilitychange event, which fires when the document's visibility state changes (for example, when the user navigates away from or returns to the page). 
	  document.addEventListener('visibilitychange', this.handle_visibility_change_bound);
     //This adds a listener for the popstate event, which fires when the state of the history changes, such as going back or forward through the browser's history. 
	  window.addEventListener('popstate', this.handle_route_change_bound);

     // This method is used to add a new entry to the browser history log without reloading the page. 
	  window.history.pushState = (f => {
          const pushState = function pushState() {
              const result = f.apply(this, arguments);
              window.dispatchEvent(new Event('pushstate'));
              window.dispatchEvent(new Event('locationchange'));
              return result;
          };
          pushState._backup = f;
          return pushState;
      })(window.history.pushState);
     // This method is used to update the current entry in the browser history without reloading the page. 
	  window.history.replaceState = (f => {
          const replaceState = function replaceState() {
              const result = f.apply(this, arguments);
              window.dispatchEvent(new Event('replacestate'));
              window.dispatchEvent(new Event('locationchange'));
              return result;
          };
          replaceState._backup = f;
          return replaceState;
      })(window.history.replaceState);
      window.addEventListener('popstate', this.locationChangeHandler);
      window.addEventListener('locationchange', this.handle_route_change_bound);

      console.log('Visibilitychange and locationchange events configured');
    };

    //This function is executed when the page's visibility state changes (when content disappears from view, such as when the user navigates to another tab).
	Game.prototype.handle_visibility_change = function () {
      console.log('visibilitychange event fired');
      if (document.hidden) {
        console.log('Left the game page');
        //here we just stop the game
		clearInterval(this.match_interval);
        this.match_interval = null;
        this.match_running = false;
      } else {
        console.log('Returned to the game page');
        if (!this.match_interval && (this.match_active === true)) {
          this.match_running = true;
          this.play();
        }
      }
    };

    // This function is executed when the URL path in a SPA (Single Page Application) changes using pushState or replaceState.
	Game.prototype.handle_route_change = function () {
      console.log('route change event fired');
      if (window.location.pathname !== '/game-path') {
        console.log('Left the game page - SPA Routing');
          clearInterval(this.match_interval);
          this.match_interval = null;
          this.match_active = false;
      }
    };
    
    Game.prototype.render_background = function () {
      if ((this.match_active !== true) || !this.canvas || (this.match_running !== true)) return;
      this.context.fillStyle = 'white';
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillRect(this.canvas.width/2, 0, 2, this.canvas.height);
    };

    Game.prototype.render = function () {
      if ((this.match_active !== true) || (this.match_running !== true)) return;
      this.render_background();
      this.field.render();
      if (this.ball) {
        this.ball.move();
        this.ball.render();
        this.ball.increase_ball_speed();
      }
      if (this.player_left && this.player_right) {
        this.player_left.render();
        this.player_right.render();
        this.player_left.check_paddle_position();
        this.player_right.check_paddle_position();
      }
      if (this.left_collision && this.right_collision) {
        this.left_collision.check_collision();
        this.right_collision.check_collision();
        this.left_collision.score();
        this.right_collision.score();
      }

      if ((this.match_active !== true) || (this.match_running !== true)) return;
      this.render_scores();

      if (this.player_left.player_points >= this.maxPoints) {
        this.match_active = false;
        this.show_winner_message(this.player_leftName);
        this.match_winner = this.player_leftName;
        clearInterval(this.match_interval);
        return this.match_winner;
      } else if (this.player_right.player_points >= this.maxPoints) {
        this.match_active = false;
        this.show_winner_message(this.player_rightName);
        this.match_winner = this.player_rightName;
        clearInterval(this.match_interval);
        return this.match_winner;
      }
    };

    Game.prototype.render_scores = function () {
      if ((this.match_active !== true) || (this.match_running !== true)) return;
      this.context.fillStyle = 'white';
      this.context.font = '30px Tahoma';
      this.context.fillText(this.player_left.player_points, this.canvas.width/4 *2 - 40, 40);
      this.context.fillText(this.player_right.player_points, this.canvas.width/4 *2 + 25, 40);
    };
  
    Game.prototype.show_winner_message = function (winner) {
      alert(winner + ' won the game with ' + this.maxPoints + 'points');
    };

    Game.prototype.play_pong = function() {
      if ((this.match_active !== true) || (this.match_running !== true)) return;
      console.log('Game play started');
      if (!this.match_interval) {
		//setInterval is used to call the render function repeatedly at a specified interval. Here, this.render is called every 7 milliseconds.
          this.match_interval = setInterval(this.render.bind(this), 7);
      }
    };

    Game.prototype.scoreboard_pong = function () {
      if (this.match_active !== true) {
        return[this.player_left.player_points, this.player_right.player_points];
      }
      else {
        return null;
      }
    };

    Game.prototype.game_finish = function() {
      const finished = !this.match_active;
      return finished;
    };
  
    Game.prototype.get_winner = function() {
      if (this.match_active !== true) {
          console.log('Winner is determined:', this.match_winner);
          return this.match_winner;
      } else {
          console.log('No winner yet');
          return null;
      }
    };
  

    Game.prototype.cleanup = function() {

      document.removeEventListener('visibilitychange', this.handle_visibility_change_bound);
      window.removeEventListener('popstate', this.handle_route_change_bound);

      if (window.history.pushState._backup) {
          window.history.pushState = window.history.pushState._backup;
          delete window.history.pushState._backup;
      }
      if (window.history.replaceState._backup) {
          window.history.replaceState = window.history.replaceState._backup;
          delete window.history.replaceState._backup;
      }

      window.removeEventListener('popstate', this.locationChangeHandler);
      window.removeEventListener('locationchange', this.handle_route_change_bound);

      if (this.match_interval) {
        clearInterval(this.match_interval);
        this.match_interval = null;
      }
    
      if (this.ball) {
        this.ball.cleanup();
        this.ball = null;
      }
      if (this.ground) {
        this.ground.cleanup();
        this.ground = null;
      }
      if (this.player_left) {
        this.player_left.cleanup();
        this.player_left = null;
      }
      if (this.player_right) {
        this.player_right.cleanup();
        this.player_right = null;
      }
      if (this.left_collision) {
        this.left_collision.cleanup();
        this.left_collision = null;
      }
      if (this.right_collision) {
        this.right_collision.cleanup();
        this.right_collision = null;
      }

      this.canvas = null;
      this.context = null;
      this.maxPoints = null;
      this.player_leftName = null;
      this.player_rightName = null;
      this.match_active = false;
      this.match_running = false;
      this.match_winner = null;

      console.log('game cleaned and resources released');
    };

  })();