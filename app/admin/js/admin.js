const API = "http://localhost:5000/api/admin";
let allData = [];
let allUsers = [];
let activeFilter = "all";
let currentTab = "requests"; // "requests" | "users"

// ── INIT ──────────────────────────────────────────────────────
async function loadRequests() {
    try {
        const res = await fetch(`${API}/requests`);
        allData = await res.json();
        updateStats();
        if (currentTab === "requests") renderTable();
    } catch (e) {
        document.getElementById("tableBody").innerHTML =
            `<tr><td colspan="8"><div class="empty-state">
            <i class="fas fa-triangle-exclamation"></i>
            <p>Could not connect to server. Make sure backend is running on port 5000.</p>
            </div></td></tr>`;
    }
}

async function loadUsers() {
    try {
        const res = await fetch(`${API}/users`);
        allUsers = await res.json();
        renderUsersTable();
    } catch (e) {
        document.getElementById("tableBody").innerHTML =
            `<tr><td colspan="6"><div class="empty-state">
            <i class="fas fa-triangle-exclamation"></i>
            <p>Could not load users.</p>
            </div></td></tr>`;
    }
}

// ── STATS ────────────────────────────────────────────────────
function updateStats() {
    document.getElementById("totalCount").textContent = allData.length;
    document.getElementById("pendingCount").textContent = allData.filter(r => r.status === "Pending").length;
    document.getElementById("reviewedCount").textContent = allData.filter(r => r.status === "Reviewed").length;
    document.getElementById("resolvedCount").textContent = allData.filter(r => r.status === "Resolved").length;
}

// ── TAB SWITCH ───────────────────────────────────────────────
function switchTab(tab) {
    currentTab = tab;

    // Update tab buttons
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelector(`[data-tab="${tab}"]`).classList.add("active");

    // Update filter pills visibility
    const filterArea = document.getElementById("filterArea");
    const usersHeader = document.getElementById("usersTableHeader");
    const requestsHeader = document.getElementById("requestsTableHeader");

    if (tab === "requests") {
        filterArea.style.display = "";
        requestsHeader.style.display = "";
        usersHeader.style.display = "none";
        renderTable();
    } else {
        filterArea.style.display = "none";
        requestsHeader.style.display = "none";
        usersHeader.style.display = "";
        loadUsers();
    }
}

// ── REQUESTS TABLE ───────────────────────────────────────────
function renderTable() {
    const search = document.getElementById("searchInput").value.toLowerCase().trim();
    let data = allData;
    if (activeFilter !== "all") data = data.filter(r => r.status === activeFilter);
    if (search) data = data.filter(r =>
        r.name.toLowerCase().includes(search) || r.email.toLowerCase().includes(search)
    );

    const tbody = document.getElementById("tableBody");
    if (!data.length) {
        tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><i class="fas fa-inbox"></i><p>No requests found.</p></div></td></tr>`;
        return;
    }

    tbody.innerHTML = data.map((r, i) => {
        const isResolved = r.status === "Resolved";
        return `
        <tr id="row-${r._id}" class="${isResolved ? 'row-resolved' : ''}">
          <td style="color:var(--text3);font-size:12px;">${i + 1}</td>
          <td>
            <div class="td-name">${r.name}</div>
            <div class="td-email">${r.email}</div>
          </td>
          <td style="white-space:nowrap;">${r.helpType}</td>
          <td><span class="badge ${r.urgency.toLowerCase()}">${r.urgency}</span></td>
          <td class="td-desc" title="${r.description}">${r.description}</td>
          <td>
            <span class="badge ${r.status.toLowerCase()}" id="badge-${r._id}">
              <span class="badge-dot"></span>${r.status}
              ${isResolved ? '<i class="fas fa-envelope-circle-check" style="margin-left:4px;font-size:10px;" title="Resolution email sent"></i>' : ''}
            </span>
          </td>
          <td class="td-date">${new Date(r.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
          <td>
            <div class="actions">
              <button class="action-btn" title="View Details" onclick="openModal('${r._id}')"><i class="fas fa-eye"></i></button>
              <button class="action-btn reviewed" title="Mark Reviewed" onclick="updateStatus('${r._id}','Reviewed')"><i class="fas fa-glasses"></i></button>
              <button class="action-btn resolved" title="Mark Resolved + Email" onclick="openResolveModal('${r._id}')"><i class="fas fa-check"></i></button>
              <button class="action-btn delete" title="Delete" onclick="deleteReq('${r._id}')"><i class="fas fa-trash-can"></i></button>
            </div>
          </td>
        </tr>`;
    }).join("");
}

// ── USERS TABLE ──────────────────────────────────────────────
function renderUsersTable() {
    const tbody = document.getElementById("tableBody");
    if (!allUsers.length) {
        tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state"><i class="fas fa-users"></i><p>No registered users yet.</p></div></td></tr>`;
        return;
    }

    tbody.innerHTML = allUsers.map((u, i) => {
        const lastLogin = u.lastLogin
            ? new Date(u.lastLogin).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })
            : '<span style="color:var(--text3)">Never</span>';
        const loginCount = u.loginHistory ? u.loginHistory.length : 0;
        const initials = ((u.firstName?.[0] || '') + (u.lastName?.[0] || '')).toUpperCase() || '?';

        return `
        <tr>
          <td style="color:var(--text3);font-size:12px;">${i + 1}</td>
          <td>
            <div style="display:flex;align-items:center;gap:10px;">
              <div class="user-avatar">${initials}</div>
              <div>
                <div class="td-name">${u.firstName || ''} ${u.lastName || ''}</div>
                <div class="td-email">${u.email}</div>
              </div>
            </div>
          </td>
          <td class="td-date">${new Date(u.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
          <td class="td-date">${lastLogin}</td>
          <td>
            <span class="badge reviewed">
              <span class="badge-dot"></span>${loginCount} login${loginCount !== 1 ? 's' : ''}
            </span>
          </td>
          <td>
            <div class="actions">
              <button class="action-btn" title="View Login History" onclick="openUserModal('${u._id}')"><i class="fas fa-eye"></i></button>
              <button class="action-btn delete" title="Delete User" onclick="deleteUser('${u._id}')"><i class="fas fa-trash-can"></i></button>
            </div>
          </td>
        </tr>`;
    }).join("");
}

