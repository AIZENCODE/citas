const menu = document.getElementById('menu');
const menuclose = document.getElementById('menu_close');
const nav = document.getElementById('nav');

menu.addEventListener("click", function () {
    nav.classList.toggle("nav--active");
  });
menuclose.addEventListener("click", function () {
    nav.classList.toggle("nav--active");
  });

