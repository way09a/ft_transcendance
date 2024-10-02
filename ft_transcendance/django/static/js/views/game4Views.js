export default function game_4_Views() {
    return `
    <div class="conteiner shadow m-4 rounded background-dashboard">

        <div class="d-flex row mb-4  align-items-center justify-content-center">
            <div class="col-10 m-4 shadow text-center text-light background-dashboard-2 rounded">
                <br><h4>Enter Player Nicknames</h4><br>
            </div>
        </div>

        <!--Inputs for Player names-->
        <div class="d-flex row mb-4  align-items-center justify-content-center">
            <div class="col-xs-5 col-5 col-sm-5 col-md-3 col-lg-3 col-xl-3 p-4 mx-auto text-center background-dashboard-2 rounded">
                <label for="Player1" class="form-label" style="color: #fff;">player 1</label>
                <br>
                <input type="name" class="form-control" id="Player1" name="Player1" required/>
            </div>
            <div class="col-sm-5 col-xs-5 col-5 col-md-3 col-lg-3 col-xl-3 p-4 mx-auto text-center background-dashboard-2 rounded">
                <label for="Player2" class="form-label" style="color: #fff;">player 2</label>
                <br>
                <input type="name" class="form-control" id="Player2" name="Pong_Player2" required/>
            </div>
        </div>
        <div class="d-flex row mb-4  justify-content-center align-items-center">
            <div class="col-xs-5 col-5 col-sm-5 col-md-3 col-lg-3 col-xl-3 p-4 mx-auto text-center background-dashboard-2 rounded">
                <label for="Player3" class="form-label" style="color: #fff;">player 3</label>
                <br>
                <input type="name" class="form-control" id="Player3" name="Pong_Player3" required/>
            </div>
            <div class="col-sm-5 col-5 col-xs-5  col-md-3 col-lg-3 col-xl-3 p-4 mx-auto text-center background-dashboard-2 rounded">
                <label for="Player4" class="form-label" style="color: #fff;">player 4</label>
                <br>
                <input type="name" class="form-control" id="Player4" name="Pong_Player4" required/>
            </div>
        </div>

        <!--Start Button-->
        <div class="d-flex row align-items-center justify-content-center">
                <div class="d-flex col-lg-3 col-sm-5 col-xs-10 align-items-center col-md-3 col-xl-3  justify-content-center">
                    <button type="button" id="Sart4Game" class="button-custom p-3 shadow rounded">
                        <h4> Start Game </h4>
                    </button>
                </div>
            </div>
        <br><br>
    </div>
    `;
}
