export default function game_Classic_Views() {
    return `
    <div class="conteiner shadow background-dashboard m-4 rounded">

        <div class="d-flex row mb-4  align-items-center justify-content-center">
            <div class="col-6 m-4 shadow background-dashboard-2 text-light text-center rounded">
                <br><h4>Enter Player Nicknames</h4><br>
            </div>
        </div>

        <!--Inputs for Player names-->
        <div class="row mb-4 d-flex align-items-center justify-content-center">
            <div class="p-4 col-5 col-md-3 col-xs-5 col-sm-5  col-lg-3 col-xl-3  text-center background-dashboard-2 rounded">
                <label for="player1" class="form-label" style="color: #fff;">player 1</label>
                <br>
                <input type="name" class="form-control" id="player1" name="pong_player1" required/>
            </div>
            <div class="col-5 col-xs-5 col-sm-5 col-md-3 col-lg-3 col-xl-3 p-4 offset-1 text-center background-dashboard-2 rounded">
                <label for="player1" class="form-label" style="color: #fff;">player 2</label>
                <br>
                <input type="name" class="form-control" id="player2" name="pong_player2" required/>
            </div>
        </div>

        <!--Start Button-->
        <div class="row d-flex justify-content-center align-items-center">
                <div class="d-flex col-sm-5 col-xs-10  col-md-3 align-items-center col-lg-3 col-xl-3 justify-content-center">
                    <button type="button" id="start_Classic" class="button-custom p-3 shadow rounded">
                        <h4>Start Game</h4>
                    </button>
                </div>
            </div>
        <br><br>
    </div>
    `;
}
