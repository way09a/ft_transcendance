import  { navigateTo }  from '../../spa.js';

export function click_Setting_Page() {

    document.getElementById('User_settings').addEventListener('click', () => handle_Button_Click('User_settings'));
    document.getElementById('Game_settings').addEventListener('click', () => handle_Button_Click('Game_settings'));

    function handle_Button_Click(button_Id) {
        let setting_content = '';
        switch (button_Id) {
            case 'User_settings':
                navigateTo('/user-settings/', {});
                break;
            case 'Game_settings':
                navigateTo('/game-settings/', {});
                break;
            default:
                setting_content = 'Unknown button';
                document.getElementById('content').innerHTML = setting_content;
        }
    }
}
