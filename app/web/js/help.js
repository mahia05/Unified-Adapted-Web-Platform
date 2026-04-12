let currentStep = 1;

// ── Quick select buttons ──
function quickSelect(btn, type) {
  document.querySelectorAll('.quick-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const sel = document.getElementById('helpType');
  for (let i = 0; i < sel.options.length; i++) {
    if (sel.options[i].text.toLowerCase().includes(type.toLowerCase())) {
      sel.selectedIndex = i;
      break;
    }
  }
}

// ── Step navigation ──
function goStep(from, to) {
  if (to > from && !validateStep(from)) return;

  document.getElementById('step' + from).classList.remove('active');

  const dot = document.getElementById('dot' + from);
  dot.classList.remove('active');

  if (to > from) {
    dot.classList.add('done');
    dot.innerHTML = '<i class="fas fa-check" style="font-size:0.75rem"></i>';
    const line = document.getElementById('line' + from);
    if (line) line.classList.add('done');
  } else {
    // going back
    dot.classList.remove('done');
    dot.classList.add('active');
    dot.innerHTML = from;

    const dot2 = document.getElementById('dot' + to);
    dot2.classList.remove('done');
    dot2.classList.remove('active');
    dot2.innerHTML = to;

    const line = document.getElementById('line' + to);
    if (line) line.classList.remove('done');
  }

  if (to === 4) buildReview();

  document.getElementById('step' + to).classList.add('active');
  document.getElementById('dot' + to).classList.add('active');
  currentStep = to;
  window.scrollTo({ top: 300, behavior: 'smooth' });
}

// ── Validation ──
function validateStep(step) {
  let ok = true;
  const hide = id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; };
  const show = id => { const el = document.getElementById(id); if (el) el.style.display = 'block'; ok = false; };

  if (step === 1) {
    hide('nameErr'); hide('locationErr');
    if (!document.getElementById('name').value.trim()) show('nameErr');
    if (!document.getElementById('location').value.trim()) show('locationErr');
  }
  if (step === 2) {
    hide('disErr'); hide('helpTypeErr');
    if (!document.querySelector('input[name="disability"]:checked')) show('disErr');
    if (!document.getElementById('helpType').value) show('helpTypeErr');
  }
  if (step === 3) {
    hide('urgErr'); hide('descErr');
    if (!document.querySelector('input[name="urgency"]:checked')) show('urgErr');
    if (!document.getElementById('description').value.trim()) show('descErr');
  }
  return ok;
}

// ── Build review summary ──
function buildReview() {
  const dis = document.querySelector('input[name="disability"]:checked');
  const urg = document.querySelector('input[name="urgency"]:checked');
  document.getElementById('reviewBox').innerHTML = `
        <b>Name:</b> ${document.getElementById('name').value}<br>
        <b>Location:</b> ${document.getElementById('location').value}<br>
        <b>Email:</b> ${document.getElementById('email').value || '—'}<br>
        <b>Phone:</b> ${document.getElementById('phone').value || '—'}<br>
        <b>Disability:</b> ${dis ? dis.value : '—'}<br>
        <b>Support Needed:</b> ${document.getElementById('helpType').value}<br>
        <b>Urgency:</b> ${urg ? urg.value : '—'}<br>
        <b>Message:</b> ${document.getElementById('description').value}
    `;
}

