export async function api_Login(email, password) {
    const response = await fetch('/api/log_in/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    return await response;
}

export async function api_Logout(token) {
	const response = await fetch('/api/log_out/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Token ${token}`
		}
	});
	return await response;
}

export async function api_Signup(username, email, password) {
	const response = await fetch('/api/sign_up/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username, email, password })
	});
	return await response;
}

export async function api_UserInfo(token) {
    const url = '/api/get-user-information/';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`
        }
    };

    return fetch(url, options);
}

export async function api_Preferences_Info(token) {
    const url = '/api/user-preferencess/';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`
        }
    };

    return fetch(url, options);
}

export async function api_search_user(nickname, token) {
    const response = await fetch('/api/users/search_user-id/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ username: nickname })
    });
    return await response;
}

export async function api_List_friends(token) {
    const response = await fetch('/api/Friendshipss/list_friends/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
    return await response.json();
}

export async function api_List_friendsOnLine(token) {
    const response = await fetch('/api/friends/user_online/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
    return await response.json();
}

export async function api_send_sender_Friendship(friendId, token) {
    const response = await fetch('/api/Friendshipss/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ friend_id: friendId })
    });
    return await response.json();
}

export async function api_List_Pending_Requests(token) {
    const response = await fetch('/api/Friendshipss/pendentes/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
    return response.json();
}

export async function api_approve_sender_Friendship(senderId, token) {
    const response = await fetch('/api/Friendshipss/approve/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ sender_id: senderId })
    });
    return response.json();
}

export async function api_Delete_sender_Friendship(senderId, token) {
    const response = await fetch('/api/Friendshipss/reject/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ sender_id: senderId })
    });
    return response.json();
}

export async function api_List_requests_Sents(token) {
    const response = await fetch('/api/Friendshipss/Sents/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
    return response.json();
}


export async function fetch_User_Profile_ById(userId, token) {
    const response = await fetch(`/api/user-infos/${userId}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
    if (!response.ok) {
        console.error('Error when searching user profile:', response.statusText);
        return null;
    }
    return response.json();
}

export async function api_Create_history_game(game, description, scoreboard, result, token) {
    const response = await fetch('/api/games-history/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
            game: game,
            description: description,
            score: scoreboard,
            result: result
        })
    });

    return response.json();
}

export async function api_ListHistory_Games(userId, token) {
    const response = await fetch(`/api/games-history-list/${userId}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });

    return response.json();
}