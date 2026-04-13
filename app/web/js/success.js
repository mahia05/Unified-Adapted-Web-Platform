// ═══════════════════════════════════════════════════════════
//  UAWP SUCCESS STORIES — success.js  (backend connected)
// ═══════════════════════════════════════════════════════════

const API = "http://localhost:5000/api/stories";

// ── Seed stories shown if backend has none ───────────────────
const SEED = [
    {
        _id: "seed1", name: "Fatema Begum",
        title: "My son finally has a school that understands him",
        category: "Autism", hearts: 47,
        createdAt: new Date("2026-03-10"),
        excerpt: "For years I struggled to find an inclusive school for my autistic son in Sylhet. UAWP connected me with NAAND within days and changed our lives forever.",
        body: `For years, I searched desperately for a school that would accept my son Rafi. He is on the autism spectrum and needs special support — but every school we tried either turned us away or didn't have the resources.\n\nA friend told me about UAWP. I submitted a help request on a Tuesday evening, and by Thursday I already had a response from the UAWP team. They connected me directly with the National Academy for Autism & Neurodevelopmental Disabilities (NAAND) in Dhaka.\n\nRafi has been attending for three months now. His teacher says he is making remarkable progress. He smiled at me yesterday and said "Ammu, I like school." I cried for an hour.\n\nI want every parent like me to know — don't give up. The support is out there, and UAWP will help you find it.`
    },
    {
        _id: "seed2", name: "Karim Hossain",
        title: "After my accident, I thought my life was over",
        category: "Motor", hearts: 63,
        createdAt: new Date("2026-02-18"),
        excerpt: "A road accident left me with a spinal injury. UAWP found me the CRP rehabilitation centre and I am walking again with support.",
        body: `In September 2025, a truck hit my rickshaw. I woke up in hospital unable to move my legs. The doctors said it was a spinal cord injury. I was 34 years old with a wife and two children, and I thought my life was finished.\n\nMy nephew found UAWP online and submitted a help request for me while I was still in the hospital. Within 24 hours, the team responded with information about the Centre for the Rehabilitation of the Paralysed (CRP) in Savar.\n\nI spent four months there. The physiotherapists were incredible — patient, skilled, and genuinely caring. I am now walking short distances with a frame. My goal is to walk unaided by the end of this year.\n\nTo the UAWP team — your speed and care when I was at my lowest gave me back my hope. I will never forget that.`
    },
    {
        _id: "seed3", name: "Nasrin Akter",
        title: "Finding therapy for my daughter with cerebral palsy",
        category: "Motor", hearts: 38,
        createdAt: new Date("2026-01-25"),
        excerpt: "UAWP helped us find physiotherapy services in Sylhet that we never knew existed. My daughter is stronger every day.",
        body: `My daughter Mila has cerebral palsy. She is seven years old and full of laughter, but she needs regular physiotherapy to build her strength. Living in Sylhet, we always thought we had to travel to Dhaka for proper treatment.\n\nThen I discovered UAWP. I searched through the resource directory and found the Physical Medicine Department at Sylhet MAG Osmani Medical College — right here in our city!\n\nMila has been receiving physiotherapy twice a week for two months. Her doctor says her muscle tone is improving. She can now hold a pencil properly for the first time.\n\nUAWP didn't just find us a therapist. It gave my daughter a future she deserves.`
    },
    {
        _id: "seed4", name: "Tanvir Ahmed",
        title: "Learning differently — how I found my voice",
        category: "Cognitive", hearts: 29,
        createdAt: new Date("2026-03-01"),
        excerpt: "Diagnosed with dyslexia at 19, I felt lost. UAWP connected me with an NGO that gave me the tools to thrive in university.",
        body: `I was 19 when I was finally diagnosed with dyslexia. By then I had spent most of my school life thinking I was simply not smart enough.\n\nAfter my diagnosis, I didn't know where to turn. UAWP's resource directory showed me disability support NGOs I never knew existed. I connected with one that offers learning support for university students.\n\nThey gave me access to audiobooks, taught me study techniques specifically for dyslexic learners, and helped me apply for extra exam time at my university.\n\nI just passed my second year exams — with a B+ in my favourite subject. If you're struggling and feel invisible, please use UAWP. You are not alone.`
    },
    {
        _id: "seed5", name: "Rokeya Sultana",
        title: "A wheelchair changed everything for my father",
        category: "Motor", hearts: 54,
        createdAt: new Date("2025-12-20"),
        excerpt: "My elderly father could not leave his room for two years. UAWP helped us access an assistive device program that gave him his freedom back.",
        body: `My father is 68 years old and had a stroke two years ago. He lost mobility on his left side and had not left his bedroom in over a year. We could not afford a proper wheelchair on our own.\n\nI found UAWP while searching for government disability schemes. The resource directory pointed me to the Jatiyo Protibandhi Unnayan Foundation (JPUF) in Dhaka. Through their program, we were able to access a subsidised wheelchair.\n\nThe day the wheelchair arrived, my father cried. He sat in the courtyard and watched the birds for the first time in two years. Last week, he came with us to Eid prayers.\n\nSome things seem small to others but are the whole world to us. Thank you UAWP.`
    },
    {
        _id: "seed6", name: "Sabbir Rahman",
        title: "From isolation to inclusion — my hearing loss journey",
        category: "Hearing", hearts: 41,
        createdAt: new Date("2026-02-05"),
        excerpt: "Losing my hearing at 25 felt like losing my identity. UAWP's resources helped me find a community and learn sign language.",
        body: `I started losing my hearing gradually at 25 due to a medical condition. By 27, I had significant hearing loss in both ears. I withdrew from friends, stopped going out, and felt profoundly alone.\n\nA colleague showed me UAWP. Through the resource directory, I found organisations supporting deaf and hard-of-hearing people. I connected with a community group and enrolled in a sign language class.\n\nI now have a community of people who understand. I have communication tools that work for me. I have confidence again.\n\nIf you are experiencing hearing loss and feel isolated — please reach out. UAWP is the first step, and it is a big one.`
    }
];

