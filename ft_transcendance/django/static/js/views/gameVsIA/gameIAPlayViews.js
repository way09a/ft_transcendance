export default function start_game_Vs_AI() {
    return `
    <div class="conteiner mt-4 mb-4">
            
		<div class="mt-4 text-light mx-3 h-10vh row">
        <!-- Page Title -->
		<div class=" shadow d-flex rounded justify-content-center col background-dashboard text-center align-items-center">
                <h4>Player Vs AI</h4>
            </div>
        </div>

        <div class="row mt-3 mx-auto">

            <!-- Sidebar for Player 1 -->
            <div class="col-2">
					<div class="background-dashboard rounded p-4 text-center text-light">
                    <h4>Player </h4>
                    <br>
                </div>
            </div>

            <!-- Game Canvas -->
            <div class="col-8 d-flex rounded mx-auto align-items-center background-dashboard justify-content-center">
                <canvas id="pong_canvas"></canvas>
            </div>

            <!-- Sidebar for AI -->
            <div class="col-2">
				<div class="p-4 rounded background-dashboard text-light text-center">
                    <h4>AI</h4>
                    <br>
                </div>
            </div>
        </div>
    </div>
    `;
}

