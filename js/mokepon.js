const TiposDeAtaques = ["Agua", "Fuego", "Tierra"];

let labelHipodoge;
let labelCapipepo;
let labelRatigueya;

let btnSeleccionarMascota = document.getElementById("boton-mascota");
let botonReiniciar = document.getElementById("boton-reiniciar");

let inputHipodoge = document.getElementById("hipodoge");
let inputCapipepo = document.getElementById("capipepo");
let inputRatigueya = document.getElementById("ratigueya");

let spanMascotaJugador = document.getElementById("mascota-jugador");
let spanMascotaEnemigo = document.getElementById("mascota-enemigo");

let vidasJugador = document.getElementById("vidas-jugador");
let vidasEnemigo = document.getElementById("vidas-enemigo");

let resultadoDeCombate = document.getElementById("resultado");
let ataquesDelJugador = document.getElementById("ataques-de-jugador");
let ataquesDelEnemigo = document.getElementById("ataques-de-enemigo");
let efectividadDeAtaqueJugador = document.getElementById("efectividad-de-ataque-jugador");
let efectividadDeAtaqueEnemigo = document.getElementById("efectividad-de-ataque-enemigo");

let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
let titleSeleccionarAtaque = document.getElementById("subtitulo-seleccionar-ataque");
let seleccionarAtaque = document.getElementById("seleccionar-ataque");

let contenedorDeTarjetas = document.getElementById("contenedor-de-tarjetas");
let contenedorDeBotonesDeAtaques = document.getElementById("contenedor-de-botones-de-ataques");
let tarjetas;

let efectividadJugadorIcono;
let efectividadEnemigoIcono;

let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let ataquesMokeponJugador = [];
let ataquesMokeponEnemigo = [];
let opcionDemokepones;
let opcionDeAtaques;
let vidasActualesJugador;
let vidasActualesEnemigo;

let heartIcon = "❤️";
let heartLoseStyle = 'color: transparent; text-shadow: 0 0 0 #A9A9A9; filter: blur(0.5px) drop-shadow(1px 1px 1px #555);';
let addSpace = 'margin-right: 4px;';

let idMascotaSeleccionada = "";
let mokeponSeleccionado;
let mokeponEnemigoSeleccionado;
let botonesDeAtaque = [];

class Mokepon {
    ataques = [];

    constructor(nombre, imgSrc, vida) {
        this.nombre = nombre;
        this.imgSrc = imgSrc;
        this.vida = vida;
    }
}

let hipodoge = new Mokepon("hipodoge", "/assets/mokepons_mokepon_hipodoge_attack.png", 5);
let ratigueya = new Mokepon("ratigueya", "/assets/mokepons_mokepon_ratigueya_attack.png", 5);
let capipepo = new Mokepon("capipepo", "/assets/mokepons_mokepon_capipepo_attack.png", 5);

hipodoge.ataques.push(
    {nombre: "Agua", id: "boton-agua-1"},
    {nombre: "Agua", id: "boton-agua-2"},
    {nombre: "Agua", id: "boton-agua-3"},
    {nombre: "Fuego", id: "boton-fuego-1"},
    {nombre: "Tierra", id: "boton-tierra-1"},
)

ratigueya.ataques.push(
    {nombre: "Fuego", id: "boton-fuego-1"},
    {nombre: "Fuego", id: "boton-fuego-2"},
    {nombre: "Fuego", id: "boton-fuego-3"},
    {nombre: "Agua", id: "boton-agua-1"},
    {nombre: "Tierra", id: "boton-tierra-1"},
)

capipepo.ataques.push(
    {nombre: "Tierra", id: "boton-tierra-1"},
    {nombre: "Tierra", id: "boton-tierra-2"},
    {nombre: "Tierra", id: "boton-tierra-3"},
    {nombre: "Fuego", id: "boton-fuego-1"},
    {nombre: "Agua", id: "boton-agua-1"},
)

mokepones.push(hipodoge, ratigueya, capipepo)

