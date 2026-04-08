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

// ── Mobile hamburger menu ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  if (!navbar || !navLinks) return;

  // Create hamburger button
  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger';
  hamburger.setAttribute('aria-label', 'Open menu');
  hamburger.innerHTML = `<span></span><span></span><span></span>`;
  navbar.appendChild(hamburger);

  // Create mobile overlay
  const overlay = document.createElement('div');
  overlay.className = 'mobile-overlay';
  document.body.appendChild(overlay);

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-open');
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  overlay.addEventListener('click', () => {
    navLinks.classList.remove('mobile-open');
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close menu on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Login protection for resource.html and help.html
      const protectedPages = ['resource.html', 'help.html'];
      const isProtected = protectedPages.some(p => href && href.includes(p));

      if (isProtected) {
        const user = localStorage.getItem('user');
        if (!user) {
          e.preventDefault();
          showLoginRequired(href);
          return;
        } else {
          // Show welcome modal briefly then navigate
          e.preventDefault();
          showWelcomeModal(href);
          return;
        }
      }

      navLinks.classList.remove('mobile-open');
      hamburger.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Also protect desktop nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const protectedPages = ['resource.html', 'help.html'];
      const isProtected = protectedPages.some(p => href && href.includes(p));

      if (isProtected) {
        const user = localStorage.getItem('user');
        if (!user) {
          e.preventDefault();
          showLoginRequired(href);
        } else {
          e.preventDefault();
          showWelcomeModal(href);
        }
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
    loginLink.innerHTML = `<i class='bx bx-user-circle' style='font-size:16px;vertical-align:-2px;'></i> ${name}`;
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
  // Store intended destination
  sessionStorage.setItem('redirectAfterLogin', redirectTo);
  showModal({
    //icon: '🔒',
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
    //icon: '👋',
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
    //icon: '🎉',
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
            ${icon}
        </div>
        <div style="font-family:'Syne',sans-serif;font-size:19px;font-weight:700;
                    color:#1C1612;margin-bottom:10px;">${title}</div>
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