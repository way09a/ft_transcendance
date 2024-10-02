import { user_preferences } from '../../crud/the_user.js';
import { token } from '../../spa.js';

export async function render_Preferences_Game() {
    User_Preferences_loading();
}

export function User_Preferences_loading() {
    set_Single_Options('user_preference1', user_preferences.preference1);
    set_Single_Options('user_preference2', user_preferences.preference2);
    set_Single_Options('user_preference3', user_preferences.preference3);
    set_Single_Options('user_preference4', user_preferences.preference4);
    set_Single_Options('user_preference5', user_preferences.preference5);

}

function set_Single_Options(Id_selected, element_value) {
    const select_Element = document.getElementById(Id_selected);
    select_Element.value = element_value;
}

export async function send_Update_Game() {
    if (!token) {
        console.error('Authentication token not found.');
        return;
    }

    document.getElementById('user_preference-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const user_preferences_data = {
            preference1: document.getElementById('user_preference1').value,
            preference2: document.getElementById('user_preference2').value,
            preference3: document.getElementById('user_preference3').value,
            preference4: document.getElementById('user_preference4').value,
            preference5: document.getElementById('user_preference5').value
        };

        await fetch('/api/user-preferencess/', {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user_preferences_data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('User Preferences updated:', data);
            alert('Preferences updated successfully!');
            location.reload(true);
        })
        .catch(errors => {
            console.error('Error updating User Preferences:', errors);
            alert('Error updating User Preferences.');
        });
    });
}