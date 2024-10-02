export default function render_Settings_Game() {
    return `
    
    <!--Page Title-->
    <div class="mx-3 row text-light mt-4">
	<div class="col shadow d-flex rounded justify-content-center align-items-center text-center background-dashboard ">
            <h3>Customize Game</h4>
        </div>
    </div>

    <!--Row with Boxes-->
    <div class="row align-items-center mx-3 d-flex mt-4 text-light justify-content-center">

        <!--Box for modifying game preferences-->
        <div id="" class="background-dashboard col-5 mt-4 rounded mx-auto">
            
			<div class="align-items-center d-flex mt-5 justify-content-center">
                <h3 class=" mb-3">User Preferences</h3>
            </div>
            <form id="user_preference-form" enctype="multipart/form-data">
                <div class="mb-3">
                    <label for="preference1" class="form-label text-light">Initial Game Speed</label>
                    <select class="form-control" id="user_preference1" name="user_preference1">
                        <option value="Standard">Standard</option>
                        <option value="Slow">Slow</option>
                        <option value="Quick">Quick</option>
                        <option value="Super_Quick">Super_Quick</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="preference2" class="form-label text-ligh">Racket Speed</label>
                    <select class="form-control" id="user_preference2" name="user_preference2">
                        <option value="Standard">Standard</option>
                        <option value="Slow">Slow</option>
                        <option value="Quick">Quick</option>
                        <option value="Super_Quick">Super_Quick</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="preference3" class="form-label text-ligh">Skin pong</label>
                    <select class="form-control" id="user_preference3" name="user_preference3">
                        <option value="White_(Standard)">White_(Standard)</option>
                        <option value="Tenis">Tenis</option>
                        <option value="Baseball">Baseball</option>
                        <option value="Basketball">Basketball</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="preference4" class="form-label text-ligh">Skin field</label>
                    <select class="form-control" id="user_preference4" name="user_preference4">
                        <option value="Black_(Standard)">Black_(Standard)</option>
                        <option value="Tenis">Tenis</option>
                        <option value="Baseball">Baseball</option>
                        <option value="Basketball">Basketball</option>
                    </select>
                </div>
                <div class="mb-5">
                    <label for="preference5" class="form-label text-ligh">Amount of Points at the End of the Game</label>
                    <select class="form-control" id="user_preference5" name="user_preference5">
                        <option value="11_Points_(Standard)">11_Points_(Standard)</option>
                        <option value="1_points">1_points</option>
                        <option value="3_points">3_points</option>
                        <option value="20_points">20_points</option>
                    </select>
                </div>
                <div class="d-grid gap-2 mb-4">
                    <button type="submit" class="button-custom rounded p-2">Save Preferences</button>
                </div>
            </form>
        </div>
    </div>
    `;
}