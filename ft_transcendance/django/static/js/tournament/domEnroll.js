// Import route redirection
import  { navigateTo }  from '../spa.js';
// To pull user preferences
import  { user_preferences } from '../crud/the_user.js';
// Pong definitions
import set_defines from "../pong/classic_defines.js";
// View of the screen where Pong will be rendered
import start_Game_Classic from "../views/startGameClassic.js";

// Function to initialize the player names setup page
function init_Tournament_Setup() {
    const player_count = parseInt(localStorage.getItem('player_count'), 10);
    if (isNaN(player_count) || player_count <= 0) {
        alert('Invalid number of players. Please go back and enter it again.');
        return;
    }

    const players_inputs_container = document.getElementById('players_inputs_container');
    let players_inputs = '';

    for (let num = 1; num <= player_count; num++) {
        players_inputs += `
            <div class="mb-3 text-center">
                <label for="player${num}" class="form-label" style="color: #fff;">player ${num}</label>
                <input type="text" class="form-control" id="player${num}" name="player${num}" required/>
            </div>
        `;
    }

    players_inputs_container.innerHTML = players_inputs;

    document.getElementById('start_Classic').addEventListener('click', handle_start_tournament);
}

async function handle_start_tournament() {
    const player_count = parseInt(localStorage.getItem('player_count'), 10);
    const players_names = new Set();

    for (let num = 1; num <= player_count; num++) {
        const player_name = document.getElementById(`player${num}`).value.trim();
        if (!player_name) {
            alert(`Please enter a name for Player ${num}.`);
            return;
        }
        if (players_names.has(player_name)) {
            alert(`Player names must be unique. The name "${player_name}" has been used more than once.`);
            return;
        }
        players_names.add(player_name);
    }

    const players_array = Array.from(players_names);

    localStorage.setItem('players', JSON.stringify(players_array));

    alert('Players registered successfully!');
    console.log('Starting Tournament');
    let winner_player = await createTournament(players_array , player_count);
    if (winner_player === null) {
        location.reload(true);
        return null;
    }
    console.log('Tournament Finished');
    alert('End of the tournament, congratulations to the player:' + winner_player);
    navigateTo('/play_Game/', {});
}

function directVictoryDraw(x) {
    const vector = Array.from({ length: x }, (_, index) => index);
    
    for (let n = vector.length - 1; n > 0; n--) {
        const randomIdx = Math.floor(Math.random() * (n + 1));
        [vector[n], vector[randomIdx]] = [vector[randomIdx], vector[n]];
    }

    for (let n = 0; n < x; n++) {
        if (vector[n] === 1) {
            return n;
        }
    }

    return 0;
}

function calculateRounds(numPlayers) {
    return Math.ceil(Math.log2(numPlayers));
}

async function createTournament(playerNames, numberOfPlayers) {

    var numberOfRounds  = calculateRounds(numberOfPlayers);
    var alivePlayers  = playerNames;
    var numCompetitors  = numberOfPlayers;
    var i = 0;
    
    while (i < numberOfRounds ) {
        console.log('Starting round: ' + i);
        alivePlayers  = await createRounds(alivePlayers , numCompetitors , i);
        if (alivePlayers  === null) {
            return null;
        }
        numCompetitors  = Math.ceil(numCompetitors  / 2);
        i++;
    }
    return alivePlayers ;
}

function defineGames(alivePlayers , numGames) {
    let result = [];
    let indexMatchs = 0;
    let indexCompetitors = 0;

    while (indexMatchs < numGames) {
        if (alivePlayers [indexCompetitors] === '') {
            indexCompetitors++;
        }
        result.push(alivePlayers [indexCompetitors]);
        indexCompetitors++;

        if (alivePlayers [indexCompetitors] === '') {
            indexCompetitors++;
        }
        result.push(alivePlayers [indexCompetitors]);
        indexCompetitors++;
        indexMatchs++;
    }
    return result;
}

function announceRoundGames(numGames, definedGames, numCompetitors , winners) {
    let msg = '';
    for (let i = 0; i < numGames * 2; i += 2) {
        msg += ('\n' + definedGames[i] + ' vs ' + definedGames[i+1]);
    }
    if (numCompetitors  % 2 === 1) {
        msg += ('\n\nPlayer: ' + winners + ', was drawn to automatically advance to the next round');
    }
    return msg;
}

async function createRounds(alivePlayers , numCompetitors , roundIndex) {

    var numSlots = Math.ceil(numCompetitors  / 2);
    var numGames = Math.floor(numCompetitors  / 2);

    let winners = new Array(numSlots).fill(null);

    if (numCompetitors  % 2 === 1) {
        let drawing = directVictoryDraw(numCompetitors );
        winners[0] = alivePlayers [drawing];
        alivePlayers [drawing] = '';
        drawing = 0;
    }

    let definedGames = defineGames(alivePlayers , numGames);
    let msg =  announceRoundGames(numGames, definedGames, numCompetitors , winners[0]);
    alert ('Starting the round: ' + (roundIndex + 1) + ' with the following games:\n' + msg);

    let indexMatchs = 0;
    let indexdefinedGames = 0
    let temporaryWinner  = '';

    while (indexMatchs < numGames)
    {

        alert('Start of the next match, ' + definedGames[indexdefinedGames] + ' vs ' + definedGames[indexdefinedGames+1]);
        temporaryWinner  = await callGame(definedGames[indexdefinedGames], definedGames[indexdefinedGames+1]);
        if (temporaryWinner  === null) {
            console.log('Tournament Cancelled.');
            definedGames = null;
            winners = null;
            return null;
        }

        if (numCompetitors  % 2 === 1) {
            winners[indexMatchs + 1] = temporaryWinner ;
        }
        else {
            winners[indexMatchs] = temporaryWinner ;
        }
        indexMatchs++;
        indexdefinedGames += 2;
    }
    return winners;
}

function my_delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitGameEnd(game) {
    while (!game.game_finish()) {
        await my_delay(2000);
    }
    console.log('Game is finished');
}

async function callGame(player1, player2) {
    
    console.log(`Starting game between ${player1} and ${player2}`);

    const defines = set_defines(user_preferences); 
    const content = start_Game_Classic();

    defines.player_name_left = player1;
    defines.player_name_right = player2;

    document.getElementById('content').innerHTML = content;
    document.getElementById('p1').innerHTML = defines.player_name_left;
    document.getElementById('p2').innerHTML = defines.player_name_right;

    let canvas = document.getElementById('pong_canvas');
    if (!canvas) {
        throw new Error('Canvas element not found');
    }

    let game = new PingPongGame.Game(canvas, defines);
    game.play_pong();

    console.log('Game started');

    await waitGameEnd(game);

    const PlayerWinner = game.get_winner();
    console.log('Winner:', PlayerWinner);

    if (!PlayerWinner || PlayerWinner === null) {
        game.cleanup();
        return null;
    }
    game.cleanup();
    game = null;
    return PlayerWinner;
}

export { init_Tournament_Setup };
