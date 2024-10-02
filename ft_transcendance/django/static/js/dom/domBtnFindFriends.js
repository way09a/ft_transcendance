import { api_search_user, api_List_friends, api_send_sender_Friendship,
	api_List_Pending_Requests, api_approve_sender_Friendship,
	api_List_requests_Sents, api_Delete_sender_Friendship, } from "../apis.js";
const user_token = localStorage.getItem('token');
import  { navigateTo }  from '../spa.js';


export async function load_Pending_requests() {
const token = localStorage.getItem('token');

try {
   console.log('Using API to list pending requests');
   const requestsPendentesData = await api_List_Pending_Requests(token);
   console.log('Data received from API:', requestsPendentesData);

   const requestsPendentesList = document.getElementById('requests-pendentes');
   requestsPendentesList.innerHTML = '';

   if (!Array.isArray(requestsPendentesData) || requestsPendentesData.length === 0) {
	   requestsPendentesList.innerHTML = '<li>There are no pending requests</li>';
   } else {
	   requestsPendentesData.forEach(sender => {
		   const li_element = document.createElement('li');
		   li_element.style.display = 'flex';
		   li_element.style.alignItems = 'center';
		   li_element.style.justifyContent = 'space-between';

		   const textSpan = document.createElement('span');
		   textSpan.textContent = `${sender.user.username} (${sender.user.email})`;
		   textSpan.style.flexGrow = 1;

		   const approveButton = document.createElement('button');
		   approveButton.textContent = 'Confirm';
		   approveButton.className = 'btn btn-Confirm';
		   approveButton.onclick = async () => {
			   try {
				   const approve_Response = await api_approve_sender_Friendship(sender.id, token);
				   if (approve_Response.message) {
					   alert(approve_Response.message);
					   actualiseScreen(); // Update to friends list after approval
				   } else {
					   alert('Error approving Friendship request');
				   }
			   } catch (error) {
				   console.error('Error approving Friendship request:', error);
				   alert('Error approving Friendship request');
			   }
		   };

		   const excludeButton = document.createElement('button');
		   excludeButton.textContent = 'exclude';
		   excludeButton.className = 'btn btn-exclude';
		   excludeButton.onclick = async () => {
			   try {
				   const excludeResponse = await api_Delete_sender_Friendship(sender.id, token);
				   if (excludeResponse.message) {
					   alert(excludeResponse.message);
					   actualiseScreen();
				   } else {
					   alert('Friendship request exclusion error');
				   }
			   } catch (error) {
				   console.error('Friendship request exclusion error:', error);
				   alert('Friendship request exclusion error');
			   }
		   };

		   li_element.appendChild(textSpan);
		   li_element.appendChild(approveButton);
		   li_element.appendChild(excludeButton);
		   requestsPendentesList.appendChild(li_element);
	   });
   }
} catch (error) {
   console.error('Error in listing pending Friendship requests:', error);
   alert('Error listing pending Friendship requests');
}
}

export async function load_requests_Sents() {
const token = localStorage.getItem('token');

try {
   console.log('calling API to list Sent Requests');
   const requestsSentsData = await api_List_requests_Sents(token);
   console.log('Data received from API:', requestsSentsData);

   const requestsSentsList = document.getElementById('requests-Sents');
   requestsSentsList.innerHTML = '';

   if (!Array.isArray(requestsSentsData) || requestsSentsData.length === 0) {
	   requestsSentsList.innerHTML = '<li>No requests sent</li>';
   } else {
	   requestsSentsData.forEach(sender => {
		   const li = document.createElement('li');
		   li.textContent = `${sender.friend.username} (${sender.friend.email})`;
		   requestsSentsList.appendChild(li);
	   });
   }
} catch (error) {
   console.error('Error listing requests for Friendship Songs:', error);
   alert('Error listing requests for Friendship Songs');
}
}

export async function load_list_friends() {
const token = localStorage.getItem('token');

try {
   console.log('Calling API to list friends');
   const friendsData = await api_List_friends(token);
   console.log('Data received from API - List friends:', friendsData);

   const listfriends = document.getElementById('list-friends');
   listfriends.innerHTML = '';

   if (!Array.isArray(friendsData) || friendsData.length === 0) {
	   listfriends.innerHTML = '<div class="mt-3 mb-3 text-center">You have no friends yet</div>';
   } else {
	   const friend_Template = document.getElementById('friend-templates').content;

	   friendsData.forEach(friend => {
		   const friend_Clone = document.importNode(friend_Template, true);
		   friend_Clone.querySelector('.profile-photo').src = friend.profile_image || 'static/img/default_user.png';
		   friend_Clone.querySelector('.friend-username').textContent = friend.username;
		   friend_Clone.querySelector('.status-icon').src = friend.is_online ? 'static/img/online1.png' : 'static/img/offline1.png';

		   listfriends.appendChild(friend_Clone);
	   });

	   document.getElementById('total-friends').textContent = friendsData.length;
   }
} catch (error) {
   console.error('Error listing friends:', error);
   alert('Error listing friends');
}
}

export function dom_Btn_search_friends() {
document.getElementById('search-friends-form').addEventListener('submit', async (event) => {
   event.preventDefault();
   const user_nickname = event.target.nickname.value;
   try {
	   console.log('Calling API to search user:', user_nickname);
	   const response = await api_search_user(user_nickname, user_token);
	   console.log('API response for user search:', response);

	   if (response.ok) {
		   const data = await response.json();
		   console.log('User data received from the API:', data);
		   const userId = data.id;

		   const sendsenderBtn = document.getElementById('send-sender-btn');
		   sendsenderBtn.style.display = 'block';

		   sendsenderBtn.onclick = async () => {
			   try {
				   console.log('Sending Friendship request for user ID:', userId);
				   const senderResponse = await api_send_sender_Friendship(userId, user_token);
				   console.log('API response for sending Friendship requests:', senderResponse);

				   if (senderResponse) {
					   const senderData = await senderResponse;
					   alert(senderData.message);
					   sendsenderBtn.style.display = 'none';

					   document.getElementById('nickname').value = '';
					   actualiseScreen(); // Update to list after sending request
				   } else {
					   alert('Error sending Friendship request');
				   }
			   } catch (error) {
				   console.error('Error sending Friendship request:', error);
				   alert('Error sending Friendship request');
			   }
		   };
	   }
	   else {
		   alert('User not found');
	   }
   } catch (error) {
	   console.error('Error searching for user:', error);
	   alert('Error searching for user');
   }
});
}


function actualiseScreen(){
load_list_friends();
load_Pending_requests();
load_requests_Sents();
}