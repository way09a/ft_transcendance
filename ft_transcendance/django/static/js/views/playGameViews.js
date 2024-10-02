
export function render_Play_Game() {
    return `
        <div class="conteiner background-dashboard shadow m-4 rounded">

            <div class="row d-flex align-items-center justify-content-center">
                <div class="col-6 m-4 background-dashboard-2 shadow text-center text-light rounded">
                    <br><h4>Select the desired mode</h4><br>
                </div>
            </div>

            <div class="row d-flex align-items-stretch">
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 mx-auto d-flex">
                    <button type="button" id="game_Classic" class="button-custom flex-fill m-4 p-4 shadow rounded">
                        <h4>1 vs 1</h4>
                    </button>
                </div>
				<div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 mx-auto d-flex">
                    <button type="button" id="game_4players" class="flex-fill button-custom m-4 p-4 shadow rounded">
                        <h4>4 Players</h4>
                    </button>
                </div>
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 mx-auto d-flex">
                    <button type="button" id="vsAI" class="button-custom  flex-fill m-4 p-4 shadow rounded">
                        <h4>1 vs IA</h4>
                    </button>
                </div>
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 mx-auto d-flex">
                    <button type="button" id="game_Tournament" class="button-custom flex-fill m-4 p-4 shadow rounded">
                        <h4>tournament</h4>
                    </button>
                </div>
            </div>
            <br><br>
        </div>
    `;
}

export function renderVictoryGame() {
    return `
        <div class="conteiner background-dashboard shadow m-4 rounded">

            <div class="row d-flex align-items-center justify-content-center">
                <div class="col-6 m-4 background-dashboard-2 shadow text-center text-light rounded">
                    <br><h4>Victory for: Player X</h4><br>
                </div>
            </div>

            <div class="row d-flex align-items-center justify-content-center">
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 d-flex align-items-center justify-content-center">
                    <button type="button" id="game_Classic" class="button-custom p-4 shadow rounded">
                        <h4>Back to Selection</h4>
                    </button>
                </div>
            </div>
            <br><br>
        </div>
    `;
}
