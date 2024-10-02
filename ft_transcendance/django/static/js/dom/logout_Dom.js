import { api_Logout } from '../apis.js';

export async function logout() {
    const token = localStorage.getItem('token');
    if (token) {

        const response = await api_Logout(token);

        if (response.ok) {
            localStorage.removeItem('token');
            console.log('Logout successful');
			window.location.href = '/';
        } else {
            alert('Logout failed');
        }
    }
}
