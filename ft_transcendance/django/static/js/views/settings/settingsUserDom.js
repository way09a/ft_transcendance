import { the_user } from '../../crud/the_user.js';
import { token } from '../../spa.js';

export function render_User_Infos() {
    document.getElementById('user_id').value = the_user.id;
    document.getElementById('user_username').value = the_user.username;
    document.getElementById('user_email').value = the_user.email;

    const image_user = document.getElementById('user_image');
    const defaultImage = document.getElementById('user_info').getAttribute('data-default-profile-image');

    if (the_user.image) {
        image_user.src = the_user.image;
    } else {
        image_user.src = defaultImage;
    }
    image_user.style.display = 'block';
}


export async function send_Update_User() {
    if (!token) {
        console.error('Authentication token not found.');
        return;
    }

    document.getElementById('user_form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const Data_form = new FormData();
        Data_form.append('username', document.getElementById('user_username').value);
        Data_form.append('email', document.getElementById('user_email').value);

        const Input_file = document.getElementById('user_image_upload');
        const usingDefaultImage = document.getElementById('using_default_image').checked;

        if (usingDefaultImage) {
            Data_form.append('profile_image', '');
        } else if (Input_file.files[0]) {
            Data_form.append('profile_image', Input_file.files[0]);
        }

        await fetch('/api/update-user/', {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`
            },
            body: Data_form
        })
        .then(response => response.json())
        .then(data => {
            console.log('User data updated:', data);
            alert('Data updated successfully!');
            location.reload(true);
        })
        .catch(error => {
            console.error('Error updating user data:', error);
            alert('Error updating user data.');
        });
    });
}

