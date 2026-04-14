const API = "https://unified-adapted-web-platform.onrender.com/api/admin";
const STORY_API = "https://unified-adapted-web-platform.onrender.com/api/admin/stories";
const RESOURCE_API = "https://unified-adapted-web-platform.onrender.com/api/admin/resources";

let allData = [];
let allUsers = [];
let allStories = [];
let allResources = [];
let activeFilter = "all";
let activeStoryFilter = "all";
let currentTab = "requests";

// ── JSON check helper ───
function isJson(res) {
    const ct = res.headers.get("content-type") || "";
    return ct.includes("application/json");
}

// ── Generic fetch with retry (for POST/PATCH/DELETE) ─────────
async function fetchWithRetry(url, options = {}, maxAttempts = 4) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            if (attempt > 1) {
                await new Promise(r => setTimeout(r, 5000));
            }
            const res = await fetch(url, options);
            if (!isJson(res)) {
                if (attempt === maxAttempts) throw new Error("Server is waking up. Please try again in 30 seconds.");
                continue;
            }
            return res;
        } catch (err) {
            if (attempt === maxAttempts) throw err;
        }
    }
}

// ── INIT ──
async function loadRequests() {
    try {
        const res = await fetch(`${API}/requests`);
        if (!isJson(res)) {
            document.getElementById("tableBody").innerHTML =
                `<tr><td colspan="8"><div class="empty-state">
                <i class="fas fa-triangle-exclamation"></i>
                <p>Server is waking up. Please refresh in 30 seconds.</p>
                </div></td></tr>`;
            return;
        }
        allData = await res.json();
        updateStats();
        if (currentTab === "requests") renderTable();
    } catch (e) {
        document.getElementById("tableBody").innerHTML =
            `<tr><td colspan="8"><div class="empty-state">
            <i class="fas fa-triangle-exclamation"></i>
            <p>Could not connect to server.</p>
            </div></td></tr>`;
    }
}

async function loadUsers() {
    try {
        const res = await fetch(`${API}/users`);
        if (!isJson(res)) {
            document.getElementById("tableBody").innerHTML =
                `<tr><td colspan="6"><div class="empty-state"><i class="fas fa-triangle-exclamation"></i><p>Server waking up. Refresh in 30s.</p></div></td></tr>`;
            return;
        }
        allUsers = await res.json();
        renderUsersTable();
    } catch (e) {
        document.getElementById("tableBody").innerHTML =
            `<tr><td colspan="6"><div class="empty-state"><i class="fas fa-triangle-exclamation"></i><p>Could not load users.</p></div></td></tr>`;
    }
}

async function loadStories() {
    try {
        const res = await fetch(STORY_API);
        if (!isJson(res)) {
            document.getElementById("tableBody").innerHTML =
                `<tr><td colspan="7"><div class="empty-state"><i class="fas fa-triangle-exclamation"></i><p>Server waking up. Refresh in 30s.</p></div></td></tr>`;
            return;
        }
        allStories = await res.json();
        renderStoriesTable();
    } catch (e) {
        document.getElementById("tableBody").innerHTML =
            `<tr><td colspan="7"><div class="empty-state"><i class="fas fa-triangle-exclamation"></i><p>Could not load stories.</p></div></td></tr>`;
    }
}

async function loadResources() {
    try {
        const res = await fetch(RESOURCE_API);
        if (!isJson(res)) {
            document.getElementById("tableBody").innerHTML =
                `<tr><td colspan="7"><div class="empty-state"><i class="fas fa-triangle-exclamation"></i><p>Server waking up. Refresh in 30s.</p></div></td></tr>`;
            return;
        }
        allResources = await res.json();
        renderResourcesTable();
    } catch (e) {
        document.getElementById("tableBody").innerHTML =
            `<tr><td colspan="7"><div class="empty-state"><i class="fas fa-triangle-exclamation"></i><p>Could not load resources.</p></div></td></tr>`;
    }
}

