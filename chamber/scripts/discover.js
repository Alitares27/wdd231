const placesContainer = document.querySelector(".placesContainer");
async function fetchPlaces() {
    try {
        const response = await fetch("../chamber/data/rosario.json");
        const places = await response.json();
        placesContainer.innerHTML = "";
        places.forEach(place => {
            const placeCard = document.createElement("div");
            placeCard.classList.add("placeCard");
            placeCard.innerHTML = `
                <h2 class="namePlace">${place.name}</h2>
                <figure class="placeImage">
                    <img src="${place.image}" alt="${place.name}" loading="lazy" width="350px">
                    <figcaption class="location"><strong>Location: </strong>${place.location}</figcaption>
                </figure>
                <p class="description">${place.description}</p>
                <button class="placebtn">learn more</button>`;
            placesContainer.appendChild(placeCard);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchPlaces()

document.addEventListener("DOMContentLoaded", function () {
    const message = document.querySelector(".message");
    const lastVisit = localStorage.getItem("lastVisit");
    
    const now = new Date();

    if (!lastVisit) {
        message.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(lastVisit);
        const diffTime = now - lastVisitDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 1) {
            message.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = diffDays === 1 ? "day" : "days";
            message.textContent = `You last visited ${diffDays} ${dayText} days ago.`;
        }
    }
    localStorage.setItem("lastVisit", now.toISOString());
});