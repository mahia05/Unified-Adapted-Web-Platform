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