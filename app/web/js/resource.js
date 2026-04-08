// ── Login Protection ─────────────────────────────────────────
(function checkLogin() {
    const user = localStorage.getItem('user');
    if (!user) {
        sessionStorage.setItem('redirectAfterLogin', 'resource.html');
        window.location.href = 'login.html';
    } else {
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

// ─── DATA ────────────────────────────────────────────────────────────────────
// disabilityType now uses specific disability names instead of broad Motor/Cognitive
const resources = [

    // ── BANGLADESH ───────────────────────────────────────────────────────────

    {
        name: "Centre for the Rehabilitation of the Paralysed (CRP)",
        category: "Therapy",
        disabilityType: "Physical / Spinal Injury",
        country: "Bangladesh",
        city: "Savar, Dhaka",
        phone: "+880-2-7791312",
        email: "info@crp-bangladesh.org",
        website: "https://www.crp-bangladesh.org",
        address: "Chapain, Savar, Dhaka-1343",
        description: "Internationally recognised rehabilitation centre offering physiotherapy, occupational therapy, wheelchairs, and community-based support for people with spinal injuries and physical disabilities."
    },
    {
        name: "National Institute of Traumatology & Orthopaedic Rehabilitation (NITOR)",
        category: "Hospital",
        disabilityType: "Physical / Orthopaedic",
        country: "Bangladesh",
        city: "Dhaka",
        phone: "+880-2-9665048",
        website: "https://nitor.gov.bd",
        address: "Sher-E-Bangla Nagar, Dhaka-1207",
        description: "Bangladesh's premier government hospital for orthopaedic disability treatment, prosthetics, and post-surgical rehabilitation for trauma and limb-related conditions."
    },
    {
        name: "Jatiyo Protibandhi Unnayan Foundation (JPUF)",
        category: "Government",
        disabilityType: "All Disabilities",
        country: "Bangladesh",
        city: "Dhaka",
        phone: "+880-2-9130869",
        website: "https://www.jpuf.gov.bd",
        address: "Mirpur-14, Dhaka-1206",
        description: "National government foundation overseeing disability welfare, allowance programs, disability ID cards, and rehabilitation services for all types of disabilities across Bangladesh."
    },
    {
        name: "Society for the Welfare of Intellectually Disabled Bangladesh (SWID)",
        category: "NGO",
        disabilityType: "Intellectual Disability",
        country: "Bangladesh",
        city: "Dhaka",
        phone: "+880-2-9884830",
        email: "swidbd@gmail.com",
        address: "House 9, Road 3A, Dhanmondi, Dhaka-1205",
        description: "Non-profit providing education, therapy, and vocational training for children and adults with intellectual disabilities. One of Bangladesh's oldest disability organisations."
    },
    {
        name: "Autism Welfare Foundation Bangladesh",
        category: "NGO",
        disabilityType: "Autism",
        country: "Bangladesh",
        city: "Dhaka",
        phone: "+880-2-9127158",
        website: "https://www.awfbd.org",
        address: "House 10, Road 22, Gulshan-1, Dhaka-1212",
        description: "Provides therapeutic services, special education, and family support for children and individuals on the autism spectrum across Bangladesh."
    },
    {
        name: "National Academy for Autism & Neurodevelopmental Disabilities (NAAND)",
        category: "School",
        disabilityType: "Autism / Neurodevelopmental",
        country: "Bangladesh",
        city: "Dhaka",
        phone: "+880-2-9671003",
        website: "https://naand.gov.bd",
        address: "Mirpur-14, Dhaka-1206",
        description: "Government academy offering specialised education and therapeutic services for children with autism and neurodevelopmental conditions including ADHD and developmental delays."
    },
    {
        name: "Bangladesh Deaf & Blind School",
        category: "School",
        disabilityType: "Deaf / Blind",
        country: "Bangladesh",
        city: "Dhaka",
        phone: "+880-2-8312115",
        address: "Mirpur-1, Dhaka-1216",
        description: "Provides education and life-skills training to children who are deaf, blind, or deafblind, using Braille, sign language, and specialised communication methods."
    },
    {
        name: "Sylhet MAG Osmani Medical College — Physical Medicine Dept.",
        category: "Hospital",
        disabilityType: "Physical / Neurological",
        country: "Bangladesh",
        city: "Sylhet",
        phone: "+880-821-716476",
        website: "https://somc.gov.bd",
        address: "Osmani Medical College Road, Sylhet-3100",
        description: "Major public hospital in Sylhet with a dedicated physical medicine and rehabilitation department for patients with motor, neurological, and stroke-related disabilities."
    },

    // ── INDIA ─────────────────────────────────────────────────────────────────

    {
        name: "NIMHANS — National Institute of Mental Health & Neurosciences",
        category: "Hospital",
        disabilityType: "Mental Health / Neurological",
        country: "India",
        city: "Bengaluru",
        phone: "+91-80-46110007",
        email: "nimhans@nimhans.ac.in",
        website: "https://nimhans.ac.in",
        address: "Hosur Road, Bengaluru-560029",
        description: "India's leading institute for neurology, psychiatry, and cognitive disability care, offering advanced diagnostics, inpatient therapy, and internationally recognised research."
    },
    {
        name: "Enable India",
        category: "NGO",
        disabilityType: "All Disabilities",
        country: "India",
        city: "Bengaluru",
        phone: "+91-80-25282136",
        email: "connect@enableindia.org",
        website: "https://enableindia.org",
        address: "Indiranagar, Bengaluru-560038",
        description: "Empowers persons with all types of disabilities through sustainable livelihood programs, skill training, and accessible education across more than 20 Indian states."
    },
    {
        name: "Spastics Society of India (The Able Foundation)",
        category: "Therapy",
        disabilityType: "Cerebral Palsy",
        country: "India",
        city: "Mumbai",
        phone: "+91-22-26366529",
        website: "https://www.theablefoundation.in",
        address: "Bandra (W), Mumbai-400050",
        description: "Provides physiotherapy, occupational therapy, and community rehabilitation for individuals with cerebral palsy and related motor disabilities across Maharashtra."
    },
    {
        name: "AADI — Action for Ability Development & Inclusion",
        category: "School",
        disabilityType: "Multiple Disabilities",
        country: "India",
        city: "New Delhi",
        phone: "+91-11-26104823",
        website: "https://aadi.ac.in",
        address: "Pamposh Enclave, New Delhi-110048",
        description: "School and therapy centre offering inclusive education and rehabilitation for children with multiple disabilities, including physical, sensory, and intellectual conditions."
    },
    {
        name: "V-Excel Educational Trust",
        category: "School",
        disabilityType: "Autism / Learning Disability",
        country: "India",
        city: "Chennai",
        phone: "+91-44-24980744",
        website: "https://www.vexcel.org",
        address: "T. Nagar, Chennai-600017",
        description: "Specialised centre providing education and therapy for children with autism, ADHD, dyslexia, and learning disabilities, using evidence-based programs."
    },

    // ── USA ───────────────────────────────────────────────────────────────────

    {
        name: "Shirley Ryan AbilityLab",
        category: "Therapy",
        disabilityType: "Physical / Spinal Injury",
        country: "USA",
        city: "Chicago, IL",
        phone: "+1-312-238-1000",
        website: "https://www.sralab.org",
        address: "355 E Erie St, Chicago, IL 60611",
        description: "World-leading motor rehabilitation research and therapy facility using cutting-edge technology for stroke, spinal cord injury, limb loss, and neurological recovery."
    },
    {
        name: "Kennedy Krieger Institute",
        category: "Hospital",
        disabilityType: "Autism / Neurodevelopmental",
        country: "USA",
        city: "Baltimore, MD",
        phone: "+1-443-923-9200",
        website: "https://www.kennedykrieger.org",
        address: "707 N Broadway, Baltimore, MD 21205",
        description: "Internationally recognised for diagnosing and treating autism, neurodevelopmental, and learning disabilities in children and adolescents, with a strong research programme."
    },
    {
        name: "Easter Seals",
        category: "NGO",
        disabilityType: "All Disabilities",
        country: "USA",
        city: "Chicago, IL",
        phone: "+1-800-221-6827",
        website: "https://www.easterseals.com",
        address: "141 W Jackson Blvd, Chicago, IL 60604",
        description: "National network providing comprehensive services including therapy, employment support, and inclusive childcare for people with all types of disabilities across the USA."
    },
    {
        name: "United Cerebral Palsy (UCP)",
        category: "NGO",
        disabilityType: "Cerebral Palsy",
        country: "USA",
        city: "Washington, DC",
        phone: "+1-202-776-0406",
        website: "https://ucp.org",
        address: "1825 K St NW, Washington, DC 20006",
        description: "National network providing motor rehabilitation, assistive technology, housing assistance, and advocacy for people with cerebral palsy and similar physical disabilities."
    },
    {
        name: "National Federation of the Blind",
        category: "NGO",
        disabilityType: "Visual Impairment / Blind",
        country: "USA",
        city: "Baltimore, MD",
        phone: "+1-410-659-9314",
        website: "https://www.nfb.org",
        address: "200 East Wells St, Baltimore, MD 21230",
        description: "America's largest organisation of blind and low-vision people, offering scholarships, assistive technology training, legal advocacy, and community support nationwide."
    },
    {
        name: "National Association of the Deaf (NAD)",
        category: "NGO",
        disabilityType: "Deaf / Hard of Hearing",
        country: "USA",
        city: "Silver Spring, MD",
        phone: "+1-301-587-1788",
        website: "https://www.nad.org",
        address: "8630 Fenton St, Suite 820, Silver Spring, MD 20910",
        description: "Nation's premier civil rights organisation for deaf and hard-of-hearing people, providing advocacy, legal support, youth programmes, and community resources."
    },

    // ── UK ────────────────────────────────────────────────────────────────────

    {
        name: "The National Hospital for Neurology and Neurosurgery",
        category: "Hospital",
        disabilityType: "Neurological / Physical",
        country: "UK",
        city: "London",
        phone: "+44-20-3456-7890",
        website: "https://www.uclh.nhs.uk",
        address: "Queen Square, London WC1N 3BG",
        description: "The UK's leading specialist hospital for neurological conditions including Parkinson's, epilepsy, MS, and acquired brain injury, part of University College London Hospitals NHS Trust."
    },
    {
        name: "Scope UK",
        category: "NGO",
        disabilityType: "Physical / Cerebral Palsy",
        country: "UK",
        city: "London",
        phone: "+44-808-800-3333",
        website: "https://www.scope.org.uk",
        address: "6 Market Road, London N7 9PW",
        description: "National disability equality charity providing information, employment support, and advocacy primarily for people with physical disabilities and cerebral palsy across the UK."
    },
    {
        name: "Ambitious About Autism",
        category: "NGO",
        disabilityType: "Autism",
        country: "UK",
        city: "London",
        phone: "+44-20-8815-5444",
        website: "https://www.ambitiousaboutautism.org.uk",
        address: "Woodside Avenue, London N10 3JA",
        description: "National charity running specialist schools, campaigning for the rights of autistic people, and providing employment and transition support across the UK."
    },
    {
        name: "Action on Hearing Loss (RNID)",
        category: "NGO",
        disabilityType: "Deaf / Hard of Hearing",
        country: "UK",
        city: "London",
        phone: "+44-808-808-0123",
        website: "https://rnid.org.uk",
        address: "307-311 Gray's Inn Road, London WC1X 8PT",
        description: "The UK's largest charity for deaf people and those with hearing loss, offering information, technology advice, workplace support, and research into hearing conditions."
    },
    {
        name: "Royal National Institute of Blind People (RNIB)",
        category: "NGO",
        disabilityType: "Visual Impairment / Blind",
        country: "UK",
        city: "London",
        phone: "+44-303-123-9999",
        website: "https://www.rnib.org.uk",
        address: "105 Judd Street, London WC1H 9NE",
        description: "The UK's leading sight loss charity, offering support, adaptive technology guidance, Braille services, and advocacy for blind and partially sighted people across Britain."
    },

    // ── CANADA ────────────────────────────────────────────────────────────────

    {
        name: "Holland Bloorview Kids Rehabilitation Hospital",
        category: "Hospital",
        disabilityType: "Childhood Disability / Multiple",
        country: "Canada",
        city: "Toronto, ON",
        phone: "+1-416-425-6220",
        website: "https://www.hollandbloorview.ca",
        address: "150 Kilgour Road, Toronto, ON M4G 1R8",
        description: "Canada's largest paediatric rehabilitation hospital, specialising in childhood disability, acquired brain injury, cerebral palsy, and family-centred support services."
    },
    {
        name: "March of Dimes Canada",
        category: "NGO",
        disabilityType: "Physical Disability",
        country: "Canada",
        city: "Toronto, ON",
        phone: "+1-800-263-3463",
        website: "https://www.marchofdimes.ca",
        address: "10 Overlea Blvd, Toronto, ON M4H 1A4",
        description: "Supporting independence for Canadians with physical disabilities through attendant services, accessible housing, employment programs, and systemic advocacy."
    },
    {
        name: "Autism Canada",
        category: "NGO",
        disabilityType: "Autism",
        country: "Canada",
        city: "National",
        phone: "+1-800-983-1795",
        website: "https://autismcanada.org",
        address: "P.O. Box 65, Bothwell, ON N0P 1C0",
        description: "National organisation connecting autistic individuals and families to resources, research funding, and support services across all Canadian provinces and territories."
    },
    {
        name: "Canadian National Institute for the Blind (CNIB)",
        category: "NGO",
        disabilityType: "Visual Impairment / Blind",
        country: "Canada",
        city: "National",
        phone: "+1-800-563-2642",
        website: "https://www.cnib.ca",
        address: "1929 Bayview Avenue, Toronto, ON M4G 3E8",
        description: "Canada's leading sight-loss organisation, providing rehabilitation, employment support, peer connection, and technology training for blind and partially sighted Canadians."
    },

    // ── AUSTRALIA ─────────────────────────────────────────────────────────────

    {
        name: "Cerebral Palsy Alliance",
        category: "Therapy",
        disabilityType: "Cerebral Palsy",
        country: "Australia",
        city: "Sydney, NSW",
        phone: "+61-1800-654-013",
        website: "https://cerebralpalsy.org.au",
        address: "166 Hawkesbury Road, Westmead, NSW 2145",
        description: "Australia's largest non-government provider of disability services, therapy, and research for people with cerebral palsy, including physiotherapy, speech, and assistive technology."
    },
    {
        name: "Autism Spectrum Australia (Aspect)",
        category: "NGO",
        disabilityType: "Autism",
        country: "Australia",
        city: "Sydney, NSW",
        phone: "+61-1800-277-328",
        website: "https://www.autismspectrum.org.au",
        address: "14 Aquatic Drive, Frenchs Forest, NSW 2086",
        description: "Australia's largest autism-specific service provider, offering specialist education, early intervention, behaviour support, and employment programs across the country."
    },
    {
        name: "Royal Rehab",
        category: "Hospital",
        disabilityType: "Physical / Spinal Injury",
        country: "Australia",
        city: "Sydney, NSW",
        phone: "+61-2-9808-9200",
        website: "https://www.royalrehab.com.au",
        address: "235 Morrison Road, Ryde, NSW 2112",
        description: "Leading rehabilitation hospital providing specialist services for spinal cord injury, acquired brain injury, stroke, limb loss, and complex physical disability recovery."
    },
    {
        name: "NDIS — National Disability Insurance Scheme",
        category: "Government",
        disabilityType: "All Disabilities",
        country: "Australia",
        city: "National",
        phone: "+61-1800-800-110",
        website: "https://www.ndis.gov.au",
        address: "GPO Box 700, Canberra, ACT 2601",
        description: "Australia's national scheme providing personalised funding for support and services for Australians under 65 with a permanent and significant disability of any type."
    },
    {
        name: "Deaf Services Queensland",
        category: "NGO",
        disabilityType: "Deaf / Hard of Hearing",
        country: "Australia",
        city: "Brisbane, QLD",
        phone: "+61-7-3892-8500",
        website: "https://www.deafservicesqld.org.au",
        address: "16 High Street, Toowong, QLD 4066",
        description: "Provides interpreting, counselling, employment support, and community programs for deaf and hard-of-hearing Australians in Queensland and beyond."
    },

    // ── GERMANY ───────────────────────────────────────────────────────────────

    {
        name: "Lebenshilfe Germany",
        category: "NGO",
        disabilityType: "Intellectual Disability",
        country: "Germany",
        city: "Berlin",
        phone: "+49-30-206411-0",
        website: "https://www.lebenshilfe.de",
        address: "Raiffeisenstraße 18, 10367 Berlin",
        description: "Germany's largest organisation for people with intellectual disabilities, offering residential care, supported employment, education, and community inclusion services nationwide."
    },
    {
        name: "Charité — Neurological Rehabilitation Centre",
        category: "Hospital",
        disabilityType: "Neurological / Physical",
        country: "Germany",
        city: "Berlin",
        phone: "+49-30-450-560-222",
        website: "https://www.charite.de",
        address: "Charitéplatz 1, 10117 Berlin",
        description: "One of Europe's largest university hospitals, offering world-class neurological rehabilitation for stroke, Parkinson's, MS, spinal injury, and acquired brain injury."
    },
    {
        name: "Aktion Mensch",
        category: "NGO",
        disabilityType: "All Disabilities",
        country: "Germany",
        city: "Bonn",
        phone: "+49-228-2092-0",
        website: "https://www.aktion-mensch.de",
        address: "Heinemannstraße 36, 53175 Bonn",
        description: "Germany's largest private disability organisation, funding thousands of inclusion projects annually and providing resources for people with physical, intellectual, and sensory disabilities."
    },
    {
        name: "BDH Bundesverband Rehabilitation",
        category: "Therapy",
        disabilityType: "Physical / Neurological",
        country: "Germany",
        city: "Bonn",
        phone: "+49-228-26950",
        website: "https://www.bdh-reha.de",
        address: "Weberstraße 2-4, 53113 Bonn",
        description: "National association operating neurological rehabilitation centres across Germany, specialising in recovery after stroke, brain injury, and progressive neurological conditions."
    }
];

// ─── DISABILITY TYPE LIST (extracted dynamically) ─────────────────────────────
const allDisabilityTypes = [...new Set(resources.map(r => r.disabilityType))].sort();

// ─── ICONS & CLASSES ─────────────────────────────────────────────────────────
const catIcons = {
    Hospital: "fa-hospital",
    NGO: "fa-hands-holding-child",
    Therapy: "fa-heart-pulse",
    School: "fa-graduation-cap",
    Government: "fa-landmark"
};
const catBadgeClass = {
    Hospital: "badge-hospital",
    NGO: "badge-ngo",
    Therapy: "badge-therapy",
    School: "badge-school",
    Government: "badge-government"
};

// ─── STATE ────────────────────────────────────────────────────────────────────
let activeCountry = "all", activeDis = "all", activeCat = "all", searchVal = "";

// ─── BUILD DISABILITY FILTER PILLS DYNAMICALLY ───────────────────────────────
function buildDisabilityFilters() {
    const container = document.getElementById("disabilityFilters");
    container.innerHTML = `<button class="pill active" data-dis="all">All</button>`;
    allDisabilityTypes.forEach(type => {
        const btn = document.createElement("button");
        btn.className = "pill";
        btn.dataset.dis = type;
        btn.textContent = type;
        container.appendChild(btn);
    });
    setupPills("disabilityFilters", "dis");
}

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
            (r.city && r.city.toLowerCase().includes(searchVal)) ||
            r.disabilityType.toLowerCase().includes(searchVal);
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
                        <span class="badge badge-disability">${r.disabilityType}</span>
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

    document.querySelector(".modal-top-strip").style.background = catStripColors[r.category] || "#ccc";
    document.getElementById("mIcon").innerHTML = `<i class="fas ${catIcons[r.category] || 'fa-circle'}"></i>`;
    document.getElementById("mIcon").style.cssText = catIconStyle[r.category] || "";
    document.getElementById("mName").textContent = r.name;
    document.getElementById("mBadges").innerHTML = `
        <span class="badge ${catBadgeClass[r.category] || ''}">${r.category}</span>
        <span class="badge badge-disability">${r.disabilityType}</span>
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

    const modal = document.querySelector(".modal-content");
    let inner = modal.querySelector(".modal-inner");
    if (!inner) {
        inner = document.createElement("div");
        inner.className = "modal-inner";
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
setupPills("categoryFilters", "cat");

document.getElementById("searchInput").addEventListener("input", function () {
    searchVal = this.value.toLowerCase().trim();
    renderCards();
});

// ─── INIT ─────────────────────────────────────────────────────────────────────
buildDisabilityFilters();
renderCards();