export default function render_search_friends() {
    return `
        <!--Dashboard Header-->
        <div class="text-light row mt-4 ">
		 	<link rel="stylesheet" href="static/css/user_profile.css">
            <div class="background-dashboard text-center col-xs-12 col-sm-12 col-md-12 col-lg-11 shadow mx-auto rounded  ">
                <h4 class="mt-2 mb-2">Friends List</h4>
            </div>
        </div>

        <!--Row with friends list and search bar-->
        <div class="text-light row mx-3 mt-4 ">

            <!--Friends List-->
            <div class="text-center background-dashboard shadow rounded mx-auto col-xs-12 col-sm-10 col-md-10 col-lg-7 mt-3 ">

                <!--Rows with friend info-->
                <!-- Container for friends list -->
                <div id="list-friends">
                    <!-- Friends will be inserted here -->
                </div>
                <div id="total-friends-container">
                    Total friends: <span id="total-friends">0</span>
                </div>

<template id="friend-templates">
    <div class="rounded d-flex align-items-center row p-2 background-dashboard-2 m-3 shadow ">
        <div class="align-items-center justify-content-start col-1 d-flex  ">
            <img src="static/img/default_user.png" class="profile-photo icon-friend-size">
        </div>
        <div class="justify-content-center col-6 d-flex align-items-center ">
            <h5 class="friend-username mb-0"></h5>
        </div>
        <div class="justify-content-end col-5 d-flex align-items-center ">
            <div class="justify-content-center d-flex align-items-center me-3">
                <img src="static/img/online1.png" class="icon_sm status-icon">
            </div>
        </div>
    </div>
</template>




                <!--End of friends list-->
            </div>
            <!--search friends-->
            <div class="background-dashboard shadow rounded mx-auto col-xs-12 col-sm-10 col-md-10 col-lg-4 mt-3  ">
                <!--Box Title-->
                <div class="align-items-center justify-content-center background-dashboard-2 p-2 m-3 rounded text-center text-light shadow d-flex ">
                    <h3 class="">Find Friends</h3>
                </div>

                <!--Form-->
                <div class="justify-content-center background-dashboard-2 p-2 m-3 shadow rounded d-flex align-items-center ">
                    <form class="w-100" id="search-friends-form">
                        <div class="mt-2 mb-3">
                            <label for="nickname" class="form-label">Nickname</label>
                            <input type="text" class="form-control" id="nickname" name="nickname" required>
                        </div>
                        <div class="d-flex align-items-center justify-content-center mb-3">
                            <button type="submit" class="button-custom-nocolor w-100 shadow background-dashboard rounded">Search</button>
                        </div>
                    </form>
                </div>

                <!--Send Friend Request-->
                <div class="m-3 d-flex align-items-center justify-content-center">
                    <button id="send-sender-btn" class="w-100 button-custom-nocolor background-dashboard-2 rounded" style="display: none;">Send Friend Request</button>
                </div>

                <!--Pending Requests-->
                <div class="m-3 p-2 rounded background-dashboard-2 text-center">
                    <h4>Friend Requests</h4>
                    <ul id="requests-pendentes" class="text-center"></ul>
                </div>

				<!--Submitted Requests-->
                <div class="m-3 p-2 rounded background-dashboard-2 text-center">
                    <h4>Submitted Requests</h4>
                    <ul id="requests-Sents" class="text-center"></ul>
                </div>
                <br>
            </div>
        </div>
    `;
}