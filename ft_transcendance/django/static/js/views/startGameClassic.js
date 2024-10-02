
export default function start_Game_Classic() {
    return `
    <div class=" mb-4 mt-4 conteiner">
            
        <div class="text-light h-10vh row mt-4 mx-3 ">
        <!--Page Title-->
            <div class="background-dashboard text-center  align-items-center justify-content-center col rounded d-flex shadow">
                <h4>Classic PongGame 1vs1</h4>
            </div>
        </div>

        <div class="mx-auto mt-3 row">

            <!--Player 1 Side Box-->
            <div class="mx-auto col ">
                <div class="text-center background-dashboard rounded text-light p-4 ">
                    <h5 id="p1">Player 1</h5>
                    <p>Up: W || Down: S<p>
                </div>
            </div>
            <!--Player 2 Side Box-->
            <div class="mx-auto col">
                <div class="text-center background-dashboard rounded text-light p-4 ">
                    <h5 id="p2">Player 2</h5>
                    <p>Up: O  || Down: L<p>
                </div>
            </div>
        </div>
        <div class="mx-auto mt-3 row ">
            <!--Game Canvas-->
            <div class="justify-content-center align-items-center col-8 background-dashboard rounded mx-auto d-flex">
                <canvas id="pong_canvas"></canvas>
            </div>
        </div>
    </div>
  
    `;
}
