// toggle menu in small view
const mainNav = document.querySelector('.navigation');
const navbutton = document.querySelector('#menu');

navbutton.addEventListener('click', () => {
  mainNav.classList.toggle('show');
  navbutton.classList.toggle('show');
});

const currentUrl = window.location.pathname.split("/").pop();
  
  const navLinks = document.querySelectorAll(".navigation a");

  navLinks.forEach(link => {
    const linkHref = link.getAttribute("href");

    if (linkHref === currentUrl || (linkHref === "index.html" && currentUrl === "")) {
      link.classList.add("active");
    }
  });