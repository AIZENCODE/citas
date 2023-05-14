// Variables y selectores

const formulario = document.getElementById("agregargasto");
const listagastos = document.getElementById("listagastos");
// console.log(formulario);
const perfil = document.getElementById("perfil");
const menu = document.getElementById("menu");
const menuclose = document.getElementById("menu_close");
const nav = document.getElementById("nav");
const usuario = {
  name: "Diego Saravia Sanchez",
  email: "diego.saria@gmail.com",
  rol: "administrador",
};
const nombreCompleto = String(usuario.name);
const palabras = nombreCompleto.split(" ");
let iniciales = "";
for (let i = 0; i < 2; i++) {
  iniciales += palabras[i].charAt(0).toUpperCase();
}

//Eventos
eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", () => {
    perfil.textContent = iniciales;
    preguntarPresupuesto();

    formulario.addEventListener("submit", agregarGasto);

    menu.addEventListener("click", function () {
      nav.classList.toggle("nav--active");
    });
    menuclose.addEventListener("click", function () {
      nav.classList.toggle("nav--active");
    });
  });
}

// Clases

class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }

  nuevoGasto(gasto) {
    this.gastos = [...this.gastos, gasto];
    this.calcularRestante();
  }

  calcularRestante() {
    const gastado = this.gastos.reduce(
      (total, gasto) => total + gasto.cantidad,
      0
    );
    document.getElementById("gastos").textContent = gastado;
    this.restante = this.presupuesto - gastado;
  }
  eliminarGasto(id){

    this.gastos = this.gastos.filter(gasto => gasto.id !== id);
    this.calcularRestante();
  }
}

class UI {
  insertarPresupuesto(cantidad) {
    const { presupuesto, restante } = cantidad;
    document.getElementById("caja").textContent = presupuesto;
    document.getElementById("presupuesto").textContent = restante;
  }

  imprimirAlert(mensaje, tipo) {
    const divmensaje = document.createElement("div");
    divmensaje.classList.add("text-center", "alert", "mt-4");
    if (tipo === "error") {
      divmensaje.classList.add("alert-danger");
    } else {
      divmensaje.classList.add("alert-primary");
    }

    // Mensaje de error
    divmensaje.textContent = mensaje;

    // Insertar en el HTML

    document.querySelector(".card").insertBefore(divmensaje, formulario);

    setTimeout(() => {
      divmensaje.remove();
    }, 3000);
  }

  mostrarGastos(gastos) {
    this.limpiarHTML();
    gastos.forEach((gasto) => {
      const { cantidad, nombre, id } = gasto;

      //Crear ITEM
      const nuevoGasto = document.createElement("div");
      nuevoGasto.className =
        "cita__item d-flex flex-column flex-lg-row align-items-center gap-5 bg-white rounded-3 py-4 px-2 p-xxl-4";
      nuevoGasto.dataset.id = id;

      nuevoGasto.innerHTML = `
      <i class="fa-brands fa-dropbox cita__icon"></i>
      <div class="cita__info d-grid  gap-2 w-100">
          <div
              class="cita__text d-flex flex-wrap flex-lg-nowrap justify-content-center align-items-center gap-3">
              <h2 class="cita__title m-0 ">${nombre}</h2>
              <div class="cita__tags d-flex gap-3">
         
                  <span class="cita__tag cita__tag--gastos">gastos</span>
              </div>
              <h3 class="cita__preci m-0 ms-lg-auto  ">$${cantidad}</h3>
          </div>
      </div>
      `;
      const btnBorrar = document.createElement("button");
      btnBorrar.classList.add("btn", "btn-danger", "borrar-gasto");
      btnBorrar.textContent = "Borrar ";
      btnBorrar.onclick = () => { 
        eliminarGasto(id);
      }
      nuevoGasto.appendChild(btnBorrar);

      // agregar al html

      listagastos.appendChild(nuevoGasto);
    });
  }
  limpiarHTML() {
    while (listagastos.firstChild) {
      listagastos.removeChild(listagastos.firstChild);
    }
  }

  actulizarRestante(restante) {
    document.getElementById("presupuesto").textContent = restante;
  }

  comprobarPresupuesto(presupuestoObj) {
    const { presupuesto, restante } = presupuestoObj;
    const restanteDiv = document.querySelector(".info__presupuesto");
    // comprobar

    if (presupuesto / 4 > restante) {
      restanteDiv.classList.remove("alert", "alert-warning");
      restanteDiv.classList.add("alert", "alert-danger");
    }else if (presupuesto / 2 > restante) {
      restanteDiv.classList.remove("alert", "alert-danger");
      restanteDiv.classList.add("alert", "alert-warning");
    }else{
      restanteDiv.classList.remove("alert", "alert-danger", "alert-warning");
    }


    // Si el total es 0 o menor 
    if (restante <=0 ) {
      ui.imprimirAlert('El presupuesto se ha agotado','error');
      formulario.querySelector('button[type="submit"]').disabled= true;
    }
  }




}

const ui = new UI();
let presupuesto;
// funciones

function preguntarPresupuesto() {
  const presupuestoUsuario = prompt("cual es tu presupuesta");

  if (
    presupuestoUsuario === "" ||
    presupuestoUsuario === null ||
    isNaN(presupuestoUsuario) ||
    presupuestoUsuario <= 0
  ) {
    window.location.reload();
  }
  presupuesto = new Presupuesto(presupuestoUsuario);
  // console.log(presupuesto);
  ui.insertarPresupuesto(presupuesto);
}

// Añade gasto

function agregarGasto(e) {
  e.preventDefault();

  //leer los datos de formulario

  const nombre = document.getElementById("gasto").value;
  const cantidad = Number(document.getElementById("cantidad").value);

  // validad

  if (nombre === "" || cantidad === "") {
    ui.imprimirAlert("Ambos campos son obligatorios", "error");
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.imprimirAlert("Cantidad no valida", "error");

    return;
  }

  // ui.imprimirAlert("Ambos campos son obligatorios", "error");

  //generar un objeto con el gasto

  const gasto = { nombre, cantidad, id: Date.now() };

  //Añade nuevo gasto
  presupuesto.nuevoGasto(gasto);

  // mensaje de todo bien
  ui.imprimirAlert("Gasto agregado correctamente");
  // console.log(gasto);

  // imprimir los gastos
  const { gastos, restante } = presupuesto;
  ui.mostrarGastos(gastos);
  ui.actulizarRestante(restante);
  ui.comprobarPresupuesto(presupuesto);
  // reinicia el formulario
  formulario.reset();
}

function eliminarGasto(id) {
  presupuesto.eliminarGasto(id);
  const {gastos, restante} =presupuesto;
  ui.mostrarGastos(gastos);
  ui.actulizarRestante(restante);
  ui.comprobarPresupuesto(presupuesto);
}