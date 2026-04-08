// ── Login Protection ─────────────────────────────────────────
(function checkLogin() {
    const user = localStorage.getItem('user');
    if (!user) {
        sessionStorage.setItem('redirectAfterLogin', 'resource.html');
        window.location.href = 'login.html';
    } else {
        // Show welcome modal briefly
        const u = JSON.parse(user);
        const name = u.firstName || u.email?.split('@')[0] || 'there';
        const wrap = document.createElement('div');
        wrap.id = 'welcomeModal';
        wrap.style.cssText = `position:fixed;inset:0;background:rgba(28,22,18,0.55);
            display:flex;align-items:center;justify-content:center;z-index:9999;
            backdrop-filter:blur(6px);font-family:'Plus Jakarta Sans',sans-serif;`;
        wrap.innerHTML = `
        <div style="background:#fff;border-radius:20px;padding:36px 32px;max-width:380px;
                    width:90%;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,0.2);
                    animation:popUp 0.3s cubic-bezier(0.34,1.4,0.64,1) both;">
            
            <div style="font-size:20px;font-weight:700;color:#26190C;margin-bottom:8px;">
                Welcome, ${name}!
            </div>
            <div style="font-size:14px;color:#685A46;line-height:1.6;">
                Loading resources for you...
            </div>
        </div>
        <style>@keyframes popUp{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}</style>`;
        document.body.appendChild(wrap);
        setTimeout(() => wrap.remove(), 2000);
    }
})();
//<div style="font-size:48px;margin-bottom:12px;">👋</div>
// ─── DATA ────────────────────────────────────────────────────────────────────
const resources = [
    // BANGLADESH
    { name: "National Institute of Traumatology & Orthopaedic Rehabilitation (NITOR)", category: "Hospital", disabilityType: "Motor", country: "Bangladesh", city: "Dhaka", phone: "+880-2-9665048", website: "https://nitor.gov.bd", address: "Sher-E-Bangla Nagar, Dhaka-1207", description: "Bangladesh's premier government hospital for orthopaedic and motor disability treatment, prosthetics, and post-surgical rehabilitation." },
    { name: "Centre for the Rehabilitation of the Paralysed (CRP)", category: "Therapy", disabilityType: "Motor", country: "Bangladesh", city: "Savar, Dhaka", phone: "+880-2-7791312", email: "info@crp-bangladesh.org", website: "https://crp-bangladesh.org", address: "Chapain, Savar, Dhaka-1343", description: "Internationally recognized rehabilitation centre offering physiotherapy, occupational therapy, and community-based support for physically disabled individuals." },
    { name: "National Academy for Autism & Neurodevelopmental Disabilities (NAAND)", category: "School", disabilityType: "Cognitive", country: "Bangladesh", city: "Dhaka", phone: "+880-2-9671003", website: "https://naand.gov.bd", address: "Mirpur-14, Dhaka-1206", description: "Government academy providing specialized education and therapeutic services for children with autism and other neurodevelopmental conditions." },
    { name: "Jatiyo Protibandhi Unnayan Foundation (JPUF)", category: "Government", disabilityType: "Both", country: "Bangladesh", city: "Dhaka", phone: "+880-2-9130869", website: "https://jpuf.gov.bd", address: "Mirpur-14, Dhaka-1206", description: "National government foundation overseeing disability welfare, allowance programs, disability ID cards, and rehabilitation services across Bangladesh." },
    { name: "Society for the Welfare of Intellectually Disabled Bangladesh (SWID)", category: "NGO", disabilityType: "Cognitive", country: "Bangladesh", city: "Dhaka", phone: "+880-2-9884830", email: "swidbd@gmail.com", address: "House 9, Road 3A, Dhanmondi, Dhaka-1205", description: "Non-profit providing education, therapy, and vocational training for children and adults with intellectual and cognitive disabilities." },
    { name: "Protibandhi Unnayan Sangstha (PUS)", category: "NGO", disabilityType: "Both", country: "Bangladesh", city: "Dhaka", phone: "+880-2-8117051", email: "pus@pusbd.org", address: "House 7, Road 4, Dhanmondi, Dhaka-1205", description: "NGO providing education, vocational training, and community support for persons with motor and cognitive disabilities across Bangladesh." },
    { name: "Sylhet MAG Osmani Medical College — Physical Medicine Dept.", category: "Hospital", disabilityType: "Motor", country: "Bangladesh", city: "Sylhet", phone: "+880-821-716476", website: "https://somc.gov.bd", address: "Osmani Medical College Road, Sylhet-3100", description: "Major public hospital in Sylhet with a dedicated physical medicine and rehabilitation department for motor disability patients." },

    // INDIA
    { name: "NIMHANS — National Institute of Mental Health & Neurosciences", category: "Hospital", disabilityType: "Cognitive", country: "India", city: "Bengaluru", phone: "+91-80-46110007", email: "nimhans@nimhans.ac.in", website: "https://nimhans.ac.in", address: "Hosur Road, Bengaluru-560029", description: "India's top institute for neurology, psychiatry, and cognitive disability care, offering advanced diagnostics, therapy, and world-class research." },
    { name: "Enable India", category: "NGO", disabilityType: "Both", country: "India", city: "Bengaluru", phone: "+91-80-25282136", email: "connect@enableindia.org", website: "https://enableindia.org", address: "Indiranagar, Bengaluru-560038", description: "Empowers persons with disabilities through sustainable livelihood programs, skill training, and accessible education across India." },
    { name: "AADI — Action for Ability Development & Inclusion", category: "School", disabilityType: "Both", country: "India", city: "New Delhi", phone: "+91-11-26104823", website: "https://aadi.ac.in", address: "Pamposh Enclave, New Delhi-110048", description: "School and therapy centre offering inclusive education and rehabilitation services for children with multiple disabilities." },
    { name: "Spastics Society of India (The Able Foundation)", category: "Therapy", disabilityType: "Motor", country: "India", city: "Mumbai", phone: "+91-22-26366529", website: "https://theablefoundation.in", address: "Bandra (W), Mumbai-400050", description: "Provides physiotherapy, occupational therapy, and community rehabilitation for individuals with cerebral palsy and other motor disabilities." },
    { name: "Asha Kiran — Delhi Govt. Home for Disabled", category: "Government", disabilityType: "Cognitive", country: "India", city: "New Delhi", phone: "+91-11-22117851", address: "Rohini Sector 1, New Delhi-110085", description: "Delhi government's residential facility providing care, education, and vocational training for persons with intellectual disabilities." },

    // USA
    { name: "Shirley Ryan AbilityLab", category: "Therapy", disabilityType: "Motor", country: "USA", city: "Chicago, IL", phone: "+1-312-238-1000", website: "https://sralab.org", address: "355 E Erie St, Chicago, IL 60611", description: "World-leading motor rehabilitation research and therapy facility using cutting-edge technology for stroke, spinal injury, and neurological recovery." },
    { name: "Kennedy Krieger Institute", category: "Hospital", disabilityType: "Cognitive", country: "USA", city: "Baltimore, MD", phone: "+1-443-923-9200", website: "https://kennedykrieger.org", address: "707 N Broadway, Baltimore, MD 21205", description: "Internationally recognized for diagnosing and treating cognitive, neurodevelopmental, and learning disabilities in children and adolescents." },
    { name: "Easter Seals", category: "NGO", disabilityType: "Both", country: "USA", city: "Chicago, IL", phone: "+1-800-221-6827", website: "https://easterseals.com", address: "141 W Jackson Blvd, Chicago, IL 60604", description: "Provides comprehensive services including therapy, employment support, and inclusive childcare for people with all types of disabilities nationwide." },
    { name: "United Cerebral Palsy (UCP)", category: "NGO", disabilityType: "Motor", country: "USA", city: "Washington, DC", phone: "+1-202-776-0406", website: "https://ucp.org", address: "1825 K St NW, Washington, DC 20006", description: "National network providing motor rehabilitation, assistive technology, housing, and advocacy for people with cerebral palsy and similar conditions." },
    { name: "VSA — Kennedy Center Arts & Disability", category: "Government", disabilityType: "Cognitive", country: "USA", city: "Washington, DC", phone: "+1-202-467-4600", website: "https://kennedy-center.org/education/vsa", address: "2700 F St NW, Washington, DC 20566", description: "Provides arts education and employment programs for people with cognitive and developmental disabilities, with chapters across all 50 states." },

    // UK
    { name: "The National Hospital for Neurology and Neurosurgery", category: "Hospital", disabilityType: "Both", country: "UK", city: "London", phone: "+44-20-3456-7890", website: "https://uclh.nhs.uk", address: "Queen Square, London WC1N 3BG", description: "The UK's leading specialist hospital for neurological conditions affecting both motor and cognitive function, part of University College London Hospitals NHS." },
    { name: "Scope UK", category: "NGO", disabilityType: "Motor", country: "UK", city: "London", phone: "+44-808-800-3333", website: "https://scope.org.uk", address: "6 Market Road, London N7 9PW", description: "National charity providing support, information, and advocacy for disabled people and their families, focused on equality for people with motor disabilities." },
    { name: "Ambitious About Autism", category: "NGO", disabilityType: "Cognitive", country: "UK", city: "London", phone: "+44-20-8815-5444", website: "https://ambitiousaboutautism.org.uk", address: "Woodside Avenue, London N10 3JA", description: "National charity running specialist schools, campaigning for rights, and supporting autistic children and young people across the UK." },
    { name: "TreeHouse School — Ambitious About Autism", category: "School", disabilityType: "Cognitive", country: "UK", city: "London", phone: "+44-20-8815-5424", website: "https://ambitiousaboutautism.org.uk/treehouse-school", address: "Woodside Avenue, Muswell Hill, London N10 3JA", description: "Specialist school for autistic pupils aged 3–19, offering a tailored curriculum with speech and language therapy integrated into daily school life." },

    // CANADA
    { name: "Holland Bloorview Kids Rehabilitation Hospital", category: "Hospital", disabilityType: "Both", country: "Canada", city: "Toronto, ON", phone: "+1-416-425-6220", website: "https://hollandbloorview.ca", address: "150 Kilgour Road, Toronto, ON M4G 1R8", description: "Canada's largest pediatric rehabilitation hospital, specializing in childhood disability, brain injury, cerebral palsy, and family support services." },
    { name: "March of Dimes Canada", category: "NGO", disabilityType: "Motor", country: "Canada", city: "Toronto, ON", phone: "+1-800-263-3463", website: "https://marchofdimes.ca", address: "10 Overlea Blvd, Toronto, ON M4H 1A4", description: "Supporting independence for Canadians with physical disabilities through attendant services, accessible housing, employment, and advocacy." },
    { name: "Autism Canada", category: "NGO", disabilityType: "Cognitive", country: "Canada", city: "National", phone: "+1-800-983-1795", website: "https://autismcanada.org", address: "P.O. Box 65, Bothwell, ON N0P 1C0", description: "National organization connecting families and individuals with autism to resources, research, and support services across all Canadian provinces." },
    { name: "Sunny Hill Health Centre — BC Children's Hospital", category: "Therapy", disabilityType: "Both", country: "Canada", city: "Vancouver, BC", phone: "+1-604-453-8300", website: "https://bcchildrens.ca", address: "4500 Oak St, Vancouver, BC V6H 3N1", description: "Provides rehabilitation therapy including physiotherapy, occupational therapy, and speech therapy for children with complex developmental disabilities." },

    // AUSTRALIA
    { name: "Cerebral Palsy Alliance", category: "Therapy", disabilityType: "Motor", country: "Australia", city: "Sydney, NSW", phone: "+61-1800-654-013", website: "https://cerebralpalsy.org.au", address: "166 Hawkesbury Road, Westmead, NSW 2145", description: "Australia's largest non-government provider of disability services, therapy, and research for people with cerebral palsy and similar motor disabilities." },
    { name: "Autism Spectrum Australia (Aspect)", category: "NGO", disabilityType: "Cognitive", country: "Australia", city: "Sydney, NSW", phone: "+61-1800-277-328", website: "https://autismspectrum.org.au", address: "14 Aquatic Drive, Frenchs Forest, NSW 2086", description: "Australia's largest autism-specific service provider, offering education, therapy, behaviour support, and employment programs across the country." },
    { name: "Royal Rehab", category: "Hospital", disabilityType: "Motor", country: "Australia", city: "Sydney, NSW", phone: "+61-2-9808-9200", website: "https://royalrehab.com.au", address: "235 Morrison Road, Ryde, NSW 2112", description: "Leading rehabilitation hospital providing specialist services for spinal cord injury, brain injury, stroke, and complex motor disability recovery." },
    { name: "NDIS — National Disability Insurance Scheme", category: "Government", disabilityType: "Both", country: "Australia", city: "National", phone: "+61-1800-800-110", website: "https://ndis.gov.au", address: "GPO Box 700, Canberra, ACT 2601", description: "Australia's national scheme providing funding for support and services to Australians with permanent and significant motor, cognitive, or other disabilities." },

    // GERMANY
    { name: "Lebenshilfe Germany", category: "NGO", disabilityType: "Cognitive", country: "Germany", city: "Berlin", phone: "+49-30-206411-0", website: "https://lebenshilfe.de", address: "Raiffeisenstraße 18, 10367 Berlin", description: "Germany's largest organization for people with intellectual and cognitive disabilities, offering education, residential care, and community integration services." },
    { name: "BDH Bundesverband Rehabilitation", category: "Therapy", disabilityType: "Motor", country: "Germany", city: "Bonn", phone: "+49-228-26950", website: "https://bdh-reha.de", address: "Weberstraße 2-4, 53113 Bonn", description: "National association operating neurological rehabilitation centres across Germany, specializing in motor disability recovery after stroke and brain injury." },
    { name: "Charité — Neurological Rehabilitation Centre", category: "Hospital", disabilityType: "Both", country: "Germany", city: "Berlin", phone: "+49-30-450-560-222", website: "https://charite.de", address: "Charitéplatz 1, 10117 Berlin", description: "One of Europe's largest university hospitals, offering world-class neurological rehabilitation for motor and cognitive disabilities." },
    { name: "Aktion Mensch", category: "NGO", disabilityType: "Both", country: "Germany", city: "Bonn", phone: "+49-228-2092-0", website: "https://aktion-mensch.de", address: "Heinemannstraße 36, 53175 Bonn", description: "Germany's largest private disability organization, funding inclusion projects and providing resources for people with physical and cognitive disabilities." },
];

