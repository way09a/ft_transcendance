//First screen when clicking on Tournament in the Game Selector
export default function game_Tournament_Init_Views() {
    return `
    <div class="conteiner shadow m-4 background-dashboard rounded">

        <div class="d-flex row mb-4  align-items-center justify-content-center">
            <div class="col-6 m-4  shadow text-center text-light background-dashboard-2 rounded">
                <br>
                <h4>Welcome to the Tournament!</h4>
                <br>
                <h6>Please inform how many players will participate</h6>
                <br>
            </div>
        </div>

        <!--Inputs for Player names-->
        <div class="d-flex row mb-4  align-items-center justify-content-center">
            <div class=" col-lg-3 col-5 p-4 col-sm-5  col-md-3  background-dashboard-2 col-xl-3 text-center col-xs-5 rounded">
                <br>
                <input type="name" class="form-control" id="numPlayers" name="numPlayers" required/>
                <br>
            </div>
        </div>

        <!--Start Button-->
        <div class="d-flex row justify-content-center align-items-center">
                <div class="col-xs-10 col-sm-5 align-items-center col-md-3 col-lg-3 col-xl-3 d-flex justify-content-center">
                    <button type="button" id="next" class="button-custom p-3 shadow rounded">
                        <h4>Next</h4>
                    </button>
                </div>
            </div>
        <br><br>
    </div>
    `;
}

//Ideally it should receive the number of Players
export function gamessTournamentRegistereViews() {
    return `
    <div class="conteiner m-4 shadow background-dashboard rounded">

        <div class="d-flex mb-4 row align-items-center justify-content-center">
            <div class="col-6 m-4 background-dashboard-2 shadow text-center text-light rounded">
                <br><h4>Enter Player Nicknames</h4><br>
            </div>
        </div>

        <!--Inputs for Player names-->
        <div class="d-flex row mb-4 align-items-center justify-content-center">
            <div class="col-5 p-4 col-xs-5 text-center col-sm-5 background-dashboard-2 col-md-3 col-lg-3 rounded col-xl-3   ">
                <label for="player1" class="form-label" style="color: #fff;">player 1</label>
                <br>
                <input type="name" class="form-control" id="player1" name="pong_player1" required/>
            </div>
            <div class="col-5 col-lg-3 offset-1 col-sm-5 background-dashboard-2 col-md-3 col-xs-5 p-4 text-center col-xl-3  rounded">
                <label for="player1" class="form-label" style="color: #fff;">player 2</label>
                <br>
                <input type="name" class="form-control" id="player1" name="pong_player1" required/>
            </div>
        </div>

        <!--Start Button-->
        <div class="d-flex row  justify-content-center align-items-center">
                <div class="col-xs-10 justify-content-center col-lg-3 col-sm-5 align-items-center col-md-3  col-xl-3 d-flex ">
                    <button type="button" id="start_Classic" class="button-custom p-3 shadow rounded">
                        <h4> Start Tournament </h4>
                    </button>
                </div>
            </div>
        <br><br>
    </div>
    `;
}

//Ideally it should receive the name of the next two Players
export function gameTournamentNextViews() {
    return `
    <div class="conteiner shadow m-4 background-dashboard rounded">

        <div class="d-flex row mb-4 justify-content-center align-items-center">
            <div class="m-4 col-6  shadow background-dashboard-2  text-center text-light rounded">
                <br><h4>Next game</h4><br>
            </div>
        </div>

        <!--Imputs for the names of the Players-->
        <div class="d-flex row mb-4  justify-content-center align-items-center">
            <div class="col-5 col-lg-3 text-center col-sm-5 col-md-3  col-xl-3 p-4 col-xs-5 background-dashboard-2 rounded">
                <h5>Player X vs Player Y</h5>
            </div>
        </div>

        <!--Start Button-->
        <div class="d-flex row justify-content-center align-items-center">
                <div class="col-md-3 col-sm-5 align-items-center col-lg-3 d-flex col-xl-3 col-xs-10 justify-content-center">
                    <button type="button" id="start_Classic" class="button-custom shadow p-3 rounded">
                        <h4>Start game</h4>
                    </button>
                </div>
            </div>
        <br><br>
    </div>
    `;
}