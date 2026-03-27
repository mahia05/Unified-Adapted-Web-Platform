// ------------------------
// RESOURCE.JS
// ------------------------

// 1️⃣ Search Input Filter
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".resource-card");

searchInput.addEventListener("keyup", function () {
    let searchValue = searchInput.value.toLowerCase();

    cards.forEach(function (card) {
        let title = card.querySelector(".resource-title").textContent.toLowerCase();

        if (title.includes(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

// 2️⃣ Category Filter Buttons
const filterButtons = document.querySelectorAll(".filter-buttons button");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        let filter = button.getAttribute("data-filter");

        cards.forEach(card => {
            let category = card.getAttribute("data-category");

            if (filter === "all" || category === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// 3️⃣ Modal Popup + Map Link
const viewButtons = document.querySelectorAll(".view-btn");
const modal = document.getElementById("resourceModal");
const closeBtn = document.querySelector(".close-btn");

viewButtons.forEach(button => {
    button.addEventListener("click", function () {
        let card = this.closest(".resource-card");

        document.getElementById("modalName").textContent = card.dataset.name;
        document.getElementById("modalCategory").textContent = card.dataset.category;

        // Map functionality
        let location = card.dataset.location;
        let mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
        document.getElementById("modalLocation").innerHTML =
            `<a href="${mapsLink}" target="_blank">${location}</a>`;

        document.getElementById("modalPhone").textContent = card.dataset.phone;
        document.getElementById("modalDescription").textContent = card.dataset.description;

        modal.style.display = "flex";
    });
});

// Close modal
closeBtn.onclick = function () {
    modal.style.display = "none";
}

// Close modal by clicking outside
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}