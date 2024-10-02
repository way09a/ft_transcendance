export default function render_Settings_User() {
    return `
    <!--Page Title-->
    <div class="mx-3 row text-light mt-4  ">
        <div class="col rounded d-flex shadow background-dashboard justify-content-center align-items-center text-center">
            <h3>Edit Information</h4>
        </div>
    </div>

    <!--Row for Boxes-->
    <div class="d-flex row mx-3 text-light mt-4 justify-content-center align-items-center ">

        <!--Box to modify Infos-->
        <div class="mx-auto col-xl-5 mt-4 background-dashboard col-mb-5 shadow rounded  ">

            <!--Current User Image-->
            <div id="user_info" class="mx-auto " data-default-profile-image="../../static/img/default_user.png">
                <img id="user_image" class="rounded mx-auto w-50 mt-3 mb-3">
            </div>

            <form id="user_form" enctype="multipart/form-data">
                <!--User ID Field-->
                <div class="mb-3">
                    <label for="user_id" class="text-light form-label">User ID</label>
                    <input type="text" id="user_id" name="user_id"  class="form-control" readonly>
                </div>
                <!--Username Field-->
                <div class="mb-3">
                    <label for="user_username" class="text-light form-label">Username</label>
                    <input type="text" id="user_username" name="user_username" class="form-control">
                </div>
                <!--Email Field-->
                <div class="mb-3">
                    <label for="user_email" class="text-light form-label">Email</label>
                    <input type="email" id="user_email" name="user_email" class="form-control">
                </div>
                <!--Change User Avatar-->
                <div class="mb-5">
                    <label for="user_image_upload" class="text-light form-label">Avatar</label>
                    <input type="file" id="user_image_upload" name="profile_image"  class="form-control">
                    <input type="checkbox" id="using_default_image" class="form-check-input">
                    <label class="form-check-label" for="using_default_image">Use default image</label>
                </div>
                <!--Submit Button-->
                <div class="gap-2 d-grid mb-4">
                    <button type="submit" class="button-custom rounded p-2">Save Changes</button>
                </div>
            </form>
        </div>
    </div>
    `;
}