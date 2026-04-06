// ─── DATA ───────────────────────────────────────────────────────────────────
// Static fallback data — replace with API fetch when backend is ready
const resources = [
    // BANGLADESH
    { name: "City General Hospital", category: "Hospital", disabilityType: "Motor", country: "Bangladesh", city: "Sylhet", phone: "+880-821-123456", email: "info@cityhosp.bd", website: "cityhosp.bd", address: "Zindabazar, Sylhet", description: "24/7 specialized motor disability support, physiotherapy units, and fully accessible wards and facilities." },
    { name: "CareNGO Bangladesh", category: "NGO", disabilityType: "Cognitive", country: "Bangladesh", city: "Dhaka", phone: "+880-2-9876543", email: "care@carengodb.org", website: "carengodb.org", address: "Dhanmondi, Dhaka", description: "Support programs for children with cognitive and learning disabilities, including home visits and family counseling." },
    { name: "Bright Minds Inclusive School", category: "School", disabilityType: "Both", country: "Bangladesh", city: "Chittagong", phone: "+880-31-111222", email: "admissions@brightminds.edu.bd", address: "Agrabad, Chittagong", description: "Inclusive education for motor and cognitive disabilities with trained special educators and adapted curriculum." },
    { name: "MoveWell Therapy Center", category: "Therapy", disabilityType: "Motor", country: "Bangladesh", city: "Sylhet", phone: "+880-821-445566", email: "movewell@therapy.bd", address: "Ambarkhana, Sylhet", description: "Occupational and physical therapy for motor disabilities, post-stroke rehabilitation and assistive device training." },
    { name: "NDRB - Govt. Disability Registry", category: "Government", disabilityType: "Both", country: "Bangladesh", city: "Dhaka", phone: "+880-2-9551234", website: "ndrb.gov.bd", address: "Segunbagicha, Dhaka", description: "National government registry providing disability ID cards, benefits and social protection services." },

    // INDIA
    { name: "NIMHANS", category: "Hospital", disabilityType: "Cognitive", country: "India", city: "Bangalore", phone: "+91-80-46110007", email: "info@nimhans.ac.in", website: "nimhans.ac.in", address: "Hosur Road, Bangalore", description: "Premier institute for neurology, psychiatry and cognitive disability care in South Asia." },
    { name: "Enable India", category: "NGO", disabilityType: "Both", country: "India", city: "Bangalore", phone: "+91-80-25282136", email: "connect@enableindia.org", website: "enableindia.org", address: "Indiranagar, Bangalore", description: "Empowers persons with disabilities through livelihood programs and accessible education." },
    { name: "AADI School Delhi", category: "School", disabilityType: "Both", country: "India", city: "Delhi", phone: "+91-11-26104823", website: "aadi.ac.in", address: "Pamposh Enclave, Delhi", description: "Action for Ability Development & Inclusion — school and therapy services for children with disabilities." },
    { name: "Rajiv Gandhi Foundation", category: "NGO", disabilityType: "Motor", country: "India", city: "Delhi", phone: "+91-11-23013948", website: "rajivgandhifoundation.com", address: "Jawahar Bhawan, Delhi", description: "Disability rehabilitation and accessible sports programs across India." },

    // USA
    { name: "Easter Seals", category: "NGO", disabilityType: "Both", country: "USA", city: "Chicago", phone: "+1-800-221-6827", website: "easterseals.com", address: "233 S. Wacker Drive, Chicago", description: "Provides comprehensive services for children and adults with disabilities across the United States." },
    { name: "Shirley Ryan AbilityLab", category: "Therapy", disabilityType: "Motor", country: "USA", city: "Chicago", phone: "+1-312-238-1000", website: "sralab.org", address: "355 E Erie St, Chicago", description: "World-leading motor rehabilitation research and therapy facility with cutting-edge technology." },
    { name: "Kennedy Krieger Institute", category: "Hospital", disabilityType: "Cognitive", country: "USA", city: "Baltimore", phone: "+1-443-923-9200", website: "kennedykrieger.org", address: "707 N Broadway, Baltimore", description: "Internationally recognized for treating and researching cognitive and developmental disabilities in children." },

    // UK
    { name: "Ambitious About Autism", category: "NGO", disabilityType: "Cognitive", country: "UK", city: "London", phone: "+44-20-8815-5444", website: "ambitiousaboutautism.org.uk", address: "Woodside Avenue, London", description: "National charity supporting autistic children and young people across the United Kingdom." },
    { name: "Scope UK", category: "NGO", disabilityType: "Motor", country: "UK", city: "London", phone: "+44-808-800-3333", website: "scope.org.uk", address: "6 Market Road, London", description: "UK charity providing support and information to disabled people and their families nationwide." },
    { name: "The National Brain Appeal", category: "Hospital", disabilityType: "Both", country: "UK", city: "London", phone: "+44-20-3448-4744", website: "nationalbrainappeal.org", address: "Box 123, The National Hospital, London", description: "Fundraising and support for motor and cognitive neurological conditions at the UK's top hospital." },

    // CANADA
    { name: "Holland Bloorview", category: "Hospital", disabilityType: "Both", country: "Canada", city: "Toronto", phone: "+1-416-425-6220", website: "hollandbloorview.ca", address: "150 Kilgour Road, Toronto", description: "Canada's largest pediatric rehabilitation hospital, specializing in childhood disability and family support." },
    { name: "Autism Canada", category: "NGO", disabilityType: "Cognitive", country: "Canada", city: "National", phone: "+1-800-983-1795", website: "autismcanada.org", description: "National organization connecting families with cognitive and autism resources across Canada." },
    { name: "March of Dimes Canada", category: "NGO", disabilityType: "Motor", country: "Canada", city: "Toronto", phone: "+1-800-263-3463", website: "marchofdimes.ca", address: "10 Overlea Blvd, Toronto", description: "Supporting independence for Canadians with physical disabilities through programs and advocacy." },

    // AUSTRALIA
    { name: "Cerebral Palsy Alliance", category: "Therapy", disabilityType: "Motor", country: "Australia", city: "Sydney", phone: "+61-2-9975-8000", website: "cerebralpalsy.org.au", address: "Allambie Heights, Sydney", description: "Leading provider of disability services, therapy and research for people with motor disabilities." },
    { name: "Autism Spectrum Australia", category: "NGO", disabilityType: "Cognitive", country: "Australia", city: "Sydney", phone: "+61-1800-277-328", website: "autismspectrum.org.au", address: "Frenchs Forest, Sydney", description: "Specialist autism services for people of all ages across Australia." },

    // GERMANY
    { name: "Lebenshilfe Germany", category: "NGO", disabilityType: "Cognitive", country: "Germany", city: "Berlin", phone: "+49-228-853-800", website: "lebenshilfe.de", address: "Raiffeisenstrasse 18, Berlin", description: "Germany's largest NGO for people with cognitive disabilities, offering education and care services." },
    { name: "BDH Bundesverband", category: "Therapy", disabilityType: "Motor", country: "Germany", city: "Bonn", phone: "+49-228-26950", website: "bdh.de", address: "Hilpertstrasse 31, Bonn", description: "Neurological rehabilitation centers across Germany specializing in motor disability recovery." }
];

