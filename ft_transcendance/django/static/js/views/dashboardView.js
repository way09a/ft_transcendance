export default function render_Login() {
    return `
        <div class="mt-4 conteiner"></div>

			<!--Header do Dashboard-->
			<div class="row text-light mx-4  d-flex align-items-center mt-4 justify-content-center">
				<div class="align-items-center col-sm-8 col-md-7 text-center col-lg-12 shadow col-xs-7rounded d-flex justify-content-center background-dashboard ">
					<h4 class="mt-2" >Dashboard</h4>
				</div>
			</div>

			<div class="d-flex row mx-4 text-light  mt-4 justify-content-center">

				<!--User Card-->
				<div class="order-1 background-dashboard col-xs-7 mt-3 col-md-7 col-lg-2  text-center col-sm-8  shadow rounded" id="user-info" data-default-profile-image="../../static/img/default_user.png">
					<div  justify-content-center d-flex align-items-center>
						<img id="user-image" class="img-fluid mt-3 rounded">
					</div>
					<br>
					<h4 class="rounded shadow background-dashboard-2" id="user-username">Username</h4>
					<br><br>
					<p class="rounded shadow background-dashboard-2" id="game_play">game: 00</p>
					<p class="rounded shadow background-dashboard-2" id="game_win">win: 00</p>
					<p class="rounded shadow background-dashboard-2" id="game_loss">loss: 00</p>
					<br><br>
					<div class="mt-4 text-center">
						<canvas id="game-stats-chart" width="300" height="300"></canvas>
					</div>
				</div>

				<!-- history -->
				<div class="background-dashboard col-sm-8 col-md-7 col-lg-5 offset-lg-1 order-2 mt-3 col-xs-7 shadow rounded text-center">

				    <!-- Container for history list -->
				    <div id="list-historyDashboard">
				        <div class="p-2 background-dashboard-2 rounded mt-3 mx-2  shadow">
				            <h5>Game History</h5>
				        </div>
				        <br>
				        <!-- Histories will be inserted here -->
				    </div>

				    <!-- Template for history -->
				    <template id="history-templateDashboard">
				        <div class="shadow background-dashboard-2 m-2 rounded">
				            <p class="history-item"></p>
				        </div>
				    </template>

				</div>

				<!--FriendsList-->
				<div class="col-xs-7 shadow col-md-7 mt-3 col-sm-8 background-dashboard offset-lg-1 order-3 rounded col-lg-3 text-center">

					<!-- Container for friends list -->
					<div id="list-friendsDashboard">
						<div class="p-2 mt-3 background-dashboard-2 rounded mx-2 shadow">
							<h5>Friends Online</h5>
						</div>
						<br>
						<!-- Friends will be inserted here -->
					</div>

					<!-- Template for friends -->
					<template id="friend-templatesDashboard">
						<div class="p-2 row background-dashboard-2 align-items-center shadow rounded d-flex m-3 justify-content-center">
						    <div class="align-items-center col-1 d-flex justify-content-center">
						        <img src="static/img/default_user.png" class="profile-photoDashboard icon-friend-size">
						    </div>
						    <div class="col-8">
						        <h5 class="friend-username-dashboard"></h5>
						    </div>
						    <div class="col-1 mx-auto align-items-center  d-flex justify-content-center">
						        <img src="static/img/online1.png" class="icon_sm status-iconDashboard">
						    </div>
						</div>
					</template>

				</div>

			</div>

		</div>
    `;
}
