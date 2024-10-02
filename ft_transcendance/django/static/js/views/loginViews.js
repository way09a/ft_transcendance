export default function render_Login() {
    return `
        <div class="m-4 conteiner">
            <div class="row">
                <div class="col"></div>
                <div class="  col-md-4 background-dashboard col-12 rounded col-lg-3 mx-auto col-xl-3 col-sm-6">
                    <h3 class=" mt-3 text-light text-center">Login</h3>
                    <!--Login Form-->
                    <form id="loginForm">
                        <!--Email-->
                        <div class="mb-3">
                            <label for="email" class="text-light form-label">Email</label>
                            <input type="email" class="form-control" id="email" name="user_email" placeholder="student@student.42.fr" required>
                        </div>
                        <!--Password-->
                        <div class="mb-5">
                            <label for="password" class="text-light form-label">Password</label>
                            <input type="password" class="form-control" id="password" name="user_password" placeholder="password" required>
                        </div>
                        <!--Buttons-->
                        <div class="gap-2 d-grid mb-4">
                            <!--Login with Form Data-->
                            <button type="submit" id="button-login" class="button-custom my_bacground_grey p-2 rounded ">Login</button>
                            <!--Login via API 42-->
                            <button type="button" id="button-login-42" class="my_bacground_grey button-custom rounded p-2">Login with 42</button>
                            <!--Button to Go to Registration-->
                            <button type="button" id="button-register" class="rounded button-custom  p-2">dont have an account? register</button>
                        </div>
                    </form>
                </div>
                <div class="col"></div>
            </div>
        </div>
    `;
}
