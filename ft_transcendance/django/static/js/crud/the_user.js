import { api_UserInfo, api_Preferences_Info } from "../apis.js";

export let the_user = null;
export let user_preferences = null;

export async function fetch_User_Info() {
    const user_token = localStorage.getItem('token');
    if (user_token) {
        try {
            let response = await api_UserInfo(user_token);
            if (response.ok) {
                const data_user = await response.json();
                the_user = data_user;
                console.log("User info loaded", the_user);
            } else {
                const errorData = await response.json();
                console.error('Failed to load user info', errorData);
                alert('Failed to load user info');
            }
        } catch (error) {
            console.error('Errors:', error);
        }
    } else {
        console.warn('No token was found in the localStorage');
    }
}

export async function fetch_Preferences_Info() {
    const user_token = localStorage.getItem('token');
    if (user_token) {
        try {
            let response = await api_Preferences_Info(user_token);
            if (response.ok) {
                const data_user = await response.json();
                user_preferences = data_user;
                console.log("User preferences loaded", user_preferences);
            } else {
                const errorData = await response.json();
                console.error('Failed to load games preferences', errorData);
                alert('Failed to load games preferences');
            }
        } catch (error) {
            console.error('Errors:', error);
        }
    } else {
        console.warn('No token was found in the localStorage');
    }
}

export async function getGamePreferencesData() {

    const user_token = localStorage.getItem('token');
    if (!user_token) {
        console.error('Authentication token not found.');
        return Promise.reject(new Error('Authentication token not found.'));
    }

    try {
        const response = await fetch('/api/user-preferencess/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${user_token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error loading User Preferences: ' + response.statusText);
        }

        const user_data = await response.json();
        return user_data; // Returns User Preferences user_data
    } catch (error) {
        console.error(error.message);
        return Promise.reject(error); // Rejects the Promise with the error
    }
}

export async function getGamePreferences() {
    const user_token = localStorage.getItem('token');
    if (!user_token) {
        console.error('Authentication token not found.');
        return;
    }

    try {
        const response = await fetch('/api/user-preferencess/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${user_token}`
            }
        });
        if (!response.ok) {
            throw new Error('Error loading User Preferences: ' + response.statusText);
        }
        let user_data = user_preferences;
        user_data = await response.json();
    } catch (error) {
        console.error(error.message);
    }
}