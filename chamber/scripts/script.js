const container = document.querySelector(".members-cards");

fetch("/chamber/scripts/members.json")
    .then(response => response.json())
    .then(members => {
        container.innerHTML = ""; 
        members.forEach(member => {
            const userCard = document.createElement("div");
            userCard.classList.add("userCard");
            userCard.innerHTML = `
                <h3>${member.name}</h3>
                <p>${member.businessLine}</p>
                <p><strong>EMAIL: </strong>${member.email}</p>
                <p><strong>PHONE: </strong>${member.phone}</p>
                <p><strong>URL: </strong>${member.website}</p>
            `;
            container.appendChild(userCard);
        });
    })
    .catch(error => console.error('Error fetching data:', error));