// ── STATS ────
function updateStats() {
    document.getElementById("totalCount").textContent = allData.length;
    document.getElementById("pendingCount").textContent = allData.filter(r => r.status === "Pending").length;
    document.getElementById("reviewedCount").textContent = allData.filter(r => r.status === "Reviewed").length;
    document.getElementById("resolvedCount").textContent = allData.filter(r => r.status === "Resolved").length;
}

// ── TAB SWITCH ─────
function switchTab(tab) {
    currentTab = tab;

    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelector(`[data-tab="${tab}"]`).classList.add("active");

    const filterArea = document.getElementById("filterArea");
    const storyFilterArea = document.getElementById("storyFilterArea");
    const addStoryBtn = document.getElementById("addStoryBtn");
    const addResourceBtn = document.getElementById("addResourceBtn");
    const requestsHeader = document.getElementById("requestsTableHeader");
    const usersHeader = document.getElementById("usersTableHeader");
    const storiesHeader = document.getElementById("storiesTableHeader");
    const resourcesHeader = document.getElementById("resourcesTableHeader");
    const searchRow = document.getElementById("searchRowEl");

    [filterArea, storyFilterArea, addStoryBtn, addResourceBtn,
        requestsHeader, usersHeader, storiesHeader, resourcesHeader].forEach(el => {
            if (el) el.style.display = "none";
        });

    if (tab === "requests") {
        filterArea.style.display = "";
        requestsHeader.style.display = "";
        searchRow.style.display = "";
        document.getElementById("tableTitle").textContent = "All Help Requests";
        renderTable();
    } else if (tab === "users") {
        usersHeader.style.display = "";
        searchRow.style.display = "";
        document.getElementById("tableTitle").textContent = "Registered Users";
        loadUsers();
    } else if (tab === "stories") {
        storyFilterArea.style.display = "";
        addStoryBtn.style.display = "flex";
        storiesHeader.style.display = "";
        searchRow.style.display = "none";
        document.getElementById("tableTitle").textContent = "Success Stories";
        loadStories();
    } else if (tab === "resources") {
        addResourceBtn.style.display = "flex";
        resourcesHeader.style.display = "";
        searchRow.style.display = "none";
        document.getElementById("tableTitle").textContent = "Resources";
        loadResources();
    }
}

// ── REQUESTS TABLE ────
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
              <button class="action-btn resolved" title="Resolve & Send Email" onclick="openResolveModal('${r._id}')"><i class="fas fa-check"></i></button>
              <button class="action-btn delete" title="Delete" onclick="deleteReq('${r._id}')"><i class="fas fa-trash-can"></i></button>
            </div>
          </td>
        </tr>`;
    }).join("");
}

// ── USERS TABLE ───
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
          <td><span class="badge reviewed"><span class="badge-dot"></span>${loginCount} login${loginCount !== 1 ? 's' : ''}</span></td>
          <td>
            <div class="actions">
              <button class="action-btn" title="View Login History" onclick="openUserModal('${u._id}')"><i class="fas fa-eye"></i></button>
              <button class="action-btn delete" title="Delete User" onclick="deleteUser('${u._id}')"><i class="fas fa-trash-can"></i></button>
            </div>
          </td>
        </tr>`;
    }).join("");
}

