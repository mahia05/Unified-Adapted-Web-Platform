(function adminAuthGuard() {
    const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours
    const auth = sessionStorage.getItem('adminAuth');
    const authTime = parseInt(sessionStorage.getItem('adminAuthTime') || '0');

    const isValid = auth === 'true' && (Date.now() - authTime) < SESSION_DURATION;

    if (!isValid) {
        // Clear any stale session
        sessionStorage.removeItem('adminAuth');
        sessionStorage.removeItem('adminAuthTime');
        // Redirect to admin login
        window.location.replace('login.html');
    }
})();

// ── Logout function (call from dashboard logout button if needed) ──
function adminLogout() {
    sessionStorage.removeItem('adminAuth');
    sessionStorage.removeItem('adminAuthTime');
    window.location.href = 'login.html';
}