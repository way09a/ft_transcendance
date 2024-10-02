//{% load static %}
import  { navigateTo }  from '../spa.js';

export function init_Play_Game() {
    // Add event listeners for the buttons
    document.getElementById('game_Classic').addEventListener('click', () => handle_Button_Click('game_Classic'));
    document.getElementById('game_4players').addEventListener('click', () => handle_Button_Click('game_4players'));
    document.getElementById('game_Tournament').addEventListener('click', () => handle_Button_Click('game_Tournament'));
	document.getElementById('vsAI').addEventListener('click', () => handle_Button_Click('vsAI'));

    //Function to handle button clicks
    function handle_Button_Click(buttonId) {
        let content = '';
        switch (buttonId) {
            case 'game_Classic':
                navigateTo('/game_Classic_Views/', {});
                break;
            case 'game_4players':
                navigateTo('/game_4/', {});
                break;
            case 'game_Tournament':
				navigateTo('/the_tournament/', {});
                break;
			case 'vsAI':
				navigateTo('/ia-vs-game/', {});
				break;
            default:
                content = 'Unknown button!';
                document.getElementById('content').innerHTML = content;
        }
    }
}