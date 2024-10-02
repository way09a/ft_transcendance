import { api_Signup } from "../apis.js";

export function dom_Btn_Register() {
    document.getElementById('form-register').addEventListener('submit', async (event) => {
        event.preventDefault();
        const user_username = event.target.username.value;
        const user_password = event.target.password.value;
		const user_email = event.target.email.value;

        const response = await api_Signup(user_username, user_email, user_password);

        if (response.ok) {
            const user_data = await response.json();
            localStorage.setItem('token', user_data.token);
            window.location.href = '/';
        } else {
            alert('User registration failed');
        }
    });
}

export function dom_Btn_Back_Home() {
	document.getElementById('button-login').addEventListener('click', () => {
			const url_home = 'http://localhost/';
	        window.location.href = url_home;
	});
}