function iniciarJuego() {
    mokepones.forEach((mokepon, i) => {
        opcionDemokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${capitalizeFirstLetter(mokepon.nombre)}</p>
            <img src=${mokepon.imgSrc} alt=${mokepon.nombre}>
        </label>
        `;
        
        contenedorDeTarjetas.innerHTML += opcionDemokepones;
    });

    tarjetas = document.querySelectorAll(".tarjeta-de-mokepon");

    mostrarBotonSeleccionarMascota();
    addEventListeners();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addEventListeners() {
    // active context menu blocker just in prod, during development its not allow to open inspector
    // window.addEventListener('contextmenu', (e) => e.preventDefault()); // prevent users to open contextual menue

    labelHipodoge = document.querySelector("label[for='hipodoge']");
    labelCapipepo = document.querySelector("label[for='capipepo']");
    labelRatigueya = document.querySelector("label[for='ratigueya']");
    labelHipodoge.addEventListener("click", _ => seleccionarTarjetaDeMokepon(labelHipodoge));
    labelCapipepo.addEventListener("click", _ => seleccionarTarjetaDeMokepon(labelCapipepo));
    labelRatigueya.addEventListener("click", _ => seleccionarTarjetaDeMokepon(labelRatigueya));

    btnSeleccionarMascota.addEventListener("click", seleccionarMascotaJugador);
    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
    if (idMascotaSeleccionada == "") {
        alert("Selecciona una mascota");
        return;
    }

    mokeponSeleccionado = mokepones.find((mokepon) => mokepon.nombre == idMascotaSeleccionada);
    
    mokeponSeleccionado.ataques.forEach((ataque, i) => {
        opcionDeAtaques = `
        <button id=${ataque.id} class="boton-de-ataque">${ataque.nombre}</button>
        `;
        
        contenedorDeBotonesDeAtaques.innerHTML += opcionDeAtaques;
    });
    
    botonesDeAtaque = document.querySelectorAll(`.boton-de-ataque`);
    
    spanMascotaJugador.innerHTML = capitalizeFirstLetter(idMascotaSeleccionada);

    vidasActualesJugador = mokeponSeleccionado.vida;
    vidasJugador.innerHTML = `<span style="${addSpace}">${heartIcon}</span>`.repeat(vidasActualesJugador); 

    ocultarSeleccionMascota();
    mostrarSeleccionDeAtaques();
    seleccionarMascotaEnemigo();
}

function secuenciaDeAtaque() {
    botonesDeAtaque.forEach(auxBoton => auxBoton.addEventListener("click", (e) => {
        ataqueJugador.push(e.target.textContent);
        console.log(ataqueJugador);
        auxBoton.style.background = "#112f58";
        
        ataqueAleatorioEnemigo();
    }));
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length-1);
    
    mokeponEnemigoSeleccionado = mokepones[mascotaAleatoria];
    spanMascotaEnemigo.innerHTML = capitalizeFirstLetter(mokeponEnemigoSeleccionado.nombre);

    vidasActualesEnemigo = mokeponEnemigoSeleccionado.vida;
    vidasEnemigo.innerHTML = `<span style="${addSpace}">${heartIcon}</span>`.repeat(vidasActualesEnemigo);

    ataquesMokeponEnemigo = mokeponEnemigoSeleccionado.ataques;

    secuenciaDeAtaque();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length-1);

    switch (ataqueAleatorio) {
        case 0:
        case 1:
            ataqueEnemigo.push("Fuego");
            break;
        case 3:
        case 4:
            ataqueEnemigo.push("Agua");
            break;
        case 2:
            ataqueEnemigo.push("Tierra");
            break;
        default:
            break;
    }

    console.log(ataqueEnemigo);

    combate();
}

function combate() {
    if (ataqueJugador == ataqueEnemigo) {
        crearMensajeCombate("EMPATE");
    } else if (
        (ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra") ||
        (ataqueJugador == "Agua" && ataqueEnemigo == "Fuego") ||
        (ataqueJugador == "Tierra" && ataqueEnemigo == "Agua")
    ) {
        crearMensajeCombate("GANASTE");
        vidasActualesEnemigo--;
        vidasEnemigo.innerHTML = `<span style="${addSpace}">${heartIcon}</span>`.repeat(vidasActualesEnemigo) + 
                                 `<span style="${heartLoseStyle} ${addSpace}">${heartIcon}</span>`.repeat(mokeponEnemigoSeleccionado.vida - vidasActualesEnemigo);
    } else {
        crearMensajeCombate("PERDISTE");
        vidasActualesJugador--;
        vidasJugador.innerHTML = `<span style="${addSpace}">${heartIcon}</span>`.repeat(vidasActualesJugador) + 
                                 `<span style="${heartLoseStyle} ${addSpace}">${heartIcon}</span>`.repeat(mokeponSeleccionado.vida - vidasActualesJugador);
    }

    revisarVidas();
}

function revisarVidas() {
    if (vidasActualesEnemigo == 0) {
        mostrarPantallaFinal(1);
    } else if (vidasActualesJugador == 0) {
        mostrarPantallaFinal(0);
    }
}

function crearMensajeCombate(resultadoDeAtaque) {
    let nuevoAtaqueDelJugador = document.createElement("p");
    let nuevoAtaqueDelEnemigo = document.createElement("p");
    let nuevaEfectividadDelJugador = document.createElement("p");
    let nuevaEfectividadDelEnemigo = document.createElement("p");
    let auxPlayerShadowColor;
    let auxEnemyShadowColor;
    let auxResultShadowColor;
    
    if (resultadoDeAtaque == "GANASTE") {
        efectividadJugadorIcono = "✔&#xFE0E;";
        efectividadEnemigoIcono = "✘&#xFE0E;"; 
        auxResultShadowColor = auxPlayerShadowColor = "0 0 0 green";
        auxEnemyShadowColor = "0 0 0 red";
    } else if (resultadoDeAtaque == "PERDISTE") {
        efectividadJugadorIcono = "✘&#xFE0E;";
        efectividadEnemigoIcono = "✔&#xFE0E;";
        auxResultShadowColor = auxPlayerShadowColor = "0 0 0 red";
        auxEnemyShadowColor = "0 0 0 green";
    } else {
        efectividadJugadorIcono = efectividadEnemigoIcono = "❙ ❙&#xFE0E;";
        auxResultShadowColor = auxPlayerShadowColor = auxEnemyShadowColor = "0 0 0 black";
    }

    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    ataquesDelJugador.prepend(nuevoAtaqueDelJugador);
    
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;
    ataquesDelEnemigo.prepend(nuevoAtaqueDelEnemigo);

    resultadoDeCombate.innerHTML = resultadoDeAtaque;
    resultadoDeCombate.style.color = "transparent";
    resultadoDeCombate.style.textShadow = auxResultShadowColor;

    nuevaEfectividadDelJugador.innerHTML = efectividadJugadorIcono;
    nuevaEfectividadDelJugador.style.color = "transparent";
    nuevaEfectividadDelJugador.style.textShadow = auxPlayerShadowColor;
    efectividadDeAtaqueJugador.prepend(nuevaEfectividadDelJugador);
    
    nuevaEfectividadDelEnemigo.innerHTML = efectividadEnemigoIcono;
    nuevaEfectividadDelEnemigo.style.color = "transparent";
    nuevaEfectividadDelEnemigo.style.textShadow = auxEnemyShadowColor;
    efectividadDeAtaqueEnemigo.prepend(nuevaEfectividadDelEnemigo);
}

function reiniciarJuego() {
    window.location.reload();
}

function mostrarPantallaFinal(esGanador) {
    // ocultar botones de ataque y subtitulo seleccionar ataque
    ocultarBotonesDeAtaques();
    ocultarSubtituloSeleccionarAtaque();

    // mostrar resultado final
    if (esGanador == 1) resultadoDeCombate.innerHTML = "¡Felicidades! Has ganado el juego.";
    else resultadoDeCombate.innerHTML = "Lo siento, has perdido el juego.";

    mostrarBotonReiniciar();
}

function ocultarSeleccionDeAtaques() {
    seleccionarAtaque.style.display = "none";
}

function mostrarSeleccionDeAtaques() {
    seleccionarAtaque.style.display = "flex";
}

function ocultarBotonesDeAtaques() {
    contenedorDeBotonesDeAtaques.style.display = "none";
}

function mostrarBotonesDeAtaques() {
    contenedorDeBotonesDeAtaques.style.display = "flex";
}

function ocultarBotonReiniciar() {
    botonReiniciar.style.display = "none";
}

function mostrarBotonReiniciar() {
    botonReiniciar.style.display = "flex";
}

function ocultarSeleccionMascota() {
    sectionSeleccionarMascota.style.display = "none";
}

function mostrarSeleccionMascota() {
    sectionSeleccionarMascota.style.display = "flex";
}

function ocultarSubtituloSeleccionarAtaque() {
    titleSeleccionarAtaque.style.display = "none";
}

function mostrarSubtituloSeleccionarAtaque() {
    titleSeleccionarAtaque.style.display = "flex";
}

function seleccionarTarjetaDeMokepon(tarjeta) {
    // CASO: DESELECCIÓN (Cuando ya tiene el borde/clase de selección)
    // Usamos classList que es más seguro que style.border
    if (tarjeta.classList.contains("seleccionada")) {
        tarjeta.classList.remove("seleccionada");

        // Restaurar todas las tarjetas al estado normal
        tarjetas.forEach(function (tarjetaActual) {
            tarjetaActual.classList.remove("no-seleccionada");
        });

        idMascotaSeleccionada = "";
        return; 
    }
    
    // CASO: SELECCIÓN NUEVA
    // Primero limpiamos absolutamente todo para empezar de cero
    tarjetas.forEach(function (tarjetaActual) {
        tarjetaActual.classList.remove("seleccionada");
        tarjetaActual.classList.add("no-seleccionada");
    });

    // Ahora aplicamos la selección solo a la que clickeamos
    tarjeta.classList.add("seleccionada");
    tarjeta.classList.remove("no-seleccionada");

    idMascotaSeleccionada = tarjeta.htmlFor;
}

function mostrarBotonSeleccionarMascota() {
    btnSeleccionarMascota.style.display = "flex";
}

window.addEventListener("load", iniciarJuego);