import routes from './routes.js';
import { initialize_Status_Socket } from './statusWebSocket.js';
import { fetch_User_Info, fetch_Preferences_Info } from './crud/the_user.js';

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

export let token = null;

function check_And_Store_Token() {
    token = getQueryParameter('token');
    if (token) {
        localStorage.setItem('token', token);
        window.location.href = '/';
    }
}

export async function checkAuth() {
    token = localStorage.getItem('token');
    if (!token) return false;

    const response = await fetch('/api/check-auth/', {
        method: 'GET',
        headers: {
            'Authorization': `token ${token}`
        }
    });

    return response.ok;
}

function PageLoading(route, params = {}) {
    const route_config = routes[route] || routes['/'];
    document.getElementById('content').innerHTML = route_config.template;
    if (route_config.init) {
        route_config.init(params);
    }
}

function handleHashChange() {
    const hash = window.location.hash.slice(1); //Remove a character #
    PageLoading(hash);
}

document.addEventListener('DOMContentLoaded', async () => {
    check_And_Store_Token();
    const isAuthenticated = await checkAuth();
    if (isAuthenticated) {
        console.log('User is authenticated');
        document.getElementById('buttons-navs').style.display = 'block';
        await fetch_User_Info();
        await fetch_Preferences_Info();
        handleHashChange();
		initialize_Status_Socket();
    } else {
        console.log('User is not authenticated');
        window.location.hash = '#/log_in/';
        handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);

    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', handle_Button_Click);
    });
});

function handle_Button_Click(events) {
    events.preventDefault();
    const routing = events.target.getAttribute('data-route');
    navigateTo(routing);
}

function navigateTo(router, parameter = {}) {
	window.history.pushState(parameter, '', `#${router}`);
	PageLoading(router, parameter);
}

export { navigateTo };
