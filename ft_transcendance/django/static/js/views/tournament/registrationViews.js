export default function game_Tournament_Registere_Views() {
    return `
        <div class="conteiner rounded background-dashboard shadow m-4">
            <div class="row mb-4 d-flex align-items-center justify-content-center">
                <div class="col-10 m-4 background-dashboard-2 shadow rounded text-center text-light">
                    <br><h4>Enter Player Nicknames</h4><br>
                </div>
            </div>
            <!--Inputs for Player names-->
            <div class="row mb-4 d-flex justify-content-center align-items-center">
                <div class="col-10" id=players_inputs_container>
                    <!-- Input fields will be generated here -->
                </div>
            </div>
            <!--Start Button-->
            <div class="row d-flex justify-content-center align-items-center">
                <div class=" col-lg-4 col-xs-11 col-sm-6 col-md-4 align-items-center col-xl-4 justify-content-center  d-flex">
                    <button type="button" id="start_Classic" class="button-custom p-3 shadow rounded">
                        <h4>Start Tournament</h4>
                    </button>
                </div>
            </div>
            <br><br>
        </div>
    `;
}