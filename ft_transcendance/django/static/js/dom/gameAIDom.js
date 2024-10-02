import { user_preferences } from '../crud/the_user.js';
import startGameAI from "../views/startGameAI.js";
import { navigateTo } from "../spa.js";
import set_defines from "../pong/classic_defines.js";


export async function game_AI_Dom() {
    const start_Classic_Button = document.getElementById('start_Classic');

    if (start_Classic_Button) {
        const handleClick = async (event) => {
            start_Classic_Button.removeEventListener('click', handleClick);

            let defines_game = set_defines(user_preferences);
            let player1_input = document.getElementById('player1');

            defines_game.player_name_left = player1_input.value;
            defines_game.player_name_right = 'Skynet AI';

            if (player1_input.parentNode) {
                player1_input.parentNode.removeChild(player1_input);
            }

            player1_input = null;

            var content = startGameAI();
            document.getElementById('content').innerHTML = content;
            document.getElementById('p1').innerHTML = defines_game.player_name_left; 
            document.getElementById('p2').innerHTML = defines_game.player_name_right; 

            var canvas = document.getElementById('pong_canvas');
            var game_play = new PongGameAI.Game(canvas, defines_game);
            game_play.play_pong();
            game_play.play_AI_vision();
            game_play.play_AI();

            let finish_Game = false;
            let id_Time_out = null;
            while (!finish_Game) {
                id_Time_out = await new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                });
                finish_Game = game_play.game_finish();
            }

            game_play.cleanup();
            canvas = null;
            game_play = null;
            defines_game = null;
            clearTimeout(id_Time_out);

            navigateTo('/play_Game/', {});
        };
        start_Classic_Button.addEventListener('click', handleClick);
    }
}