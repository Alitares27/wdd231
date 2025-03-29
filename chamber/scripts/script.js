const container = document.querySelector(".members-cards");
async function fetchMembers() {
    try {
        const response = await fetch("../chamber/data/members.json");
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

const levelContainer = document.querySelector(".members-level-cards");

async function fetchMembersbyLevel() {
    try {
        const response = await fetch("../chamber/data/members.json");
        const membersLevel = await response.json();

        const levelThreeMembers = membersLevel.filter(member => member.membershipLevel === 3);

        levelContainer.innerHTML = "";
        levelThreeMembers.forEach(memberLevel => {
            const memberLevelCard = document.createElement("div");
            memberLevelCard.classList.add("memberLevelCard");
            memberLevelCard.innerHTML = `
                <h3>${memberLevel.name}</h3>
                <h4 class="industry">${memberLevel.industry}</h4>
                <p class="phone"><strong>PHONE: </strong>${memberLevel.phone}</p>
                <p class="founded"><strong>FOUNDED: </strong>${memberLevel.founded}</p>
            `;
            levelContainer.appendChild(memberLevelCard);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchMembers();
fetchMembersbyLevel();

//filters
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", showList); 

function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
}