// ── Submit to backend ──
async function submitForm() {
  const dis = document.querySelector('input[name="disability"]:checked');
  const urg = document.querySelector('input[name="urgency"]:checked');

  const payload = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    location: document.getElementById('location').value.trim(),
    disability: dis ? dis.value : "",
    helpType: document.getElementById('helpType').value,
    urgency: urg ? urg.value : "",
    description: document.getElementById('description').value.trim()
  };

  // Disable submit button
  const submitBtn = document.querySelector('#step4 .btn-next');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Submitting...`;
  }

  try {
    const res = await fetch("https://unified-adapted-web-platform.onrender.com/api/help", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Submission failed. Please try again.");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> Submit Request`;
      }
      return;
    }

    // Success
    document.getElementById('step4').classList.remove('active');
    document.getElementById('successState').style.display = 'block';

  } catch (err) {
    console.error("Submit error:", err);
    alert("Could not connect to server. Please try again.");
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> Submit Request`;
    }
  }
}
// ── Font size control ────────────────────────────────────────
let fontLevel = 0;

function changeFont(dir) {
  fontLevel = Math.max(-3, Math.min(3, fontLevel + dir));
  const sizes = ['12px', '13px', '14px', '16px', '18px', '20px', '22px'];
  document.body.style.fontSize = sizes[fontLevel + 3];
}

function toggleContrast() {
  document.body.classList.toggle('dark-mode');
  const btn = document.getElementById('contrastBtn');
  if (btn) btn.classList.toggle('active-contrast');
}

function resetSettings() {
  fontLevel = 0;
  document.body.style.fontSize = '16px';
  document.body.classList.remove('dark-mode');
  const btn = document.getElementById('contrastBtn');
  if (btn) btn.classList.remove('active-contrast');
}

// ── Navbar scroll effect ─────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) {
    nav.style.boxShadow = window.scrollY > 40
      ? '0 4px 30px rgba(0,0,0,0.25)'
      : '0 2px 20px rgba(0,0,0,0.15)';
  }
});

// ── Card animations ──────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.animationDelay = (i * 0.1) + 's';
      e.target.style.animation = 'fadeUp 0.6s ease both';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .stat-item').forEach(el => observer.observe(el));

// ── Inject hamburger CSS once ────────────────────────────────
(function injectHamburgerCSS() {
  if (document.getElementById('uawp-hamburger-css')) return;
  const style = document.createElement('style');
  style.id = 'uawp-hamburger-css';
  style.textContent = `
    /* ── Hamburger button ── */
    .hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      width: 42px;
      height: 42px;
      background: rgba(194,183,121,0.12);
      border: 1.5px solid rgba(194,183,121,0.28);
      border-radius: 10px;
      cursor: pointer;
      padding: 0;
      z-index: 1100;
      transition: background 0.25s, border-color 0.25s;
      flex-shrink: 0;
    }
    .hamburger:hover {
      background: rgba(194,183,121,0.22);
      border-color: rgba(194,183,121,0.5);
    }
    .hamburger span {
      display: block;
      width: 20px;
      height: 2px;
      background: #c2b779;
      border-radius: 2px;
      transition: transform 0.35s cubic-bezier(0.34,1.22,0.64,1),
                  opacity 0.25s ease,
                  width 0.3s ease;
      transform-origin: center;
    }
    .hamburger.active span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    .hamburger.active span:nth-child(2) {
      opacity: 0;
      width: 0;
    }
    .hamburger.active span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    /* ── Mobile overlay ── */
    .mobile-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(15,12,4,0.6);
      z-index: 998;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .mobile-overlay.active {
      display: block;
      opacity: 1;
    }

    /* ── Mobile nav panel ── */
    @media (max-width: 768px) {
      .hamburger { display: flex; }

      /* Hide nav links by default on mobile */
      .nav-links {
        position: fixed;
        top: 0;
        right: -100%;
        width: min(320px, 85vw);
        height: 100dvh;
        background: #2a2810;
        flex-direction: column;
        gap: 4px;
        padding: 80px 20px 40px;
        z-index: 1099;
        transition: right 0.38s cubic-bezier(0.34,1.1,0.64,1);
        box-shadow: -8px 0 40px rgba(0,0,0,0.35);
        overflow-y: auto;
        border-left: 1px solid rgba(194,183,121,0.12);
        list-style: none;
      }

      /* resource.css navbar uses display:flex on ul, homepage uses list-style reset */
      .nav-links.mobile-open {
        right: 0;
      }

      /* Each nav item full-width */
      .nav-links li { width: 100%; }

      .nav-links a {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 13px 18px !important;
        border-radius: 10px;
        font-size: 0.95rem !important;
        font-weight: 600;
        color: rgba(235,229,194,0.82) !important;
        text-decoration: none;
        transition: background 0.2s, color 0.2s;
        border: none;
        box-shadow: none;
        letter-spacing: 0.2px;
      }

      /* Remove underline pseudo-element on mobile */
      .nav-links a::after { display: none; }

      .nav-links a:hover {
        background: rgba(194,183,121,0.12);
        color: #c2b779 !important;
        transform: none !important;
      }

      .nav-links a.active {
        background: rgba(194,183,121,0.18);
        color: #c2b779 !important;
        box-shadow: none !important;
      }

      /* Mobile menu divider line at top */
      .nav-links::before {
        content: 'MENU';
        display: block;
        font-size: 0.65rem;
        font-weight: 800;
        letter-spacing: 3px;
        color: rgba(194,183,121,0.4);
        padding: 0 18px 16px;
        border-bottom: 1px solid rgba(194,183,121,0.1);
        margin-bottom: 12px;
      }

      /* Prevent body scroll when menu open */
      body.menu-open { overflow: hidden; }
    }

    /* ── Tablet adjustments ── */
    @media (max-width: 900px) and (min-width: 769px) {
      .hamburger { display: flex; }

      .nav-links {
        position: fixed;
        top: 0;
        right: -100%;
        width: 280px;
        height: 100dvh;
        background: #2a2810;
        flex-direction: column;
        gap: 4px;
        padding: 80px 20px 40px;
        z-index: 1099;
        transition: right 0.38s cubic-bezier(0.34,1.1,0.64,1);
        box-shadow: -8px 0 40px rgba(0,0,0,0.35);
        list-style: none;
      }
      .nav-links.mobile-open { right: 0; }
      .nav-links a { padding: 12px 16px !important; font-size: 0.9rem !important; }
      .nav-links a::after { display: none; }
    }
  `;
  document.head.appendChild(style);
})();

// ── Mobile hamburger menu ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  if (!navbar || !navLinks) return;

  // Create hamburger button (avoid duplicates)
  if (!navbar.querySelector('.hamburger')) {
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Open menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = `<span></span><span></span><span></span>`;
    navbar.appendChild(hamburger);

    // Create mobile overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    document.body.appendChild(overlay);

    function openMenu() {
      navLinks.classList.add('mobile-open');
      hamburger.classList.add('active');
      overlay.classList.add('active');
      document.body.classList.add('menu-open');
      hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      navLinks.classList.remove('mobile-open');
      hamburger.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', () => {
      navLinks.classList.contains('mobile-open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // ── Protect ALL links to help.html and resource.html ────────
  // This covers navbar, hero buttons, CTA banner, footer, feature cards — everywhere
  const protectedPages = ['resource.html', 'help.html'];

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    const isProtected = protectedPages.some(p => href && href.includes(p));
    if (!isProtected) return;

    // Remove any previously attached listener by cloning (safe since we run once on DOMContentLoaded)
    link.addEventListener('click', (e) => {
      const user = localStorage.getItem('user');
      if (!user) {
        e.preventDefault();
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) navLinks.classList.remove('mobile-open');
        document.body.classList.remove('menu-open');
        showLoginRequired(href);
      } else {
        e.preventDefault();
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) navLinks.classList.remove('mobile-open');
        document.body.classList.remove('menu-open');
        showWelcomeModal(href);
      }
    });
  });

  // Check if user just logged in — show welcome if coming from login
  const justLoggedIn = sessionStorage.getItem('justLoggedIn');
  if (justLoggedIn) {
    sessionStorage.removeItem('justLoggedIn');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    showWelcomeOnHomepage(user);
  }

  // Update navbar based on login state
  updateNavbarUser();
});

// ── Update navbar for logged-in user ────────────────────────
function updateNavbarUser() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;

  const userRaw = localStorage.getItem('user');
  const loginLink = navLinks.querySelector('a[href="login.html"]');
  if (!loginLink) return;

  if (userRaw) {
    const user = JSON.parse(userRaw);
    const name = user.firstName || user.email.split('@')[0];
    loginLink.innerHTML = `<i class='bx bx-user-circle' style='font-size:16px;vertical-align:-2px;margin-right:4px;'></i>${name}`;
    loginLink.href = '#';
    loginLink.onclick = (e) => {
      e.preventDefault();
      if (confirm(`Log out, ${name}?`)) {
        localStorage.removeItem('user');
        window.location.reload();
      }
    };
  }
}

// ── Login required modal ─────────────────────────────────────
function showLoginRequired(redirectTo) {
  sessionStorage.setItem('redirectAfterLogin', redirectTo);
  showModal({
    iconBg: '#FFF8EC',
    title: 'Login Required',
    message: 'Please log in or create a free account to access this page.',
    btnText: 'Go to Login',
    btnColor: '#3f3b23',
    onBtn: () => { window.location.href = 'login.html'; },
    cancelText: 'Cancel'
  });
}

// ── Welcome modal ────────────────────────────────────────────
function showWelcomeModal(redirectTo) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const name = user.firstName || user.email?.split('@')[0] || 'there';
  showModal({
    iconBg: '#EDFAF4',
    title: `Welcome back, ${name}!`,
    message: `You're all set. Taking you to your destination...`,
    btnText: 'Continue →',
    btnColor: '#157A4A',
    onBtn: () => { window.location.href = redirectTo; },
    autoClose: 2000,
    autoRedirect: redirectTo
  });
}

