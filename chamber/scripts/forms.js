const currentYear = new Date().getFullYear();
document.getElementById("year").innerHTML = currentYear;

const lastModified = document.lastModified;
document.getElementById("modification").innerHTML = lastModified;

const timestampElement = document.getElementById("timestamp");
if (timestampElement) {
    const currentDate = new Date();
    timestampElement.value = currentDate.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}

const myInfo = new URLSearchParams(window.location.search);
const thankyouDetailsElement = document.querySelector(".thankyouDetails");
if (thankyouDetailsElement) {
    const firstname = myInfo.get("firstname") || "N/A";
    const lastname = myInfo.get("lastname") || "N/A";
    const email = myInfo.get("email") || "N/A";
    const phoneNumber = myInfo.get("phone") || "N/A";
    const businessName = myInfo.get("businessName") || "N/A";
    const timestamp = myInfo.get("timestamp") || "N/A";

    thankyouDetailsElement.innerHTML = `
        <br>
        <p>Here are the details you provided:</p>
        <p><strong>Firstname:</strong> <span id="firstname">${firstname}</span></p>
        <p><strong>Lastname:</strong> <span id="lastname">${lastname}</span></p>
        <p><strong>Email:</strong> <span id="email">${email}</span></p>
        <p><strong>Phone:</strong> <span id="phoneNumber">${phoneNumber}</span></p>
        <p><strong>Business Name:</strong> <span id="businessName">${businessName}</span></p>
        <p><strong>Date & Time:</strong> <span id="timestamp">${timestamp}</span></p>`;
}

const memberships = [
    {
        level: "NP Membership",
        description: "No cost, exclusive for non-profit organizations seeking support and networking within the business community.",
    },
    {
        level: "Bronze Membership",
        description: "Access to basic networking events, inclusion in the business directory, and limited support for business growth.",
    },
    {
        level: "Silver Membership",
        description: "All Bronze benefits plus access to workshops, webinars, and additional networking opportunities.",
    },
    {
        level: "Gold Membership",
        description: "All Silver benefits plus priority access to events, personalized support, and promotional opportunities.",
    }
]

const detailsBtn = document.querySelectorAll(".details-btn");
const membershipModal = document.getElementById("membershipModal");
const membModalContent = document.querySelector(".membModalContent");

addDialogEvents()

function addDialogEvents() {
   
    detailsBtn.forEach(button => {
        button.addEventListener("click", () => {
            const membershipIndex = parseInt(button.getAttribute("data-index"), 10);
            
            const membership = memberships[membershipIndex];
            membModalContent.innerHTML = `
                <h2 class="membershipLevel">${membership.level}</h2>
                <p class="membershipDescription">${membership.description}</p>`;
            membershipModal.style.display = "flex";
        });
        });
    };

    window.addEventListener("click", (event) => {
        if (event.target === membershipModal) {
            membershipModal.style.display = "none";
        }
    });
