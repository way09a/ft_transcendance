export default function render_Settings_Page() {
    return `
		<div class="conteiner m-4 shadow background-dashboard rounded">

			<div class="d-flex align-items-center row justify-content-center">
			    <div class="col-10 background-dashboard-2 m-4 shadow text-light text-center rounded">
                    <br><h4>Settings</h4><br>
                </div>
            </div>

            <div class="d-flex align-items-stretch row ">
				<div class=" col-lg-3 col-sm-5  col-xs-10 col-xl-3 mx-auto col-md-3 d-flex">
                    <button type="button" id="User_settings" class="p-4 flex-fill m-4 button-custom  shadow rounded">
                        <h4>Change my details</h4>
                    </button>
                </div>
                <div class="col-md-3 col-xs-10 col-sm-5 mx-auto col-lg-3 col-xl-3 d-flex">
                    <button type="button" id="Game_settings" class="flex-fill button-custom m-4 p-4 shadow rounded">
                        <h4>Customize Game</h4>
                    </button>
                </div>
            </div>
        </div>
    `;
}
