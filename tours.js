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
