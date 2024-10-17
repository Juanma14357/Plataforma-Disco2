
let nombre = prompt("Cuál es tu nombre?").toUpperCase();
while (nombre.length < 3) {
  nombre = prompt(
    "Nombre muy corto, ingresa al menos 3 letras",
  ).toUpperCase();
}

const span = document.getElementById("welcome");
span.textContent = `Hola, ${nombre}`;

const i = document.querySelector("i");
i.setAttribute("class", "fa fa-ticket");

///////

function Edad() {
    const age = prompt("Por favor, ingresa tu edad:");
    if (age < 18) {
        Swal.fire("Advertencia", "No puedes comprar tickets si eres menor de edad.", "error");
        disableButtons();
    } else {
        Swal.fire("¡Bienvenido!", "Puedes comprar tickets.", "success");
    }
  }


  function disableButtons() {
    const buttons = document.querySelectorAll(".buy-button");

    buttons.forEach(button => {
        button.disabled = true; // Deshabilitar el botón
        button.classList.toggle("disabled", true);
        console.log(`Botón ${button.innerText} desactivado: ${button.disabled}`); // Comprobación
    });
  }


  window.onload = Edad;



  let tickets = {
    "Buenos_Aires": 5,
    "Santiago":3,
    "Lima":1,
    "Ciudad_de_Mexico":0,
    "Bogota":2
 }


 function getTickets(city) {

  if (tickets[city] > 0) {

      tickets[city] -= 1; 

      Swal.fire("Compra Exitosa", `Has comprado 1 ticket(s) para ${city.replace("_", " ")}. Quedan ${tickets[city]} ticket(s).`, "success");
        
  } else {
      // Informar que no hay suficientes tickets
      Swal.fire("Tickets Agotados", `Lo sentimos, no hay suficientes tickets para ${city.replace("_", " ")}. Quedan ${tickets[city]} ticket(s) disponibles.`, "error");
  }


  disableSoldOutButtons(city); 
}

function disableSoldOutButtons(city) {

  const button = document.querySelector(`button[onclick*="${city}"]`); // Seleccionar el botón correspondiente

  if (tickets[city] <= 0) {       
      button.disabled = true; 
      button.innerText = "Sold Out"; 
      button.classList.add("disabled"); 
  }
}



