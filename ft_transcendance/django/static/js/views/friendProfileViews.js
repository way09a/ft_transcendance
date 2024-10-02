export default function render_profile_user() {
    return `
        <div class="mt-4 conteiner "></div>
            <!--Page Title-->
            <div class="mx-3 mt-4 row shadow rounded background-dashboard text-light p-2">
                <div class="col-12 mx-auto d-flex align-items-center justify-content-center text-center">
                    <h3 id="user-profile-title">User_x Profile</h3> <!-- Added ID for the title -->
                </div>
            </div>
            <div class=" mt-4 text-lightmx-3 row">

				<!--User Card-->
				<div class="col-xs-4 order-1 col-sm-5 col-md-4 mt-3  text-center background-dashboard col-lg-3 shadow rounded" id="user-info" data-default-profile-image="../../static/img/default_user.png">
					<div  justify-content-center d-flex align-items-center >
						<img id="profile_photo_img" class=" rounded img-fluid mt-3 ">
					</div>
					<br>
					<h4 class="background-dashboard-2 rounded shadow" id="nickname_user">Username</h4>
					<img id="status_icon" src="static/img/online1.png" class="icon_sm">
					<br><br>
					<p class="rounded shadow background-dashboard-2" id="game_play">game: 00</p>
					<p class="rounded shadow background-dashboard-2" id="game_win">win: 00</p>
					<p class="rounded shadow background-dashboard-2" id="game_loss">loss: 00</p>
					<br><br>
					<div class="text-center mt-4">
						<canvas id="game-stats-chart" width="300" height="300"></canvas>
					</div>
				</div>

				<!-- history -->
				<div class="background-dashboard offset-sm-1 mt-3  col-md-7 col-lg-8 order-2 shadow rounded col-sm-6  col-xs-6 text-center">
				    <!-- Container for history list -->
				    <div id="list-historyDashboard">
				        <div class="p-2 mt-3 mx-2 rounded shadow background-dashboard-2">
				            <h5>Game History</h5>
				        </div>
				        <br>
				        <!-- Histories will be inserted here -->
				    </div>

				    <!-- Template for history -->
				    <template id="history-templateDashboard">
				        <div class="m-2 shadow rounded background-dashboard-2">
				            <p class="history-item"></p>
				        </div>
				    </template>

				</div>
            </div>
        </div>
    `;
}
