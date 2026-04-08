// ── Toggle password eye ──
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

// ── Error helpers ──
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

// ── Switch to Sign Up ──
function switchToSignup() {
  clearError();
  document.getElementById('authHeading').textContent = 'Sign Up';
  document.getElementById('authSubtext').textContent = 'Create your free UAWP account.';
  document.getElementById('loginFields').style.display = 'none';
  document.getElementById('signupFields').style.display = 'block';
  document.getElementById('switchText').innerHTML =
    'Already have an account? <span onclick="switchToLogin()">Log In</span>';
}

// ── Switch to Log In ──
function switchToLogin() {
  clearError();
  document.getElementById('authHeading').textContent = 'Log In';
  document.getElementById('authSubtext').textContent = 'Welcome back! Please enter your details.';
  document.getElementById('loginFields').style.display = 'block';
  document.getElementById('signupFields').style.display = 'none';
  document.getElementById('switchText').innerHTML =
    'Don\'t have an account? <span onclick="switchToSignup()">Sign Up</span>';
}

// ── Login handler (CONNECTED TO BACKEND) ──
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

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password: pass })
    });

    const data = await res.json();

    // Handle status codes properly
    if (!res.ok) {
      // For 400 / 401 / 500 errors
      showError(data.message || "Login failed");
      return;
    }

    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login successful!");
    window.location.href = "index.html";

  } catch (err) {
    showError("Server error. Please try again later.");
    console.error(err);
  }
}

// ── Signup handler (CONNECTED TO BACKEND) ──
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

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ firstName: first, lastName: last, email, password: pass })
    });

    const data = await res.json();

    if (!res.ok) {
      showError(data.message || "Signup failed");
      return;
    }

    alert("Account created! Please log in.");
    switchToLogin();

  } catch (err) {
    showError("Server error. Please try again later.");
    console.error(err);
  }
}