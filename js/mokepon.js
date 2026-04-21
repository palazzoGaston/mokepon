let labelHipodoge;
let labelCapipepo;
let labelRatigueya;

let botonMascotaJugador = document.getElementById("boton-mascota");
let botonFuego = document.getElementById("boton-fuego");
let botonAgua = document.getElementById("boton-agua");
let botonTierra = document.getElementById("boton-tierra");
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

let btnSeleccionarMascota = document.getElementById("seleccionar-mascota");
let titleSeleccionarAtaque = document.getElementById("subtitulo-seleccionar-ataque");
let seleccionarAtaque = document.getElementById("seleccionar-ataque");

let contenedorDeTarjetas = document.getElementById("contenedor-de-tarjetas");
let tarjetas;

let efectividadJugadorIcono;
let efectividadEnemigoIcono;

let mokepones = [];
let ataqueJugador;
let ataqueEnemigo;
let opcionDemokepones;
let vidasJugadorNum = 3;
let vidasEnemigoNum = 3;

let heartIcon = "❤️";
let heartLoseStyle = 'color: transparent; text-shadow: 0 0 0 #A9A9A9; filter: blur(0.5px) drop-shadow(1px 1px 1px #555);';
let addSpace = 'margin-right: 4px;';

let idMascotaSeleccionada = "";

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
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌱", id: "boton-tierra"},
)

ratigueya.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-tierra"},
)

capipepo.ataques.push(
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
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

    addEventListeners();
    ocultarBotonReiniciar();
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

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
    botonFuego.addEventListener("click", ataqueFuego);
    botonAgua.addEventListener("click", ataqueAgua);
    botonTierra.addEventListener("click", ataqueTierra);
    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
    if (idMascotaSeleccionada == "") {
        alert("Selecciona una mascota");
        return;
    }

    spanMascotaJugador.innerHTML = capitalizeFirstLetter(idMascotaSeleccionada);

    vidasJugador.innerHTML = `<span style="${addSpace}">${heartIcon}</span>`.repeat(vidasJugadorNum);
    vidasEnemigo.innerHTML = `<span style="${addSpace}">${heartIcon}</span>`.repeat(vidasEnemigoNum);

    ocultarSeleccionMascota();
    mostrarSeleccionDeAtaques();
    seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length-1);
    spanMascotaEnemigo.innerHTML = capitalizeFirstLetter(mokepones[mascotaAleatoria].nombre);
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function ataqueFuego() {
    ataqueJugador = "Fuego";
    ataqueAleatorioEnemigo();
}

function ataqueAgua() {
    ataqueJugador = "Agua";
    ataqueAleatorioEnemigo();
}

function ataqueTierra() {
    ataqueJugador = "Tierra";
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);

    switch (ataqueAleatorio) {
        case 1:
            ataqueEnemigo = "Fuego";
            break;
        case 2:
            ataqueEnemigo = "Agua";
            break;
        case 3:
            ataqueEnemigo = "Tierra";
            break;
        default:
            break;
    }

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
        vidasEnemigoNum--;
        vidasEnemigo.innerHTML = `<span style="${addSpace}">${heartIcon}</span>`.repeat(vidasEnemigoNum) + 
                                 `<span style="${heartLoseStyle} ${addSpace}">${heartIcon}</span>`.repeat(3 - vidasEnemigoNum);
    } else {
        crearMensajeCombate("PERDISTE");
        vidasJugadorNum--;
        vidasJugador.innerHTML = `<span style="${addSpace}">${heartIcon}</span>`.repeat(vidasJugadorNum) + 
                                 `<span style="${heartLoseStyle} ${addSpace}">${heartIcon}</span>`.repeat(3 - vidasJugadorNum);
    }

    revisarVidas();
}

function revisarVidas() {
    if (vidasEnemigoNum == 0) {
        mostrarPantallaFinal(1);
    } else if (vidasJugadorNum == 0) {
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
    botonFuego.style.display = "none";
    botonAgua.style.display = "none";
    botonTierra.style.display = "none";
}

function mostrarBotonesDeAtaques() {
    botonFuego.style.display = "flex";
    botonAgua.style.display = "flex";
    botonTierra.style.display = "flex";
}

function ocultarBotonReiniciar() {
    botonReiniciar.style.display = "none";
}

function mostrarBotonReiniciar() {
    botonReiniciar.style.display = "flex";
}

function ocultarSeleccionMascota() {
    btnSeleccionarMascota.style.display = "none";
}

function mostrarSeleccionMascota() {
    btnSeleccionarMascota.style.display = "flex";
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

window.addEventListener("load", iniciarJuego);