// ─── ICONS & CLASSES ─────────────────────────────────────────────────────────
const catIcons = {
    Hospital: "fa-hospital",
    NGO: "fa-hands-holding-child",
    Therapy: "fa-heart-pulse",
    School: "fa-graduation-cap",
    Government: "fa-landmark"
};
const catBadgeClass = {
    Hospital: "badge-hospital", NGO: "badge-ngo", Therapy: "badge-therapy",
    School: "badge-school", Government: "badge-government"
};
const disBadgeClass = { Motor: "badge-motor", Cognitive: "badge-cognitive", Both: "badge-both" };

// ─── STATE ────────────────────────────────────────────────────────────────────
let activeCountry = "all", activeDis = "all", activeCat = "all", searchVal = "";

// ─── RENDER ───────────────────────────────────────────────────────────────────
function renderCards() {
    const grid = document.getElementById("cardGrid");
    const count = document.getElementById("resultCount");

    const filtered = resources.filter(r => {
        const matchC = activeCountry === "all" || r.country === activeCountry;
        const matchD = activeDis === "all" || r.disabilityType === activeDis;
        const matchCat = activeCat === "all" || r.category === activeCat;
        const matchS = searchVal === "" ||
            r.name.toLowerCase().includes(searchVal) ||
            (r.city && r.city.toLowerCase().includes(searchVal));
        return matchC && matchD && matchCat && matchS;
    });

    count.textContent = `${filtered.length} resource${filtered.length !== 1 ? "s" : ""} found`;

    if (!filtered.length) {
        grid.innerHTML = `<div class="no-results"><i class="fas fa-magnifying-glass"></i><p>No resources found. Try adjusting your filters.</p></div>`;
        return;
    }

    grid.innerHTML = filtered.map(r => {
        const idx = resources.indexOf(r);
        const desc = r.description.length > 95 ? r.description.substring(0, 95) + "…" : r.description;
        return `
        <div class="resource-card" data-cat="${r.category}" onclick="openModal(${idx})">
            <div class="card-strip"></div>
            <div class="card-body">
                <div class="card-top">
                    <div class="card-icon"><i class="fas ${catIcons[r.category] || 'fa-circle'}"></i></div>
                    <div class="card-badges">
                        <span class="badge ${catBadgeClass[r.category] || ''}">${r.category}</span>
                        <span class="badge ${disBadgeClass[r.disabilityType] || ''}">${r.disabilityType}</span>
                    </div>
                </div>
                <h3>${r.name}</h3>
                <p>${desc}</p>
                <div class="card-footer">
                    <span class="location-tag"><i class="fas fa-location-dot"></i>${r.city ? r.city + ", " : ""}${r.country}</span>
                    <button class="view-btn" onclick="event.stopPropagation();openModal(${idx})">Details <i class="fas fa-arrow-right"></i></button>
                </div>
            </div>
        </div>`;
    }).join("");
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
// Icon colors per category for modal strip
const catStripColors = {
    Hospital: "linear-gradient(90deg,#2563A8,#60A5FA)",
    NGO: "linear-gradient(90deg,#B45309,#FBBF24)",
    Therapy: "linear-gradient(90deg,#0E7A50,#34D399)",
    School: "linear-gradient(90deg,#6D28D9,#A78BFA)",
    Government: "linear-gradient(90deg,#B91C1C,#F87171)"
};
const catIconStyle = {
    Hospital: "background:#DBEAFE;color:#2563A8;",
    NGO: "background:#FEF3C7;color:#B45309;",
    Therapy: "background:#D1FAE5;color:#0E7A50;",
    School: "background:#EDE9FE;color:#6D28D9;",
    Government: "background:#FEE2E2;color:#B91C1C;"
};

function openModal(idx) {
    const r = resources[idx];
    const strip = document.getElementById("mTopStrip") || (() => {
        const el = document.createElement("div");
        el.id = "mTopStrip";
        el.className = "modal-top-strip";
        document.querySelector(".modal-content").prepend(el);
        return el;
    })();

    // Strip color
    document.querySelector(".modal-top-strip").style.background = catStripColors[r.category] || "#ccc";

    // Icon
    document.getElementById("mIcon").innerHTML = `<i class="fas ${catIcons[r.category] || 'fa-circle'}"></i>`;
    document.getElementById("mIcon").style.cssText = catIconStyle[r.category] || "";

    document.getElementById("mName").textContent = r.name;
    document.getElementById("mBadges").innerHTML = `
        <span class="badge ${catBadgeClass[r.category] || ''}">${r.category}</span>
        <span class="badge ${disBadgeClass[r.disabilityType] || ''}">${r.disabilityType}</span>
        <span class="badge badge-country">${r.country}</span>`;

    const loc = r.address || (r.city ? `${r.city}, ${r.country}` : r.country);
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc)}`;

    let body = "";
    if (r.city) body += `<div class="modal-row"><span class="lbl"><i class="fas fa-city"></i>City</span><span class="val">${r.city}</span></div>`;
    if (r.address) body += `<div class="modal-row"><span class="lbl"><i class="fas fa-location-dot"></i>Address</span><span class="val"><a href="${mapsLink}" target="_blank" rel="noopener">${r.address} <i class="fas fa-arrow-up-right-from-square" style="font-size:9px;"></i></a></span></div>`;
    if (r.phone) body += `<div class="modal-row"><span class="lbl"><i class="fas fa-phone"></i>Phone</span><span class="val">${r.phone}</span></div>`;
    if (r.email) body += `<div class="modal-row"><span class="lbl"><i class="fas fa-envelope"></i>Email</span><span class="val"><a href="mailto:${r.email}">${r.email}</a></span></div>`;
    if (r.website) body += `<div class="modal-row"><span class="lbl"><i class="fas fa-globe"></i>Website</span><span class="val"><a href="${r.website}" target="_blank" rel="noopener">${r.website.replace("https://", "")}<i class="fas fa-arrow-up-right-from-square" style="font-size:9px;margin-left:4px;"></i></a></span></div>`;
    body += `<div class="modal-desc">${r.description}</div>`;

    document.getElementById("mBody").innerHTML = body;

    // Wrap content in modal-inner if not already
    const modal = document.querySelector(".modal-content");
    let inner = modal.querySelector(".modal-inner");
    if (!inner) {
        inner = document.createElement("div");
        inner.className = "modal-inner";
        // Move everything except strip into inner
        [...modal.children].forEach(child => {
            if (!child.classList.contains("modal-top-strip")) inner.appendChild(child);
        });
        modal.appendChild(inner);
    }

    document.getElementById("resourceModal").classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById("resourceModal").classList.remove("open");
    document.body.style.overflow = "";
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("resourceModal").addEventListener("click", function (e) {
    if (e.target === this) closeModal();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// ─── FILTERS ─────────────────────────────────────────────────────────────────
function setupPills(containerId, stateKey) {
    document.getElementById(containerId).querySelectorAll(".pill").forEach(btn => {
        btn.addEventListener("click", function () {
            document.getElementById(containerId).querySelectorAll(".pill").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            if (stateKey === "country") activeCountry = this.dataset.country;
            if (stateKey === "dis") activeDis = this.dataset.dis;
            if (stateKey === "cat") activeCat = this.dataset.cat;
            renderCards();
        });
    });
}

setupPills("countryFilters", "country");
setupPills("disabilityFilters", "dis");
setupPills("categoryFilters", "cat");

document.getElementById("searchInput").addEventListener("input", function () {
    searchVal = this.value.toLowerCase().trim();
    renderCards();
});

// ─── INIT ─────────────────────────────────────────────────────────────────────
renderCards();