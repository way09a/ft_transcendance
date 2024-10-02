import start_game_Vs_AI from './gameIAPlayViews.js';

export function clickGameIAPage() {

    document.getElementById('startGame').addEventListener('click', () => handle_Button_Click());

    function handle_Button_Click() {
        game_content = 'none';
        game_content = start_game_Vs_AI();
        document.getElementById('content').innerHTML = game_content;
    }
}