// ── Welcome on homepage after login ─────────────────────────
function showWelcomeOnHomepage(user) {
  const name = user.firstName || user.email?.split('@')[0] || 'there';
  showModal({
    iconBg: '#EDFAF4',
    title: `Welcome, ${name}!`,
    message: `You've successfully logged in to UAWP. Explore resources or submit a help request.`,
    btnText: 'Explore',
    btnColor: '#3f3b23',
    onBtn: () => { dismissModal(); },
    autoClose: 3500
  });
}

// ── Generic modal factory ────────────────────────────────────
let modalEl = null;

function showModal({ icon, iconBg, title, message, btnText, btnColor, onBtn, cancelText, autoClose, autoRedirect }) {
  dismissModal();

  const wrap = document.createElement('div');
  wrap.id = 'uawpModal';
  wrap.style.cssText = `
    position:fixed;inset:0;background:rgba(28,22,18,0.55);
    display:flex;align-items:center;justify-content:center;
    z-index:9999;padding:20px;backdrop-filter:blur(6px);
    animation:fadeIn 0.2s ease;
  `;

  wrap.innerHTML = `
    <style>
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes popUp{from{opacity:0;transform:scale(0.88) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
      #uawpModalCard{animation:popUp 0.28s cubic-bezier(0.34,1.4,0.64,1) both;}
    </style>
    <div id="uawpModalCard" style="
      background:#fff;border-radius:20px;padding:36px 32px;
      max-width:400px;width:100%;box-shadow:0 24px 64px rgba(28,22,18,0.22);
      text-align:center;font-family:'DM Sans',sans-serif;
    ">
      <div style="width:64px;height:64px;background:${iconBg};border-radius:18px;
                  display:flex;align-items:center;justify-content:center;
                  font-size:28px;margin:0 auto 20px;">
        ${icon || ''}
      </div>
      <div style="font-size:19px;font-weight:700;color:#1C1612;margin-bottom:10px;">${title}</div>
      <div style="font-size:14px;color:#6B5F54;line-height:1.65;margin-bottom:26px;">${message}</div>
      <button id="uawpModalBtn" style="
        width:100%;padding:13px;background:${btnColor};color:#fff;
        border:none;border-radius:10px;font-family:'DM Sans',sans-serif;
        font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;
        margin-bottom:${cancelText ? '10px' : '0'};
      ">${btnText}</button>
      ${cancelText ? `<button id="uawpCancelBtn" style="
        width:100%;padding:11px;background:transparent;color:#6B5F54;
        border:1px solid rgba(90,74,58,0.18);border-radius:10px;
        font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;
      ">${cancelText}</button>` : ''}
    </div>`;

  document.body.appendChild(wrap);
  modalEl = wrap;

  wrap.querySelector('#uawpModalBtn').addEventListener('click', () => { dismissModal(); onBtn?.(); });
  const cancelBtn = wrap.querySelector('#uawpCancelBtn');
  if (cancelBtn) cancelBtn.addEventListener('click', dismissModal);
  wrap.addEventListener('click', (e) => { if (e.target === wrap) dismissModal(); });

  if (autoClose) {
    setTimeout(() => {
      dismissModal();
      if (autoRedirect) window.location.href = autoRedirect;
    }, autoClose);
  }
}

function dismissModal() {
  if (modalEl) { modalEl.remove(); modalEl = null; }
}