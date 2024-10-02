export default function game_AI_Views() {
    return `
    <div class="conteiner background-dashboard shadow m-4 rounded">

        <div class="d-flex row mb-4 align-items-center justify-content-center">
            <div class="col-6 m-4 shadow text-center background-dashboard-2 text-light rounded">
                <br><h4>Enter Player Nicknames</h4><br>
            </div>
        </div>

        <!--Inputs for Player names-->
        <div class="d-flex row mb-4 align-items-center justify-content-center">
            <div class="p-4 col-5 col-md-3 col-xs-5 col-sm-5  col-lg-3 col-xl-3  text-center background-dashboard-2 rounded">
                <label for="player1" class="form-label" style="color: #fff;">player 1</label>
                <br>
                <input type="name" class="form-control" id="player1" name="pong_player1" required/>
            </div>
        </div>

        <!--Start Button-->
        <div class="row d-flex  justify-content-center align-items-center">
                <div class="align-items-center col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 d-flex justify-content-center">
                    <button type="button" id="start_Classic" class="button-custom p-3 shadow rounded">
                        <h4>Start Game</h4>
                    </button>
                </div>
            </div>
        <br><br>
    </div>
    `;
}
