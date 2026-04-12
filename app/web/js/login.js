
const API = "https://unified-adapted-web-platform.onrender.com";

// ── Toggle password eye ──────────────────────────────────────
function toggleEye(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('bx-hide', 'bx-show');
  } else {
    input.type = 'password';
    icon.classList.replace('bx-show', 'bx-hide');
  }
}

// ── Error helpers ────────────────────────────────────────────
function showError(msg) {
  const el = document.getElementById('errorMsg');
  el.textContent = msg;
  el.style.display = 'block';
}

function clearError() {
  const el = document.getElementById('errorMsg');
  el.style.display = 'none';
  el.textContent = '';
}

// ── Switch forms ─────────────────────────────────────────────
function switchToSignup() {
  clearError();

  document.getElementById('authHeading').textContent = 'Sign Up';
  document.getElementById('authSubtext').textContent = 'Create your free UAWP account.';

  document.getElementById('loginFields').style.display = 'none';
  document.getElementById('signupFields').style.display = 'block';

  document.getElementById('switchText').innerHTML =
    'Already have an account? <span onclick="switchToLogin()">Log In</span>';
}

function switchToLogin() {
  clearError();

  document.getElementById('authHeading').textContent = 'Log In';
  document.getElementById('authSubtext').textContent = 'Welcome back! Please enter your details.';

  document.getElementById('loginFields').style.display = 'block';
  document.getElementById('signupFields').style.display = 'none';

  document.getElementById('switchText').innerHTML =
    'Don\'t have an account? <span onclick="switchToSignup()">Sign Up</span>';
}

// ── LOGIN ────────────────────────────────────────────────────
async function handleLogin() {
  clearError();

  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPassword').value;

  if (!email || !pass) {
    showError('Please fill in all fields.');
    return;
  }

  if (!email.includes('@')) {
    showError('Please enter a valid email address.');
    return;
  }

  const btn = document.querySelector('#loginFields .auth-btn');
  btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Logging in...`;
  btn.disabled = true;

  try {
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password: pass
      })
    });

    const data = await res.json();

    if (!res.ok) {
      showError(data.message || "Login failed");
      btn.innerHTML = `<i class='bx bx-log-in'></i> Log In`;
      btn.disabled = false;
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));

    const redirectTo = sessionStorage.getItem('redirectAfterLogin');
    sessionStorage.removeItem('redirectAfterLogin');

    if (redirectTo) {
      window.location.href = redirectTo;
    } else {
      sessionStorage.setItem('justLoggedIn', '1');
      window.location.href = 'index.html';
    }

  } catch (err) {
    console.error(err);
    showError("Server error. Please try again later.");

    btn.innerHTML = `<i class='bx bx-log-in'></i> Log In`;
    btn.disabled = false;
  }
}

// ── SIGNUP ───────────────────────────────────────────────────
async function handleSignup() {
  clearError();

  const first = document.getElementById('signupFirst').value.trim();
  const last = document.getElementById('signupLast').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const pass = document.getElementById('signupPassword').value;
  const confirm = document.getElementById('signupConfirm').value;

  if (!first || !last || !email || !pass || !confirm) {
    showError('Please fill in all fields.');
    return;
  }

  if (!email.includes('@')) {
    showError('Please enter a valid email address.');
    return;
  }

  if (pass.length < 6) {
    showError('Password must be at least 6 characters.');
    return;
  }

  if (pass !== confirm) {
    showError('Passwords do not match.');
    return;
  }

  const btn = document.querySelector('#signupFields .auth-btn');
  btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Creating account...`;
  btn.disabled = true;

  try {
    const res = await fetch(`${API}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: first,
        lastName: last,
        email,
        password: pass
      })
    });

    const data = await res.json();

    if (!res.ok) {
      showError(data.message || "Signup failed");
      btn.innerHTML = `<i class='bx bx-user-plus'></i> Create Account`;
      btn.disabled = false;
      return;
    }

    btn.innerHTML = `Account created!`;

    setTimeout(() => {
      switchToLogin();
      btn.innerHTML = `<i class='bx bx-user-plus'></i> Create Account`;
      btn.disabled = false;
    }, 1200);

  } catch (err) {
    console.error(err);
    showError("Server error. Please try again later.");

    btn.innerHTML = `<i class='bx bx-user-plus'></i> Create Account`;
    btn.disabled = false;
  }
}