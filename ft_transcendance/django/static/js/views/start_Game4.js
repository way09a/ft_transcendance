
export default function startgame4() {
    return `
    <div class="mb-4 mt-4 conteiner">
            
        <div class="text-light h-10vh row mx-3 mt-4 ">
        <!--Page Title-->
            <div class="background-dashboard text-center col shadow rounded d-flex align-items-center justify-content-center ">
                <h4> 2 vs 2 </h4>
            </div>
        </div>

        <div class="mx-auto row mt-3 ">
            <!--Side Box for Player 1 and 2-->
            <div class="mx-auto col">
                <div class="text-light text-center m-2 rounded background-dashboard p-4 ">
                    <h5 id="p1">Player 1</h5>
                    <p>Up: W  || Down: S<p>
                </div>
                <div class="text-light text-center m-2 rounded background-dashboard p-4 ">
                    <h5 id="p2">Player 2</h5>
                    <p>Up: T  || Down: G<p>
                </div>
            </div>

            <!--Side Box for Player 3 and 4-->
            <div class="mx-auto col">
                <div class="text-light text-center m-2 rounded background-dashboard p-4 ">
                    <h5 id="p3">Player 3</h5>
                    <p>Up: O  || Down: L<p>
                </div>
                <div class="m-2 rounded background-dashboard p-4 text-light text-center">
                    <h5 id="p4">Player 4</h5>
                    <p>Up: U  || Down: J<p>
                </div>
            </div>
        </div>
        <div class="mx-auto row mt-3 ">
            <!--Game Canvas-->
            <div class="order-2 col-8 background-dashboard rounded mx-auto d-flex align-items-center justify-content-center">
                <canvas id="pong_canvas"></canvas>
            </div>
        </div>
    </div>
  
    `;
}
