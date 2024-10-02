import { the_user } from '../crud/the_user.js';
import { token } from '../spa.js';
import { api_List_friendsOnLine, api_ListHistory_Games } from '../apis.js';

export function render_Dash_User_Info() {
    document.getElementById('user-username').innerText = the_user.username;

    const user_Image = document.getElementById('user-image');
    const default_Image = document.getElementById('user-info').getAttribute('data-default-profile-image');

    if (the_user.image) {  // Check if user has a picture
        user_Image.src = the_user.image;
    } else {
        user_Image.src = default_Image;
    }
    user_Image.style.display = 'block';  //Make sure the image is visible
}

export async function load_friends_list_Dashboard() {
    try {
        console.log('Calling API to list friends');
        const friendsData = await api_List_friendsOnLine(token);
        console.log('Data received from API - List friends:', friendsData);

        const listfriends = document.getElementById('list-friendsDashboard');
        listfriends.innerHTML = '';

        if (!Array.isArray(friendsData) || friendsData.length === 0) {
            listfriends.innerHTML = '<div class="background-dashboard-2 mt-3 mx-2 p-2 rounded shadow"><h5>Friends Online</h5></div>';
        } else {
            const friend_Template = document.getElementById('friend-templatesDashboard').content;

            friendsData.forEach(friend => {
                const friendClone = document.importNode(friend_Template, true);
                friendClone.querySelector('.profile-photoDashboard').src = friend.profile_image || 'static/img/default_user.png';
                friendClone.querySelector('.friend-username-dashboard').textContent = friend.username;
                friendClone.querySelector('.status-iconDashboard').src = friend.is_online ? 'static/img/online1.png' : 'static/img/offline1.png';

                listfriends.appendChild(friendClone);
            });
        }
    } catch (error) {
        console.error('Error listing friends:', error);
        alert('Error listing friends');
    }
}


function formatDate(originalDateStr) {
// Parse the string into a Date object
    let format_date = new Date(originalDateStr);

// Extracting the necessary parts
    let hour = format_date.getHours().toString().padStart(2, '0');  // 14
    let minutes = format_date.getMinutes().toString().padStart(2, '0');  // 49
    let day = format_date.getDate().toString().padStart(2, '0');  // 30
    let month = (format_date.getMonth() + 1).toString().padStart(2, '0');  // 06
    let year = format_date.getFullYear();  // 2024

    // Construction of the string in the desired format
	let formattedDate = `${hour}:${minutes} ${day}-${month}-${year}`;

    // Returning the formatted string
    return formattedDate;
}

export async function load_History_Games_Dashboard() {
    try {
        console.log('Calling API to list game history');
        const historygames = await api_ListHistory_Games(the_user.id, token);
        console.log('Data received from API - Game History:', historygames);

        const listHistory = document.getElementById('list-historyDashboard');
        listHistory.innerHTML = `
            <div class="background-dashboard-2 mt-3 mx-2 p-2 rounded shadow">
                <h5>Game History</h5>
            </div>
            <br>
        `;

        if (!Array.isArray(historygames) || historygames.length === 0) {
            listHistory.innerHTML += '<div class="mt-3 mb-3 text-center">No game history found</div>';
        } else {
            const historyTemplate = document.getElementById('history-templateDashboard').content;

            let totalgame = 0;
            let totalVitory = 0;
            let totalLoss = 0;

            historygames.forEach(game => {
                totalgame++;
                if (game.result === 'win') {
                    totalVitory++;
                } else if (game.result === 'loss') {
                    totalLoss++;
                }

                const historyClone = document.importNode(historyTemplate, true);
                const dataRaw = game.date;
                const dataCorret = formatDate(dataRaw);
                historyClone.querySelector('.history-item').textContent = `(${game.result}) ${game.description} ${game.score} ${game.game} ${dataCorret}`;
                listHistory.appendChild(historyClone);
            });

            // Updates summary fields
            document.getElementById('game_play').innerText = `game: ${totalgame}`;
            document.getElementById('game_win').innerText = `win: ${totalVitory}`;
            document.getElementById('game_loss').innerText = `loss: ${totalLoss}`;

			renderGameStatisticsChart(totalVitory, totalLoss);
        }
    } catch (error) {
        console.error('No game history found:', error);
        alert('No game history found');
    }
}

// Function to render the game statistics chart
export function renderGameStatisticsChart(totalVictory, totalLoss) {
    const ctx = document.getElementById('game-stats-chart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Wins', 'Losses',],
            datasets: [{
                label: 'Game Statistics',
                data: [totalVictory, totalLoss],
                backgroundColor: ['#36a2eb', '#ff6384'],
                borderColor: ['#36a2eb', '#ff6384'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
					labels: {
                        color: 'white' 
                    }
                }
            }
        }
    });
}