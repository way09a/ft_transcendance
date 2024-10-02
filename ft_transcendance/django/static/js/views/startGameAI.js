
export default function startGameAI() {
    return `
    <div class="conteiner mt-4 mb-4">
            
        <div class="row mx-3 mt-4 text-light h-10vh ">
        <!--Page Title-->
            <div class="col shadow rounded d-flex align-items-center justify-content-center background-dashboard text-center">
                <h3>Classic Game 1x1</h4>
            </div>
        </div>

        <div class="row mt-3 mx-auto">

            <!--Player 1 Side Box-->
            <div class="col mx-auto">
                <div class="rounded background-dashboard p-4 text-light text-center">
                    <h5 id="p1">Player x</h5>
                    <p>Up: W  | Down: S<p>
                </div>
            </div>
            <!--Player 2 Side Box-->
            <div class="col mx-auto">
                <div class="rounded background-dashboard p-4 text-light text-center">
                    <h5 id="p2">Player y</h5>
                    <p>A intelligence<p>
                </div>
            </div>
        </div>
        <div class="row mt-3 mx-auto">
            <!--Game Canvas-->
            <div class="col-8 background-dashboard rounded mx-auto d-flex align-items-center justify-content-center">
                <canvas id="pong_canvas"></canvas>
            </div>
        </div>
    </div>
  
    `;
}
