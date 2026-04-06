const API = "http://localhost:5000/api/admin";
let allData = [];
let activeFilter = "all";

async function loadRequests() {
    try {
        const res = await fetch(`${API}/requests`);
        allData = await res.json();
        updateStats();
        renderTable();
    } catch (e) {
        document.getElementById("tableBody").innerHTML =
            `<tr><td colspan="8"><div class="empty-state">
        <i class="fas fa-triangle-exclamation"></i>
        <p>Could not connect to server. Make sure backend is running on port 5000.</p>
      </div></td></tr>`;
    }
}

function updateStats() {
    document.getElementById("totalCount").textContent = allData.length;
    document.getElementById("pendingCount").textContent = allData.filter(r => r.status === "Pending").length;
    document.getElementById("reviewedCount").textContent = allData.filter(r => r.status === "Reviewed").length;
    document.getElementById("resolvedCount").textContent = allData.filter(r => r.status === "Resolved").length;
}

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

    tbody.innerHTML = data.map((r, i) => `
    <tr id="row-${r._id}">
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
        </span>
      </td>
      <td class="td-date">${new Date(r.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
      <td>
        <div class="actions">
          <button class="action-btn" title="View Details" onclick="openModal('${r._id}')"><i class="fas fa-eye"></i></button>
          <button class="action-btn reviewed" title="Mark Reviewed" onclick="updateStatus('${r._id}','Reviewed')"><i class="fas fa-glasses"></i></button>
          <button class="action-btn resolved" title="Mark Resolved" onclick="updateStatus('${r._id}','Resolved')"><i class="fas fa-check"></i></button>
          <button class="action-btn delete" title="Delete" onclick="deleteReq('${r._id}')"><i class="fas fa-trash-can"></i></button>
        </div>
      </td>
    </tr>`).join("");
}

function setFilter(f, btn) {
    activeFilter = f;
    document.querySelectorAll(".pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTable();
}

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

function openModal(id) {
    const r = allData.find(x => x._id === id);
    if (!r) return;
    document.getElementById("modalName").textContent = r.name;
    document.getElementById("modalDate").textContent =
        "Submitted " + new Date(r.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
    document.getElementById("modalBody").innerHTML = `
    <div class="modal-row"><span class="modal-lbl">Email</span><span class="modal-val">${r.email}</span></div>
    <div class="modal-row"><span class="modal-lbl">Phone</span><span class="modal-val">${r.phone || '—'}</span></div>
    <div class="modal-row"><span class="modal-lbl">Help Type</span><span class="modal-val">${r.helpType}</span></div>
    <div class="modal-row"><span class="modal-lbl">Urgency</span><span class="modal-val"><span class="badge ${r.urgency.toLowerCase()}">${r.urgency}</span></span></div>
    <div class="modal-row"><span class="modal-lbl">Status</span><span class="modal-val"><span class="badge ${r.status.toLowerCase()}"><span class="badge-dot"></span>${r.status}</span></span></div>
    <div class="modal-row"><span class="modal-lbl">Description</span><span class="modal-val" style="line-height:1.6">${r.description}</span></div>`;
    document.getElementById("detailModal").classList.add("open");
}

function closeModal() {
    document.getElementById("detailModal").classList.remove("open");
}

document.getElementById("detailModal").addEventListener("click", function (e) {
    if (e.target === this) closeModal();
});

function showToast(msg, type = "success") {
    const t = document.getElementById("toast");
    t.innerHTML = `<i class="fas fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'}"></i> ${msg}`;
    t.className = `toast ${type} show`;
    setTimeout(() => { t.classList.remove("show"); }, 2800);
}

loadRequests();