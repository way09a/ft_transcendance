import { dom_Btn_Register, dom_Btn_Back_Home } from "./registerDom.js";
import  render_Register  from "../views/registerViews.js";
import { api_Login } from "../apis.js";

export function dom_Btn_Login() {
    document.getElementById('loginForm').addEventListener('submit', async (event) => {

        event.preventDefault();
        const user_email = event.target.email.value;
        const user_password = event.target.password.value;

		const response = await api_Login(user_email, user_password);

        if (response.ok) {
            const user_data = await response.json();
            localStorage.setItem('token', user_data.token);
            window.location.href = '/';
        } else {
            alert('User failed Login');
        }
    });
}


export function dom_Btn_Cad() {
    document.getElementById('button-register').addEventListener('click', () => {
        document.getElementById('content').innerHTML = render_Register();
        dom_Btn_Register();
		dom_Btn_Back_Home();
    });
}

export function dom_Btn_42() {
	document.getElementById('button-login-42').addEventListener('click', () => {
	        window.location.href = 'http://localhost/login-intra/';
	    });
}
