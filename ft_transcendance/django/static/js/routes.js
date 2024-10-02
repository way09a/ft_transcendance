import { render_Play_Game } from './views/playGameViews.js';
import { init_Play_Game } from './dom/playGameDom.js';
import render_Login from './views/loginViews.js';
import render_Register from './views/registerViews.js';
import { dom_Btn_Login, dom_Btn_Cad, dom_Btn_42 } from './dom/loginDom.js';
import { dom_Btn_Register, dom_Btn_Back_Home } from './dom/registerDom.js';
import { logout } from './dom/logout_Dom.js';
import render_Dashboard from './views/dashboardView.js';
import { render_Dash_User_Info, load_History_Games_Dashboard} from './dom/dashboardDom.js';
import { load_friends_list_Dashboard } from './dom/dashboardDom.js';
import render_search_friends from './views/renderFindFriends.js';
import { dom_Btn_search_friends, load_Pending_requests, load_requests_Sents, load_list_friends } from './dom/domBtnFindFriends.js';
import game_Tournament_Init_Views from './views/gameTournamentViews.js';
import game_Tournament_Registere_Views  from './views/tournament/registrationViews.js';
import { handle_Player_Count } from './tournament/domTournament.js';
import { init_Tournament_Setup} from './tournament/domEnroll.js';

// Crud //
import { the_user } from './crud/the_user.js';

// Settings Views //""
import render_Settings_Page from './views/settings/settingsPageViews.js';
import render_Settings_User from './views/settings/settingsUserViews.js';
import render_Settings_Game from './views/settings/settingsGameViews.js';

// Settings Doms //
import { click_Setting_Page } from './views/settings/settingsPageDom.js';
import { render_User_Infos, send_Update_User } from './views/settings/settingsUserDom.js';
import { render_Preferences_Game, send_Update_Game } from './views/settings/settingsGameDom.js';

// Game Vs IA //
import { game_AI_Dom } from './dom/gameAIDom.js';
import game_AI_Views from './views/gameAIViews.js';

// Game Vs IA //
import { game_4_Dom } from './dom/game4Dom.js';
import game_4_Views from './views/game4Views.js';

// Classic Game //
import game_Classic_Views from './views/gameClassicViews.js';
import { game_Classic_Dom } from './dom/gameClassicDom.js';

import start_Game_Classic from './views/startGameClassic.js'

import { cleanup_Resources } from './dom/clean.js';

const routes = {
    '/log_in/': {
        template: render_Login(),
        init: () => {
            dom_Btn_Login();
            dom_Btn_Cad();
            dom_Btn_42();
            console.log('Login loaded');
        }
    },
    '/register/': {
        template: render_Register(),
        init: () => {
            dom_Btn_Register();
            dom_Btn_Back_Home();
            console.log('Register loaded');
        }
    },
    '/log_out/': {
        template: '',
        init: () => {
            logout();
        }
    },
	'/play_Game/': {
        template: render_Play_Game(),
        init: () => {
            init_Play_Game();
			cleanup_Resources();
        }
    },
    '/dashboard/': {
        template: render_Dashboard(),
        init: () => {
            render_Dash_User_Info();
			load_friends_list_Dashboard();
			load_History_Games_Dashboard();
			cleanup_Resources();
        }
    },
	'/my_friends/': {
        template: render_search_friends(),
        init: () => {
            dom_Btn_search_friends();
			load_Pending_requests();
			load_requests_Sents();
			load_list_friends();
			cleanup_Resources();
        }
    },
    '/the_tournament/': {
        template: game_Tournament_Init_Views(),
        init: () => {
			handle_Player_Count();
		}
    },
    '/the_tournament-nicknames/': {
	    template: game_Tournament_Registere_Views(),
		init: init_Tournament_Setup
	},
    '/all_settings/': {
        template: render_Settings_Page(),
        init: () => {
            click_Setting_Page();
			cleanup_Resources();
        }
    },
    '/user-settings/': {
        template: render_Settings_User(),
        init: () => {
            render_User_Infos();
            send_Update_User();
        }
    },
    '/game-settings/': {
        template: render_Settings_Game(),
        init: () => {
            render_Preferences_Game();
            send_Update_Game();
        }
    },
    '/ia-vs-game/': {
        template: game_AI_Views(),
        init: () => {
            game_AI_Dom();
        }
    },
    '/game_4/': {
        template: game_4_Views(),
        init: () => {
            game_4_Dom();
        }
    },
    '/game_Classic_Views/': {
        template: game_Classic_Views(),
        init: () => {
            game_Classic_Dom();
        }
    },
    '/classic-game/': {
        template:start_Game_Classic(),
        init: () => {
        }
    },
    '/': {
        template: render_Dashboard(),
        init: async () => {
            render_Dash_User_Info();
			
			if (the_user.id) {
				load_friends_list_Dashboard();
			    load_History_Games_Dashboard();
			}
        }
    }
};

export default routes;
