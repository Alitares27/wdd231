const container = document.querySelector(".members-cards");

async function fetchMembers() {
    try {
        const response = await fetch("/chamber/data/members.json");
        const members = await response.json();
        container.innerHTML = "";
        members.forEach(member => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("memberCard");
            memberCard.innerHTML = `
                <h3>${member.name}</h3>
                <h4 class="industry">${member.industry}</h4>
                <img src="${member.image}" alt="${member.name} loading="lazy">
                <p class="address"><strong>ADDRESS: </strong>${member.address}</p>
                <p class="phone"><strong>PHONE: </strong>${member.phone}</p>
                <p class="url"><strong>URL: </strong>${member.website}</p>
                <p class="level"><strong>LEVEL: </strong>${member.membershipLevel}</p>
                <p class="founded"><strong>FOUNDED: </strong>${member.founded}</p>
            `;
            container.appendChild(memberCard);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchMembers();

//filters
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

// The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

gridbutton.addEventListener("click", () => {
    // example using arrow function
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
}