// ── FILTER ───────────────────────────────────────────────────
function setFilter(f, btn) {
    activeFilter = f;
    document.querySelectorAll(".pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTable();
}

// ── STATUS UPDATE ────────────────────────────────────────────
async function updateStatus(id, status) {
    try {
        await fetch(`${API}/requests/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        });
        allData = allData.map(r => r._id === id ? { ...r, status } : r);
        updateStats();
        renderTable();
        showToast(`Marked as ${status}`, "success");
    } catch (e) { showToast("Update failed", "error"); }
}

// ── RESOLVE MODAL (with admin note + email) ──────────────────
function openResolveModal(id) {
    const r = allData.find(x => x._id === id);
    if (!r) return;

    document.getElementById("resolveModalName").textContent = r.name;
    document.getElementById("resolveModalEmail").textContent = r.email;
    document.getElementById("resolveNote").value = "";
    document.getElementById("resolveModalId").value = id;
    document.getElementById("resolveModal").classList.add("open");
}

function closeResolveModal() {
    document.getElementById("resolveModal").classList.remove("open");
}

async function confirmResolve() {
    const id = document.getElementById("resolveModalId").value;
    const adminNote = document.getElementById("resolveNote").value.trim();

    try {
        await fetch(`${API}/requests/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Resolved", adminNote })
        });
        allData = allData.map(r => r._id === id ? { ...r, status: "Resolved", adminNote } : r);
        updateStats();
        renderTable();
        closeResolveModal();
        showToast("Resolved & email sent to user ✉️", "success");
    } catch (e) { showToast("Resolve failed", "error"); }
}

document.getElementById("resolveModal").addEventListener("click", function (e) {
    if (e.target === this) closeResolveModal();
});

// ── DELETE REQUEST ───────────────────────────────────────────
async function deleteReq(id) {
    if (!confirm("Delete this request permanently?")) return;
    try {
        await fetch(`${API}/requests/${id}`, { method: "DELETE" });
        allData = allData.filter(r => r._id !== id);
        updateStats();
        renderTable();
        showToast("Request deleted", "success");
    } catch (e) { showToast("Delete failed", "error"); }
}

// ── DELETE USER ──────────────────────────────────────────────
async function deleteUser(id) {
    if (!confirm("Delete this user permanently?")) return;
    try {
        await fetch(`${API}/users/${id}`, { method: "DELETE" });
        allUsers = allUsers.filter(u => u._id !== id);
        renderUsersTable();
        showToast("User deleted", "success");
    } catch (e) { showToast("Delete failed", "error"); }
}

