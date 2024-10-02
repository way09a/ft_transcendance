export default function render_Register() {
    return `
        <div class="m-4 conteiner">
			<div class="row">
				<div class="col"></div>
				<div class="rounded mx-auto col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 background-dashboard ">

					<!--Page Title-->
					<h3 class="mt-3 text-center text-light">Register</h3>

					<!--Registration Form-->
					<form id="form-register">

						<!--Email-->
						<div class="mb-3">
							<label for="email" class="text-light form-label">Email</label>
							<input type="email" class="form-control" id="email" name="email" placeholder="Enter your email" required>
						</div>

						<!--Username-->
						<div class="mb-3">
							<label for="username"" class="text-light form-label">Nickname</label>
							<input type="username" id="username" name="username" placeholder="Enter your nickname" class="form-control" required>
						</div>
						
						<!--Password-->
						<div class="mb-5">
							<label for="password" class="text-light form-label">Password</label>
							<input type="password" class="form-control" id="password" name="password" placeholder="Enter your password" required>
						</div>
						
						<!--Buttons-->
						<div class="d-grid gap-2 mb-4">
							<!--Button to Submit the Registration Form-->
							<button type="submit" class="my_bacground_grey button-custom rounded p-2">register</button>
							<!--Button Redirects to Login Page-->
							<button type="button" id="button-login" class="rounded p-2 button-custom ">have an account? Login</button>
						</div>
					</form>
				</div>
				<div class="col"></div>
			</div>
		</div>

    `;
}
