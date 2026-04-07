let fontLevel = 0;
 
    function changeFont(dir) {
      fontLevel = Math.max(-3, Math.min(3, fontLevel + dir));
      const sizes = ['12px','13px','14px','16px','18px','20px','22px'];
      document.body.style.fontSize = sizes[fontLevel + 3];
    }
 
    function toggleContrast() {
      document.body.classList.toggle('dark-mode');
      const btn = document.getElementById('contrastBtn');
      btn.classList.toggle('active-contrast');
    }
 
    function resetSettings() {
      fontLevel = 0;
      document.body.style.fontSize = '16px';
      document.body.classList.remove('dark-mode');
      document.getElementById('contrastBtn').classList.remove('active-contrast');
    }
 
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('.navbar');
      nav.style.boxShadow = window.scrollY > 40
        ? '0 4px 30px rgba(0,0,0,0.25)'
        : '0 2px 20px rgba(0,0,0,0.15)';
    });
 
    // Intersection observer for card animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.animationDelay = (i * 0.1) + 's';
          e.target.style.animation = 'fadeUp 0.6s ease both';
        }
      });
    }, { threshold: 0.1 });
 
    document.querySelectorAll('.feature-card, .stat-item').forEach(el => observer.observe(el));

    /*login signup*/

window.onload = function () {
  document.getElementById('authModal').style.display = 'flex';
}

function showTab(tab) {
  // Forms toggle
  document.getElementById('loginTab').style.display = 
    tab === 'login' ? 'block' : 'none';
  document.getElementById('signupTab').style.display = 
    tab === 'signup' ? 'block' : 'none';

  // Tab button active state
  document.querySelectorAll('.tab-btn').forEach((btn, i) => {
    btn.classList.toggle('active', 
      (tab === 'login' && i === 0) || (tab === 'signup' && i === 1));
  });
}

function closeModal() {
  document.getElementById('authModal').style.display = 'none';
}