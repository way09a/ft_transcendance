import  { navigateTo }  from '../spa.js';

let player_count = 0;

export function handle_Player_Count() {
		document.getElementById('next').addEventListener('click', () => {
			const count = document.getElementById('numPlayers').value;
			player_count = parseInt(count, 10);
			if (isNaN(player_count) || player_count <= 2) {
				alert('Please enter a valid amount of players "greater than 2".');
			} else {
				localStorage.setItem('player_count', player_count);
				navigateTo('/the_tournament-nicknames/', {});
			}
		});
}

export { player_count };
