import {user_preferences} from '../crud/the_user.js';
import startgame4 from "../views/start_Game4.js";
import { navigateTo } from "../spa.js";
import set_defines from "../pong4/multi_defines.js";
import {api_Create_history_game } from '../apis.js'


export async function game_4_Dom() {
    const start_Classic_Button = document.getElementById('Sart4Game');

    if (start_Classic_Button) {
        const handleClick = async (event) => {
            start_Classic_Button.removeEventListener('click', handleClick);

            let defines_game = set_defines(user_preferences);
            let player1_input = document.getElementById('Player1');
            let player2_input = document.getElementById('Player2');
            let player3_input = document.getElementById('Player3');
            let player4_input = document.getElementById('Player4');

            defines_game.player_name_left = player1_input.value;
            defines_game.player_name_right = player2_input.value;
            defines_game.player_name_left1 = player3_input.value;
            defines_game.player_name_right1 = player4_input.value;

            if (player1_input.parentNode) {
                player1_input.parentNode.removeChild(player1_input);
            }
            if (player2_input.parentNode) {
                player2_input.parentNode.removeChild(player2_input);
            }
            if (player3_input.parentNode) {
                player3_input.parentNode.removeChild(player3_input);
            }
            if (player4_input.parentNode) {
                player4_input.parentNode.removeChild(player4_input);
            }
            player1_input = null;
            player2_input = null;
            player3_input = null;
            player4_input = null;

            var content = startgame4();
            document.getElementById('content').innerHTML = content;
            document.getElementById('p1').innerHTML = defines_game.player_name_left; 
            document.getElementById('p2').innerHTML = defines_game.player_name_right;
            document.getElementById('p3').innerHTML = defines_game.player_name_left1; 
            document.getElementById('p4').innerHTML = defines_game.player_name_right1; 

            var canvas = document.getElementById('pong_canvas');
            var game_play = new PingPongGameFour.Game(canvas, defines_game);
            game_play.play_pong();

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
            let winner = game_play.get_winner();
            if (winner !== null) {
                let points = game_play.scoreboard_pong();
                let scoreboard = points[0] + '-' + points[1]; 
                let names_left = defines_game.player_name_left + ', and ' + defines_game.player_name_right;
                let names_right = defines_game.player_name_left1 + ', and ' + defines_game.player_name_right1;
                let namesPlayers = names_left + ' vs ' + names_right;
                let resultMatch = defines_game.player_name_left === winner ? 'win' : 'loss';
                const key = localStorage.getItem('token');
                await api_Create_history_game('classic', namesPlayers, scoreboard, resultMatch, key);
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