// ── Login Protection ─────────────────────────────────────────
(function checkLogin() {
  const user = localStorage.getItem('user');
  if (!user) {
    sessionStorage.setItem('redirectAfterLogin', 'help.html');
    window.location.href = 'login.html';
  } else {
    const u = JSON.parse(user);
    const name = u.firstName || u.email?.split('@')[0] || 'there';
    const wrap = document.createElement('div');
    wrap.id = 'welcomeModal';
    wrap.style.cssText = `position:fixed;inset:0;background:rgba(28,22,18,0.55);
            display:flex;align-items:center;justify-content:center;z-index:9999;
            backdrop-filter:blur(6px);font-family:'Poppins',sans-serif;`;
    wrap.innerHTML = `
        <div style="background:#fff;border-radius:20px;padding:36px 32px;max-width:380px;
                    width:90%;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,0.2);
                    animation:popUp 0.3s cubic-bezier(0.34,1.4,0.64,1) both;">
            
            <div style="font-size:20px;font-weight:700;color:#26190C;margin-bottom:8px;">
                Welcome, ${name}!
            </div>
            <div style="font-size:14px;color:#685A46;line-height:1.6;">
                Taking you to the help form...
            </div>
        </div>
        <style>@keyframes popUp{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}</style>`;
    document.body.appendChild(wrap);
    setTimeout(() => wrap.remove(), 2000);
  }
})();
//<div style="font-size:48px;margin-bottom:12px;">👋</div>
document.getElementById("helpForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const inputs = this.querySelectorAll("input, select, textarea");
  const [nameEl, emailEl, helpTypeEl, urgencyEl, descEl, phoneEl] = inputs;

  const payload = {
    name: nameEl.value.trim(),
    email: emailEl.value.trim(),
    helpType: helpTypeEl.value,
    urgency: urgencyEl.value,
    description: descEl.value.trim(),
    phone: phoneEl.value.trim()
  };

  if (!payload.name || !payload.email || !payload.helpType || !payload.urgency || !payload.description) {
    alert("⚠️ Please fill all required fields.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/help", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Help request submitted successfully!");
      this.reset();
    } else {
      alert("❌ " + data.message);
    }
  } catch (err) {
    alert("❌ Could not connect to server. Make sure backend is running.");
  }
});