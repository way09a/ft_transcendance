(function () {
    'use strict';

    if (typeof window.PongGameAI === "undefined") {
        window.PongGameAI = {};
    }
    var AI = window.PongGameAI.AI = function (Gplayer, Gball, v_paddle) {
        this.Gball = Gball;
        this.Gplayer = Gplayer;
        this.v_paddle = v_paddle;
        this.key_UP = false;
        this.key_Down = false;
        this.ball_position_memory = [0, 0];
    };


    AI.prototype.press_Key = function (keycode) {
        let keyEvent = new KeyboardEvent('keydown', {
            code: keycode,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(keyEvent);
    };
    
    AI.prototype.release_Key = function (keycode) {
        let keyEvent = new KeyboardEvent('keyup', {
            code: keycode,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(keyEvent);
    };
    AI.prototype.update_AI_vision = function () {
        this.ball_position_memory = this.Gball.ball_position;
    };
    
    AI.prototype.update_AI_keys = function () {
    if (this.ball_position_memory[0] > 0) {
        if (this.ball_position_memory[1] < this.Gplayer.paddle.paddle_position[1] + 35){
            if (this.key_Down) {
                this.release_Key('KeyL'); // Release 'L' key
                this.key_Down = false;
            }
            if (!this.key_UP) {
                this.press_Key('KeyO'); // Press 'O' key
                this.key_UP = true;
            }
        }else if(this.ball_position_memory[1] > this.Gplayer.paddle.paddle_position[1] - 35){
            if (this.key_UP) {
                this.release_Key('KeyO'); // Release 'O' key
                this.key_UP = false;
            }
            if (!this.key_Down) {
                this.press_Key('KeyL'); // Press 'L' key
                this.key_Down = true;
            }
        }
    }
    };

    AI.prototype.cleanup = function () {
        // Clean up references to Gplayer and ball
        this.Gplayer = null;
        this.Gball = null;
        this.v_paddle = null;
    };
})();