// ── REQUEST DETAIL MODAL ─────────────────────────────────────
function openModal(id) {
    const r = allData.find(x => x._id === id);
    if (!r) return;

    const isResolved = r.status === "Resolved";

    document.getElementById("modalName").textContent = r.name;
    document.getElementById("modalDate").textContent =
        "Submitted " + new Date(r.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });

    document.getElementById("detailModal").className = `modal-overlay open ${isResolved ? 'modal-resolved' : ''}`;

    document.getElementById("modalBody").innerHTML = `
    ${isResolved ? `<div class="resolved-banner"><i class="fas fa-circle-check"></i> This request has been resolved. Resolution email was sent to the user.</div>` : ''}
    <div class="modal-row"><span class="modal-lbl">Email</span><span class="modal-val">${r.email}</span></div>
    <div class="modal-row"><span class="modal-lbl">Phone</span><span class="modal-val">${r.phone || '—'}</span></div>
    <div class="modal-row"><span class="modal-lbl">Help Type</span><span class="modal-val">${r.helpType}</span></div>
    <div class="modal-row"><span class="modal-lbl">Urgency</span><span class="modal-val"><span class="badge ${r.urgency.toLowerCase()}">${r.urgency}</span></span></div>
    <div class="modal-row"><span class="modal-lbl">Status</span><span class="modal-val"><span class="badge ${r.status.toLowerCase()}"><span class="badge-dot"></span>${r.status}</span></span></div>
    <div class="modal-row"><span class="modal-lbl">Description</span><span class="modal-val" style="line-height:1.6">${r.description}</span></div>
    ${r.adminNote ? `<div class="modal-row"><span class="modal-lbl">Admin Note</span><span class="modal-val" style="color:var(--resolved-text);font-weight:500;">${r.adminNote}</span></div>` : ''}`;

    document.getElementById("detailModal").classList.add("open");
}

function closeModal() {
    document.getElementById("detailModal").classList.remove("open");
    document.getElementById("detailModal").className = "modal-overlay";
}

document.getElementById("detailModal").addEventListener("click", function (e) {
    if (e.target === this) closeModal();
});

// ── USER DETAIL MODAL ────────────────────────────────────────
function openUserModal(id) {
    const u = allUsers.find(x => x._id === id);
    if (!u) return;

    document.getElementById("modalName").textContent = `${u.firstName || ''} ${u.lastName || ''}`;
    document.getElementById("modalDate").textContent = "Registered " +
        new Date(u.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });

    const history = u.loginHistory && u.loginHistory.length
        ? u.loginHistory.map((h, i) => `
            <div class="modal-row">
              <span class="modal-lbl">${i === 0 ? 'Latest' : `Login ${i + 1}`}</span>
              <span class="modal-val" style="font-size:12.5px;">
                ${new Date(h.loginAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
                <span style="color:var(--text3);font-size:11px;margin-left:6px;">${(h.device || '').substring(0, 60)}...</span>
              </span>
            </div>`).join("")
        : `<div class="modal-row"><span class="modal-lbl">History</span><span class="modal-val" style="color:var(--text3)">No login history</span></div>`;

    document.getElementById("modalBody").innerHTML = `
    <div class="modal-row"><span class="modal-lbl">Email</span><span class="modal-val">${u.email}</span></div>
    <div class="modal-row"><span class="modal-lbl">Last Login</span><span class="modal-val">${u.lastLogin ? new Date(u.lastLogin).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : 'Never'}</span></div>
    <div class="modal-row"><span class="modal-lbl">Total Logins</span><span class="modal-val">${(u.loginHistory || []).length}</span></div>
    <div style="margin-top:12px;font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:1px;padding:0 0 6px;">Login History</div>
    ${history}`;

    document.getElementById("detailModal").classList.add("open");
}

// ── TOAST ────────────────────────────────────────────────────
function showToast(msg, type = "success") {
    const t = document.getElementById("toast");
    t.innerHTML = `<i class="fas fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'}"></i> ${msg}`;
    t.className = `toast ${type} show`;
    setTimeout(() => { t.classList.remove("show"); }, 2800);
}

// ── START ────────────────────────────────────────────────────
loadRequests();