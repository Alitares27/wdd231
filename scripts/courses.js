const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

//Links
const allLink = document.getElementById("all");
const wddLink = document.getElementById("WDD");
const cseLink = document.getElementById("CSE");
const container = document.querySelector(".courseList");

//Event Listeners
allLink.addEventListener("click", () => filterAndDisplayCourses());
wddLink.addEventListener("click", () => filterAndDisplayCourses("WDD"));
cseLink.addEventListener("click", () => filterAndDisplayCourses("CSE"));


//Functions
function filterAndDisplayCourses(subject) {
    const filteredCourses = subject ? courses.filter(course => course.subject === subject) : courses;
    displayCourses(filteredCourses);
}

function displayCourses(filteredCourses) {
    container.innerHTML = "";
    const fragment = document.createDocumentFragment();
    let totalCredits = 0;

    filteredCourses.forEach((course, index) => {
        const courseBtn = document.createElement("button");
        courseBtn.className = "courseBtn";
        courseBtn.innerHTML = course.completed ? `✔ ${course.subject} ${course.number}` : `${course.subject} ${course.number}`;
        courseBtn.style.backgroundColor = course.completed ? 'darkgrey' : '#662F1F';
        courseBtn.style.color = course.completed ? 'black' : 'white';
        courseBtn.style.cursor = course.completed ? 'unset' : 'pointer';

        courseBtn.setAttribute("data-index", index);
        fragment.appendChild(courseBtn);
        totalCredits += course.credits;
    });

    container.appendChild(fragment);
    const numberCredit = document.getElementById("numberCredit");
    numberCredit.innerHTML = totalCredits;

    addDialogEvents();
}

function addDialogEvents() {
    const dialogButtons = document.querySelectorAll(".courseBtn");
    const modal = document.getElementById("myModal");
    const modalContent = document.querySelector(".modal-content"); 
    
    dialogButtons.forEach(button => {
        button.addEventListener("click", () => {
            const courseIndex = button.getAttribute("data-index"); 
            const course = courses[courseIndex]; 

            modalContent.innerHTML = `
                <h2 class="courseCode">${course.subject} ${course.number}</h2>
                <h3 class="courseTitle">${course.subject} ${course.number} - ${course.title}</h3>
                <p class="courseCredits">${course.credits}<span> Credits</span> </p>
                <p class="courseCertificate"><span>Certificate:</span> ${course.certificate}</p>
                <p class="courseDescription">${course.description}</p>
                <p class="courseTechnology"><span>Technologies:</span> ${course.technology.join(", ")}</p>
            `;

            modal.style.display = "flex"; 
        });
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

displayCourses(courses);
