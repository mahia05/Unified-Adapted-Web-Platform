//Search Input Change
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".resource-card");

searchInput.addEventListener("keyup", function () {

    let searchValue = searchInput.value.toLowerCase();

    cards.forEach(function (card) {

        let title = card.querySelector(".resource-title").textContent.toLowerCase();

        if (title.includes(searchValue)) {
            card.style.display = "block";
        }
        else {
            card.style.display = "none";
        }

    });

});
//Filter Code Add
const filterButtons = document.querySelectorAll(".filter-buttons button");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        let filter = button.getAttribute("data-filter");

        cards.forEach(card => {

            let category = card.getAttribute("data-category");

            if (filter === "all" || category === filter) {
                card.style.display = "block";
            }
            else {
                card.style.display = "none";
            }

        });

    });

});
//popup open by clicking view
const viewButtons = document.querySelectorAll(".view-btn");

const modal = document.getElementById("resourceModal");

const closeBtn = document.querySelector(".close-btn");

viewButtons.forEach(button => {

    button.addEventListener("click", function () {

        let card = this.closest(".resource-card");

        document.getElementById("modalName").textContent =
            card.dataset.name;

        document.getElementById("modalCategory").textContent =
            card.dataset.category;

        document.getElementById("modalLocation").textContent =
            card.dataset.location;

        document.getElementById("modalPhone").textContent =
            card.dataset.phone;

        document.getElementById("modalDescription").textContent =
            card.dataset.description;

        modal.style.display = "flex";

    });

});

closeBtn.onclick = function () {

    modal.style.display = "none";

}

window.onclick = function (event) {

    if (event.target == modal) {
        modal.style.display = "none";
    }

}