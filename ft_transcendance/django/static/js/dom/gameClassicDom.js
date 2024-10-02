import { user_preferences} from '../crud/the_user.js';
import start_Game_Classic from "../views/startGameClassic.js";
import { navigateTo } from "../spa.js";
import set_defines from "../pong/classic_defines.js";
import {api_Create_history_game } from '../apis.js'


export async function game_Classic_Dom() {
    const start_Classic_Button = document.getElementById('start_Classic');

    if (start_Classic_Button) {
        const handleClick = async (event) => {
            start_Classic_Button.removeEventListener('click', handleClick);

            let defines_game = set_defines(user_preferences);
            let player1_input = document.getElementById('player1');
            let player2_input = document.getElementById('player2');

            defines_game.player_name_left = player1_input.value;
            defines_game.player_name_right = player2_input.value;

            if (player1_input.parentNode) {
                player1_input.parentNode.removeChild(player1_input);
            }
            if (player2_input.parentNode) {
                player2_input.parentNode.removeChild(player2_input);
            }
            player1_input = null;
            player2_input = null;

            var content = start_Game_Classic();
            document.getElementById('content').innerHTML = content;
            document.getElementById('p1').innerHTML = defines_game.player_name_left; 
            document.getElementById('p2').innerHTML = defines_game.player_name_right; 

            var canvas = document.getElementById('pong_canvas');
            var game_play = new PingPongGame.Game(canvas, defines_game);
            game_play.play_pong();

            let finish_Game = false;
            let id_Tim_eout = null;
            while (!finish_Game) {
                id_Tim_eout = await new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                });
                finish_Game = game_play.game_finish();
            }
            let winner = game_play.get_winner();
            if (winner !== null) {
                let points = game_play.scoreboard_pong();
                let scoreboard = points[0] + '-' + points[1]; 
                let namesPlayers = defines_game.player_name_left + ' vs ' + defines_game.player_name_right;
                let resultMatch = defines_game.player_name_left === winner ? 'win' : 'loss';
                const key = localStorage.getItem('token');
                await api_Create_history_game('classic', namesPlayers, scoreboard, resultMatch, key);
            }
            

            game_play.cleanup();
            canvas = null;
            game_play = null;
            defines_game = null;
            clearTimeout(id_Tim_eout);

            navigateTo('/play_Game/', {});
        };
        start_Classic_Button.addEventListener('click', handleClick);
    }
}