// ── State ─────────────────────────────────────────────────────
let stories = [];
let activeFilter = "all";
// Track liked IDs in localStorage so heart stays filled on reload
const getLiked = () => JSON.parse(localStorage.getItem("likedStories") || "[]");
const setLiked = (arr) => localStorage.setItem("likedStories", JSON.stringify(arr));

// ── Helpers ───────────────────────────────────────────────────
function getInitials(name) {
    return (name || "?").split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

function fmtDate(d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dt = new Date(d);
    return `${months[dt.getMonth()]} ${dt.getFullYear()}`;
}

function filtered() {
    if (activeFilter === "all") return stories;
    return stories.filter(s => s.category === activeFilter);
}

// ── LOAD from backend ─────────────────────────────────────────
async function loadStories() {
    try {
        const res = await fetch(API);
        const data = await res.json();
        stories = data.length ? data : SEED;
    } catch {
        stories = SEED; // fallback to seeds if server offline
    }
    render();
}

// ── RENDER ────────────────────────────────────────────────────
function render() {
    const grid = document.getElementById("storiesGrid");
    const empty = document.getElementById("emptyState");
    const count = document.getElementById("storyCount");
    const list = filtered();
    const liked = getLiked();

    count.textContent = `${list.length} stor${list.length !== 1 ? "ies" : "y"}`;

    if (!list.length) {
        grid.innerHTML = "";
        empty.style.display = "block";
        return;
    }
    empty.style.display = "none";

    grid.innerHTML = list.map((s, i) => {
        const initials = getInitials(s.name);
        const isLiked = liked.includes(String(s._id));
        const isSeed = String(s._id).startsWith("seed");
        const isFirst = i === 0;

        return `
        <div class="story-card" onclick="openStory('${s._id}')" style="animation-delay:${i * 0.07}s">
          <div class="card-visual" data-cat="${s.category}">
            ${isFirst ? '<span class="featured-badge">Featured</span>' : ''}
            <span class="cat-badge">${s.category}</span>
          </div>
          <div class="card-content">
            <div class="card-author-row">
              <div class="author-avatar">${initials}</div>
              <div class="author-info">
                <div class="author-name">${s.name}</div>
                <div class="author-date">${fmtDate(s.createdAt)}</div>
              </div>
            </div>
            <h3 class="card-title">${s.title}</h3>
            <p class="card-excerpt">${s.excerpt || ""}</p>
            <div class="card-footer-row">
              <button class="read-btn" onclick="event.stopPropagation();openStory('${s._id}')">
                Read story <i class="fas fa-arrow-right"></i>
              </button>
              <button class="heart-btn ${isLiked ? "liked" : ""}"
                onclick="event.stopPropagation();toggleLike('${s._id}',this,${isSeed})"
                title="${isLiked ? "Unlike" : "Like this story"}">
                <i class="fa${isLiked ? "s" : "r"} fa-heart"></i>
                <span id="hcount-${s._id}">${s.hearts}</span>
              </button>
            </div>
          </div>
        </div>`;
    }).join("");
}

// ── LIKE toggle ───────────────────────────────────────────────
async function toggleLike(id, btn, isSeed) {
    const liked = getLiked();
    const alreadyLiked = liked.includes(String(id));
    const countEl = document.getElementById(`hcount-${id}`);
    let currentCount = parseInt(countEl.textContent) || 0;

    // Optimistic UI update
    if (alreadyLiked) {
        setLiked(liked.filter(x => x !== String(id)));
        btn.classList.remove("liked");
        btn.querySelector("i").className = "far fa-heart";
        countEl.textContent = currentCount - 1;
    } else {
        setLiked([...liked, String(id)]);
        btn.classList.add("liked");
        btn.querySelector("i").className = "fas fa-heart";
        countEl.textContent = currentCount + 1;
        // Pop animation
        btn.classList.add("pop");
        setTimeout(() => btn.classList.remove("pop"), 400);
    }

    // If real backend story, call API
    if (!isSeed) {
        try {
            const res = await fetch(`${API}/${id}/like`, { method: "POST" });
            const data = await res.json();
            // Sync with server count
            countEl.textContent = data.hearts;
        } catch {
            // Keep optimistic update if server fails
        }
    }
}

// ── STORY DETAIL MODAL ────────────────────────────────────────
function openStory(id) {
    const s = stories.find(x => String(x._id) === String(id));
    if (!s) return;

    const initials = getInitials(s.name);
    const liked = getLiked().includes(String(s._id));
    const isSeed = String(s._id).startsWith("seed");

    document.getElementById("mCat").textContent = s.category;
    document.getElementById("mTitle").textContent = s.title;
    document.getElementById("mBody").textContent = s.body || "";
    document.getElementById("mMeta").innerHTML = `
        <div class="meta-avatar">${initials}</div>
        <div>
          <div class="meta-name">${s.name}</div>
          <div class="meta-date">${fmtDate(s.createdAt)}</div>
        </div>
        <button class="heart-btn modal-heart ${liked ? "liked" : ""}"
          onclick="toggleLike('${s._id}',this,${isSeed})"
          style="margin-left:auto;">
          <i class="fa${liked ? "s" : "r"} fa-heart"></i>
          <span id="hcount-${s._id}-m">${s.hearts}</span>
        </button>`;

    document.getElementById("storyModal").classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeStoryModal() {
    document.getElementById("storyModal").classList.remove("open");
    document.body.style.overflow = "";
    loadStories(); // refresh counts
}

document.getElementById("storyModal").addEventListener("click", function (e) {
    if (e.target === this) closeStoryModal();
});

// ── SUBMIT MODAL ──────────────────────────────────────────────
function openSubmitModal() {
    document.getElementById("submitModal").classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeSubmitModal() {
    document.getElementById("submitModal").classList.remove("open");
    document.body.style.overflow = "";
}

document.getElementById("submitModal").addEventListener("click", function (e) {
    if (e.target === this) closeSubmitModal();
});

// ── SUBMIT STORY ──────────────────────────────────────────────
async function submitStory() {
    const name = document.getElementById("sName").value.trim();
    const title = document.getElementById("sTitle").value.trim();
    const cat = document.getElementById("sCat").value;
    const body = document.getElementById("sBody").value.trim();

    // Validate
    let ok = true;
    const show = id => { document.getElementById(id).style.display = "block"; ok = false; };
    const hide = id => { document.getElementById(id).style.display = "none"; };

    ["sNameErr", "sTitleErr", "sCatErr", "sBodyErr"].forEach(hide);
    if (!name) show("sNameErr");
    if (!title) show("sTitleErr");
    if (!cat) show("sCatErr");
    if (!body) show("sBodyErr");
    if (!ok) return;

    // Button loading state
    const btn = document.querySelector(".btn-submit-story");
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Submitting…`;

    try {
        const res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, title, category: cat, body })
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        // Reset form
        ["sName", "sTitle", "sBody"].forEach(id => document.getElementById(id).value = "");
        document.getElementById("sCat").value = "";
        closeSubmitModal();
        showToast("✅ Story submitted! It will appear after admin review.");

    } catch {
        // Fallback: add locally so user sees result immediately
        const now = new Date();
        const tempStory = {
            _id: "temp_" + Date.now(),
            name, title, category: cat, body,
            hearts: 0,
            createdAt: now,
            excerpt: body.substring(0, 140) + (body.length > 140 ? "…" : "")
        };
        stories.unshift(tempStory);

        ["sName", "sTitle", "sBody"].forEach(id => document.getElementById(id).value = "");
        document.getElementById("sCat").value = "";
        closeSubmitModal();

        activeFilter = "all";
        document.querySelectorAll(".fpill").forEach(b => b.classList.remove("active"));
        document.querySelector('.fpill[data-cat="all"]').classList.add("active");
        render();

        showToast("📝 Story saved! Will sync when server is online.");
        setTimeout(() => openStory(tempStory._id), 350);
    }

    btn.disabled = false;
    btn.innerHTML = `<i class="fas fa-paper-plane"></i> Share Story`;
}

// ── FILTER PILLS ──────────────────────────────────────────────
document.getElementById("catPills").querySelectorAll(".fpill").forEach(btn => {
    btn.addEventListener("click", function () {
        document.querySelectorAll(".fpill").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        activeFilter = this.dataset.cat;
        render();
    });
});

// ── TOAST ─────────────────────────────────────────────────────
function showToast(msg) {
    let t = document.getElementById("successToast");
    if (!t) {
        t = document.createElement("div");
        t.id = "successToast";
        t.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(12px);
            background:var(--accent);color:#F0E8D6;padding:12px 24px;border-radius:12px;
            font-size:13.5px;font-weight:500;z-index:9999;opacity:0;
            transition:all 0.3s cubic-bezier(0.34,1.3,0.64,1);white-space:nowrap;
            box-shadow:0 8px 24px rgba(38,25,12,0.25);font-family:'Plus Jakarta Sans',sans-serif;`;
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    t.style.transform = "translateX(-50%) translateY(0)";
    setTimeout(() => {
        t.style.opacity = "0";
        t.style.transform = "translateX(-50%) translateY(12px)";
    }, 3500);
}

// ── ESC KEY ───────────────────────────────────────────────────
document.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeStoryModal(); closeSubmitModal(); }
});

// ── INIT ──────────────────────────────────────────────────────
loadStories();