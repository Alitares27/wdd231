// toggle menu in small view
const mainNav = document.querySelector('.navigation');
const navbutton = document.querySelector('#menu');

navbutton.addEventListener('click', () => {
  mainNav.classList.toggle('show');
  navbutton.classList.toggle('show');
});