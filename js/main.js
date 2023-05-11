
const usuario = 
  {
    name:'roxana sanchez peña',
    email:'diego.saria@gmail.com',
    rol:'administrador'
  };
const nombreCompleto = String(usuario.name);


const palabras = nombreCompleto.split(" ");
let iniciales = "";
for (let i = 0; i < 2; i++) {
  iniciales += palabras[i].charAt(0).toUpperCase();
}


document.addEventListener('DOMContentLoaded', () => {

  
perfil.textContent = iniciales;

})
const perfil = document.getElementById('perfil');
const menu = document.getElementById('menu');
const menuclose = document.getElementById('menu_close');
const nav = document.getElementById('nav');

menu.addEventListener("click", function () {
    nav.classList.toggle("nav--active");
  });
menuclose.addEventListener("click", function () {
    nav.classList.toggle("nav--active");
  });