// ─── ICONS & BADGE CLASSES ──────────────────────────────────────────────────
const catIcons = { Hospital: "fa-hospital", NGO: "fa-hands-helping", Therapy: "fa-spa", School: "fa-chalkboard-teacher", Government: "fa-landmark" };
const catBadgeClass = { Hospital: "badge-hospital", NGO: "badge-ngo", Therapy: "badge-therapy", School: "badge-school", Government: "badge-gov" };
const disBadgeClass = { Motor: "badge-motor", Cognitive: "badge-cognitive", Both: "badge-both" };

// ─── STATE ───────────────────────────────────────────────────────────────────
let activeCountry = "all", activeDis = "all", activeCat = "all", searchVal = "";

// ─── RENDER CARDS ────────────────────────────────────────────────────────────
function renderCards() {
    const grid = document.getElementById("cardGrid");
    const count = document.getElementById("resultCount");

    const filtered = resources.filter(r => {
        const matchC = activeCountry === "all" || r.country === activeCountry;
        const matchD = activeDis === "all" || r.disabilityType === activeDis;
        const matchCat = activeCat === "all" || r.category === activeCat;
        const matchS = searchVal === "" || r.name.toLowerCase().includes(searchVal) || (r.city && r.city.toLowerCase().includes(searchVal));
        return matchC && matchD && matchCat && matchS;
    });

    count.textContent = `${filtered.length} resource${filtered.length !== 1 ? "s" : ""} found`;

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="no-results"><i class="fas fa-search"></i><p>No resources found. Try adjusting your filters.</p></div>`;
        return;
    }

    grid.innerHTML = filtered.map(r => {
        const originalIndex = resources.indexOf(r);
        return `
        <div class="resource-card dis-${r.disabilityType.toLowerCase()}" onclick="openModal(${originalIndex})">
            <div class="card-top">
                <div class="card-icon"><i class="fas ${catIcons[r.category] || 'fa-circle'}"></i></div>
                <div class="card-badges">
                    <span class="badge ${catBadgeClass[r.category] || ''}">${r.category}</span>
                    <span class="badge ${disBadgeClass[r.disabilityType] || ''}">${r.disabilityType}</span>
                </div>
            </div>
            <h3>${r.name}</h3>
            <p>${r.description.substring(0, 90)}...</p>
            <div class="card-footer">
                <span class="location-tag"><i class="fas fa-map-marker-alt"></i> ${r.city ? r.city + ", " : ""}${r.country}</span>
                <button class="view-btn" onclick="event.stopPropagation(); openModal(${originalIndex})">
                    View <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>`;
    }).join("");
}

// ─── OPEN MODAL ──────────────────────────────────────────────────────────────
function openModal(idx) {
    const r = resources[idx];
    document.getElementById("mIcon").innerHTML = `<i class="fas ${catIcons[r.category] || 'fa-circle'}"></i>`;
    document.getElementById("mName").textContent = r.name;
    document.getElementById("mBadges").innerHTML = `
        <span class="badge ${catBadgeClass[r.category] || ''}">${r.category}</span>
        <span class="badge ${disBadgeClass[r.disabilityType] || ''}">${r.disabilityType}</span>
        <span class="badge badge-country">🌍 ${r.country}</span>`;

    const loc = r.address || (r.city ? `${r.city}, ${r.country}` : r.country);
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc)}`;

    let body = "";
    if (r.city) body += `<div class="modal-row"><span class="lbl"><i class="fas fa-city"></i> City</span><span class="val">${r.city}</span></div>`;
    if (r.address) body += `<div class="modal-row"><span class="lbl"><i class="fas fa-map-marker-alt"></i> Address</span><span class="val"><a href="${mapsLink}" target="_blank">${r.address} <i class="fas fa-external-link-alt"></i></a></span></div>`;
    if (r.phone) body += `<div class="modal-row"><span class="lbl"><i class="fas fa-phone"></i> Phone</span><span class="val">${r.phone}</span></div>`;
    if (r.email) body += `<div class="modal-row"><span class="lbl"><i class="fas fa-envelope"></i> Email</span><span class="val"><a href="mailto:${r.email}">${r.email}</a></span></div>`;
    if (r.website) body += `<div class="modal-row"><span class="lbl"><i class="fas fa-globe"></i> Website</span><span class="val"><a href="https://${r.website}" target="_blank">${r.website} <i class="fas fa-external-link-alt"></i></a></span></div>`;
    body += `<div class="modal-desc">${r.description}</div>`;

    document.getElementById("mBody").innerHTML = body;
    document.getElementById("resourceModal").classList.add("open");
}

// ─── CLOSE MODAL ─────────────────────────────────────────────────────────────
document.getElementById("modalClose").onclick = () => document.getElementById("resourceModal").classList.remove("open");
document.getElementById("resourceModal").onclick = function (e) { if (e.target === this) this.classList.remove("open"); };

// ─── FILTER SETUP ────────────────────────────────────────────────────────────
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

// ─── INIT ────────────────────────────────────────────────────────────────────
renderCards();

// ─── API INTEGRATION (uncomment when backend ready) ──────────────────────────
// async function fetchFromAPI() {
//     const params = new URLSearchParams();
//     if (activeCountry !== "all") params.append("country", activeCountry);
//     if (activeDis !== "all") params.append("disabilityType", activeDis);
//     if (activeCat !== "all") params.append("category", activeCat);
//     const res = await fetch(`/api/resources?${params}`);
//     return await res.json();
// }