// ── STORIES TABLE ──
function renderStoriesTable() {
    const tbody = document.getElementById("tableBody");
    let data = allStories;
    if (activeStoryFilter !== "all") data = data.filter(s => s.status === activeStoryFilter);

    if (!data.length) {
        tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><i class="fas fa-book-open"></i><p>No stories found.</p></div></td></tr>`;
        return;
    }
    tbody.innerHTML = data.map((s, i) => {
        const statusClass = s.status.toLowerCase();
        const sourceIcon = s.source === "admin"
            ? `<i class="fas fa-shield-halved" title="Admin added" style="color:var(--gold);margin-left:5px;font-size:10px;"></i>`
            : `<i class="fas fa-user" title="User submitted" style="color:var(--text3);margin-left:5px;font-size:10px;"></i>`;
        return `
        <tr>
          <td style="color:var(--text3);font-size:12px;">${i + 1}</td>
          <td><div class="td-name">${s.name} ${sourceIcon}</div></td>
          <td class="td-desc" title="${s.title}" style="max-width:200px;">${s.title}</td>
          <td><span class="badge" style="background:var(--gold-dim);color:var(--gold);border-color:var(--border2);font-size:11px;">${s.category}</span></td>
          <td><span class="badge ${statusClass}"><span class="badge-dot"></span>${s.status}</span></td>
          <td class="td-date">${new Date(s.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
          <td>
            <div class="actions">
              <button class="action-btn" title="Preview" onclick="previewStory('${s._id}')"><i class="fas fa-eye"></i></button>
              ${s.status !== "Approved"
                ? `<button class="action-btn resolved" title="Approve & Publish" onclick="changeStoryStatus('${s._id}','Approved')"><i class="fas fa-check"></i></button>`
                : ""}
              ${s.status !== "Rejected"
                ? `<button class="action-btn delete" title="Reject" onclick="changeStoryStatus('${s._id}','Rejected')"><i class="fas fa-xmark"></i></button>`
                : ""}
              <button class="action-btn delete" title="Delete permanently" onclick="deleteStoryAdmin('${s._id}')"><i class="fas fa-trash-can"></i></button>
            </div>
          </td>
        </tr>`;
    }).join("");
}

// ── RESOURCES TABLE ───
function renderResourcesTable() {
    const tbody = document.getElementById("tableBody");
    if (!allResources.length) {
        tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><i class="fas fa-folder-open"></i><p>No resources found. Add your first resource!</p></div></td></tr>`;
        return;
    }
    tbody.innerHTML = allResources.map((r, i) => `
        <tr>
          <td style="color:var(--text3);font-size:12px;">${i + 1}</td>
          <td><div class="td-name">${r.name}</div></td>
          <td><span class="badge" style="background:var(--gold-dim);color:var(--gold);border-color:var(--border2);font-size:11px;">${r.category}</span></td>
          <td style="font-size:12px;color:var(--text2);">${r.disabilityType || "—"}</td>
          <td class="td-date">${r.city ? r.city + ", " : ""}${r.country}</td>
          <td style="font-size:12px;color:var(--text2);">${r.phone || "—"}</td>
          <td>
            <div class="actions">
              <button class="action-btn" title="View Details" onclick="previewResource('${r._id}')"><i class="fas fa-eye"></i></button>
              <button class="action-btn delete" title="Delete Resource" onclick="deleteResourceAdmin('${r._id}')"><i class="fas fa-trash-can"></i></button>
            </div>
          </td>
        </tr>`).join("");
}

// ── RESOURCE PREVIEW MODAL ────
function previewResource(id) {
    const r = allResources.find(x => x._id === id);
    if (!r) return;

    document.getElementById("modalName").textContent = r.name;
    document.getElementById("modalDate").textContent = `Added ${new Date(r.createdAt).toLocaleDateString('en-GB', { dateStyle: 'medium' })}`;

    document.getElementById("modalBody").innerHTML = `
        <div class="modal-row"><span class="modal-lbl">Category</span><span class="modal-val">${r.category}</span></div>
        <div class="modal-row"><span class="modal-lbl">Disability</span><span class="modal-val">${r.disabilityType || "—"}</span></div>
        <div class="modal-row"><span class="modal-lbl">Country</span><span class="modal-val">${r.country}</span></div>
        ${r.city ? `<div class="modal-row"><span class="modal-lbl">City</span><span class="modal-val">${r.city}</span></div>` : ""}
        ${r.address ? `<div class="modal-row"><span class="modal-lbl">Address</span><span class="modal-val">${r.address}</span></div>` : ""}
        ${r.phone ? `<div class="modal-row"><span class="modal-lbl">Phone</span><span class="modal-val">${r.phone}</span></div>` : ""}
        ${r.email ? `<div class="modal-row"><span class="modal-lbl">Email</span><span class="modal-val">${r.email}</span></div>` : ""}
        ${r.website ? `<div class="modal-row"><span class="modal-lbl">Website</span><span class="modal-val"><a href="${r.website}" target="_blank" style="color:var(--reviewed-text);">${r.website}</a></span></div>` : ""}
        ${r.description ? `<div class="modal-row"><span class="modal-lbl">Description</span><span class="modal-val" style="line-height:1.65;">${r.description}</span></div>` : ""}`;

    document.getElementById("detailModal").classList.add("open");
}

// ── DELETE RESOURCE ───
async function deleteResourceAdmin(id) {
    if (!confirm("Delete this resource permanently?")) return;
    try {
        const res = await fetchWithRetry(`${RESOURCE_API}/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        allResources = allResources.filter(r => r._id !== id);
        renderResourcesTable();
        showToast("Resource deleted", "success");
    } catch (e) { showToast(e.message || "Delete failed", "error"); }
}

// ── ADD RESOURCE MODAL ────
function openAddResourceModal() {
    document.getElementById("addResourceModal").classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeAddResourceModal() {
    document.getElementById("addResourceModal").classList.remove("open");
    document.body.style.overflow = "";
    ["arName", "arDescription", "arDisability", "arCountry", "arCity", "arPhone", "arEmail", "arWebsite", "arAddress"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });
    const catEl = document.getElementById("arCategory");
    if (catEl) catEl.value = "";
    ["arNameErr", "arCategoryErr", "arCountryErr"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
}

document.getElementById("addResourceModal").addEventListener("click", function (e) {
    if (e.target === this) closeAddResourceModal();
});

async function submitAdminResource() {
    const name = document.getElementById("arName").value.trim();
    const category = document.getElementById("arCategory").value;
    const country = document.getElementById("arCountry").value.trim();
    const description = document.getElementById("arDescription").value.trim();
    const disabilityType = document.getElementById("arDisability").value.trim();
    const city = document.getElementById("arCity").value.trim();
    const phone = document.getElementById("arPhone").value.trim();
    const email = document.getElementById("arEmail").value.trim();
    const website = document.getElementById("arWebsite").value.trim();
    const address = document.getElementById("arAddress").value.trim();

    const show = id => { const el = document.getElementById(id); if (el) el.style.display = "block"; };
    const hide = id => { const el = document.getElementById(id); if (el) el.style.display = "none"; };
    ["arNameErr", "arCategoryErr", "arCountryErr"].forEach(hide);

    let ok = true;
    if (!name) { show("arNameErr"); ok = false; }
    if (!category) { show("arCategoryErr"); ok = false; }
    if (!country) { show("arCountryErr"); ok = false; }
    if (!ok) return;

    const btn = document.getElementById("arSubmitBtn");
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Adding…`;

    try {
        const res = await fetchWithRetry(RESOURCE_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name, category, country, description,
                disabilityType: disabilityType || "All Disabilities",
                city, phone, email, website, address
            })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        closeAddResourceModal();
        await loadResources();
        showToast("Resource added successfully ✓", "success");
    } catch (e) {
        showToast(e.message || "Failed to add resource", "error");
    }

    btn.disabled = false;
    btn.innerHTML = `<i class="fas fa-floppy-disk"></i> Save Resource`;
}

// ── STORY FILTER ──────
function setStoryFilter(f, btn) {
    activeStoryFilter = f;
    document.querySelectorAll("#storyFilterArea .pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderStoriesTable();
}

async function changeStoryStatus(id, status) {
    try {
        const res = await fetchWithRetry(`${STORY_API}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        allStories = allStories.map(s => s._id === id ? { ...s, status } : s);
        renderStoriesTable();
        showToast(`Story ${status} ✓`, "success");
    } catch (e) { showToast(e.message || "Update failed", "error"); }
}

async function deleteStoryAdmin(id) {
    if (!confirm("Delete this story permanently?")) return;
    try {
        const res = await fetchWithRetry(`${STORY_API}/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        allStories = allStories.filter(s => s._id !== id);
        renderStoriesTable();
        showToast("Story deleted", "success");
    } catch (e) { showToast(e.message || "Delete failed", "error"); }
}

function previewStory(id) {
    const s = allStories.find(x => x._id === id);
    if (!s) return;

    const statusColors = {
        Approved: "var(--resolved-text)",
        Pending: "var(--pending-text)",
        Rejected: "var(--danger-text)"
    };

    document.getElementById("modalName").textContent = s.name;
    document.getElementById("modalDate").textContent =
        `Submitted ${new Date(s.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}`;

    document.getElementById("modalBody").innerHTML = `
        <div class="modal-row"><span class="modal-lbl">Title</span><span class="modal-val" style="font-weight:600;">${s.title}</span></div>
        <div class="modal-row"><span class="modal-lbl">Category</span><span class="modal-val">${s.category}</span></div>
        <div class="modal-row"><span class="modal-lbl">Source</span><span class="modal-val">${s.source === "admin" ? "🛡️ Admin added" : "👤 User submitted"}</span></div>
        <div class="modal-row"><span class="modal-lbl">Status</span><span class="modal-val" style="color:${statusColors[s.status]};font-weight:600;">${s.status}</span></div>
        <div class="modal-row"><span class="modal-lbl">Hearts</span><span class="modal-val">${s.hearts || 0}</span></div>
        <div class="modal-row"><span class="modal-lbl">Story</span><span class="modal-val" style="line-height:1.75;white-space:pre-wrap;">${s.body}</span></div>
        ${s.status === "Pending" ? `
        <div style="display:flex;gap:10px;margin-top:20px;">
          <button onclick="changeStoryStatus('${s._id}','Approved');closeModal();"
            style="flex:1;padding:10px;background:rgba(52,201,123,0.15);color:var(--resolved-text);
            border:1px solid var(--resolved-bdr);border-radius:8px;
            font-family:'Plus Jakarta Sans',sans-serif;font-weight:600;cursor:pointer;font-size:13px;">
            ✅ Approve & Publish
          </button>
          <button onclick="changeStoryStatus('${s._id}','Rejected');closeModal();"
            style="flex:1;padding:10px;background:rgba(248,113,113,0.15);color:var(--danger-text);
            border:1px solid var(--danger-bdr);border-radius:8px;
            font-family:'Plus Jakarta Sans',sans-serif;font-weight:600;cursor:pointer;font-size:13px;">
            ❌ Reject
          </button>
        </div>` : ""}`;

    document.getElementById("detailModal").classList.add("open");
}

// ── ADD STORY MODAL ───
function openAddStoryModal() {
    document.getElementById("addStoryModal").classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeAddStoryModal() {
    document.getElementById("addStoryModal").classList.remove("open");
    document.body.style.overflow = "";
    ["asName", "asTitle", "asBody"].forEach(id => document.getElementById(id).value = "");
    document.getElementById("asCat").value = "";
    ["asNameErr", "asTitleErr", "asCatErr", "asBodyErr"].forEach(id =>
        document.getElementById(id).style.display = "none"
    );
}

async function submitAdminStory() {
    const name = document.getElementById("asName").value.trim();
    const title = document.getElementById("asTitle").value.trim();
    const cat = document.getElementById("asCat").value;
    const body = document.getElementById("asBody").value.trim();

    const show = id => { document.getElementById(id).style.display = "block"; };
    const hide = id => { document.getElementById(id).style.display = "none"; };
    ["asNameErr", "asTitleErr", "asCatErr", "asBodyErr"].forEach(hide);

    let ok = true;
    if (!name) { show("asNameErr"); ok = false; }
    if (!title) { show("asTitleErr"); ok = false; }
    if (!cat) { show("asCatErr"); ok = false; }
    if (!body) { show("asBodyErr"); ok = false; }
    if (!ok) return;

    const btn = document.getElementById("asSubmitBtn");
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Publishing…`;

    try {
        const res = await fetchWithRetry(STORY_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, title, category: cat, body })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        closeAddStoryModal();
        await loadStories();
        showToast("Story published successfully ✓", "success");
    } catch (e) {
        showToast(e.message || "Failed to add story", "error");
    }

    btn.disabled = false;
    btn.innerHTML = `<i class="fas fa-paper-plane"></i> Publish Story`;
}

document.getElementById("addStoryModal").addEventListener("click", function (e) {
    if (e.target === this) closeAddStoryModal();
});

// ── FILTER ────────
function setFilter(f, btn) {
    activeFilter = f;
    document.querySelectorAll("#filterArea .pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTable();
}

// ── UPDATE STATUS (Mark Reviewed) ───
async function updateStatus(id, status) {
    try {
        const res = await fetchWithRetry(`${API}/requests/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        allData = allData.map(r => r._id === id ? { ...r, status } : r);
        updateStats();
        renderTable();
        showToast(`Marked as ${status}`, "success");
    } catch (e) { showToast(e.message || "Update failed", "error"); }
}

// ── RESOLVE MODAL ──
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

    const btn = document.querySelector(".btn-resolve");
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Connecting…`;

    try {
        // fetchWithRetry handles server sleep — retries 4 times with 5s gap
        const res = await fetchWithRetry(`${API}/requests/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Resolved", adminNote })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        allData = allData.map(r => r._id === id ? { ...r, status: "Resolved", adminNote } : r);
        updateStats();
        renderTable();
        closeResolveModal();
        showToast("Resolved ✓ Resolution email sent to user ✉️", "success");
    } catch (e) {
        showToast(e.message || "Resolve failed. Please try again.", "error");
    }

    btn.disabled = false;
    btn.innerHTML = `<i class="fas fa-paper-plane"></i> Resolve & Send Email`;
}

document.getElementById("resolveModal").addEventListener("click", function (e) {
    if (e.target === this) closeResolveModal();
});

// ── DELETE REQUEST ───
async function deleteReq(id) {
    if (!confirm("Delete this request permanently?")) return;
    try {
        const res = await fetchWithRetry(`${API}/requests/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        allData = allData.filter(r => r._id !== id);
        updateStats();
        renderTable();
        showToast("Request deleted", "success");
    } catch (e) { showToast(e.message || "Delete failed", "error"); }
}

// ── DELETE USER ───
async function deleteUser(id) {
    if (!confirm("Delete this user permanently?")) return;
    try {
        const res = await fetchWithRetry(`${API}/users/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        allUsers = allUsers.filter(u => u._id !== id);
        renderUsersTable();
        showToast("User deleted", "success");
    } catch (e) { showToast(e.message || "Delete failed", "error"); }
}

// ── REQUEST DETAIL MODAL ─
function openModal(id) {
    const r = allData.find(x => x._id === id);
    if (!r) return;
    const isResolved = r.status === "Resolved";
    document.getElementById("modalName").textContent = r.name;
    document.getElementById("modalDate").textContent =
        "Submitted " + new Date(r.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
    document.getElementById("detailModal").className = `modal-overlay open ${isResolved ? 'modal-resolved' : ''}`;
    document.getElementById("modalBody").innerHTML = `
    ${isResolved ? `<div class="resolved-banner"><i class="fas fa-circle-check"></i> Resolved — Resolution email was sent to the user.</div>` : ''}
    <div class="modal-row"><span class="modal-lbl">Email</span><span class="modal-val">${r.email}</span></div>
    <div class="modal-row"><span class="modal-lbl">Phone</span><span class="modal-val">${r.phone || '—'}</span></div>
    <div class="modal-row"><span class="modal-lbl">Location</span><span class="modal-val">${r.location || '—'}</span></div>
    <div class="modal-row"><span class="modal-lbl">Help Type</span><span class="modal-val">${r.helpType}</span></div>
    <div class="modal-row"><span class="modal-lbl">Disability</span><span class="modal-val">${r.disability || '—'}</span></div>
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

// ── USER DETAIL MODAL ───
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

// ── TOAST ──
function showToast(msg, type = "success") {
    const t = document.getElementById("toast");
    t.innerHTML = `<i class="fas fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'}"></i> ${msg}`;
    t.className = `toast ${type} show`;
    setTimeout(() => { t.classList.remove("show"); }, 3500);
}

// ── START ──
loadRequests();