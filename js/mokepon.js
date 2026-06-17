const TiposDeAtaques = ["Agua", "Fuego", "Tierra"];

const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

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
let victoriasJugador = 0;
let victoriasEnemigo = 0;

let idMascotaSeleccionada = "";
let mokeponSeleccionado;
let mascotaJugadorObjeto;
let mokeponEnemigoSeleccionado;
let botonesDeAtaque = [];

let indexAtaqueJugador;
let indexAtaqueEnemigo;

let lienzo = mapa.getContext("2d");
let intervalo;

let mapaBackground = new Image();
mapaBackground.src = "./assets/mokemap.png";

class Mokepon {
    ataques = [];

    constructor(nombre, imgSrc, vida, fotoMapa, x=20, y=30) {
        this.nombre = nombre;
        this.imgSrc = imgSrc;
        this.vida = vida;
        this.x = x;
        this.y = y;
        this.ancho = 40;
        this.alto = 40;
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    pintarMokepon(){ 
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

// mokepones enemigos
let hipodogeEnemigo = new Mokepon("hipodoge", "/assets/mokepons_mokepon_hipodoge_attack.png", 5, "/assets/hipodoge.png", 80, 20);
let ratigueyaEnemigo = new Mokepon("ratigueya", "/assets/mokepons_mokepon_ratigueya_attack.png", 5, "/assets/ratigueya.png", 150, 95);
let capipepoEnemigo = new Mokepon("capipepo", "/assets/mokepons_mokepon_capipepo_attack.png", 5, "/assets/capipepo.png", 200, 190);

// mokepones aliados
let hipodoge = new Mokepon("hipodoge", "/assets/mokepons_mokepon_hipodoge_attack.png", 5, "/assets/hipodoge.png");
let ratigueya = new Mokepon("ratigueya", "/assets/mokepons_mokepon_ratigueya_attack.png", 5, "/assets/ratigueya.png");
let capipepo = new Mokepon("capipepo", "/assets/mokepons_mokepon_capipepo_attack.png", 5, "/assets/capipepo.png");

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
    sectionVerMapa.style.display = "none";

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

    vidasJugador.innerHTML = `<span>${victoriasJugador}</span>`; 

    ocultarSeleccionMascota();

    // mostrarSeleccionDeAtaques();

    sectionVerMapa.style.display = "flex";
    
    iniciarMapa();

    seleccionarMascotaEnemigo();
}

function secuenciaDeAtaque() {
    botonesDeAtaque.forEach(auxBoton => auxBoton.addEventListener("click", (e) => {
        ataqueJugador.push(e.target.textContent);
        console.log(ataqueJugador);
        auxBoton.style.background = "#112f58";
        
        // dehabilitar interactivadad una vez seleccionado el ataque
        auxBoton.disabled = "true";
        auxBoton.style.pointerEvents = "none";
        
        ataqueAleatorioEnemigo();
    }));
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length-1);
    
    mokeponEnemigoSeleccionado = mokepones[mascotaAleatoria];
    spanMascotaEnemigo.innerHTML = capitalizeFirstLetter(mokeponEnemigoSeleccionado.nombre);

    vidasEnemigo.innerHTML = `<span>${victoriasEnemigo}</span>`;

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

    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length == 5) combate()
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function esEfectivo(efctJugador, efctEnemigo) {
    let rtn = false;

    // casos de victoria
    if (efctJugador == "Fuego" && efctEnemigo == "Tierra") rtn = true;
    if (efctJugador == "Agua" && efctEnemigo == "Fuego") rtn = true;
    if (efctJugador == "Tierra" && efctEnemigo == "Agua") rtn = true;

    return rtn
}

function combate() {
    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] == ataqueEnemigo[i]) {
            indexAmbosOponentes(i, i);
            crearMensajeCombate("EMPATE");
        } else { 
            if (esEfectivo(ataqueJugador[i], ataqueEnemigo[i])) {
                // gana jugador
                indexAmbosOponentes(i, i);
                crearMensajeCombate("GANASTE");
                victoriasJugador++;
                vidasJugador.innerHTML = victoriasJugador;
            }
            else {
                // gana enemigo
                indexAmbosOponentes(i, i);
                crearMensajeCombate("PERDISTE");
                victoriasEnemigo++;
                vidasEnemigo.innerHTML = victoriasEnemigo;
            }
        }
    }

    mostrarPantallaFinal(victoriasJugador > victoriasEnemigo ? 1 : victoriasEnemigo > victoriasJugador ? -1 : 0);
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

    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    ataquesDelJugador.prepend(nuevoAtaqueDelJugador);
    
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;
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

function mostrarPantallaFinal(resFinal) {
    // ocultar botones de ataque y subtitulo seleccionar ataque
    ocultarBotonesDeAtaques();
    ocultarSubtituloSeleccionarAtaque();

    // mostrar resultado final
    if (resFinal == 1) {
        resultadoDeCombate.style.textShadow = "0 0 0 green";
        resultadoDeCombate.innerHTML = "¡Felicidades! Has ganado el juego.";
    }
    else if (resFinal == -1) {
        resultadoDeCombate.style.textShadow = "0 0 0 red";
        resultadoDeCombate.innerHTML = "Lo siento, has perdido el juego.";
    }
    else {
        resultadoDeCombate.style.textShadow = "0 0 0 black";
        resultadoDeCombate.innerHTML = "Has empatado el juego.";
    }

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

function pintarCanvas() {
    // reset de velocidad
    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);

    // pintar mapa
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height   
    );

    // pintar personajes enemigos
    hipodogeEnemigo.pintarMokepon();
    capipepoEnemigo.pintarMokepon();
    ratigueyaEnemigo.pintarMokepon();

    // pintar personajes aliados
    mascotaJugadorObjeto.pintarMokepon();
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5;
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5;
}
function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5;
}
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5;
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(e) {
    // console.log(e)
    switch (e.key) {
        case 'ArrowRight':
            moverDerecha();
            break;
        case 'ArrowLeft':
            moverIzquierda();
            break;
        case 'ArrowDown':
            moverAbajo();
            break;
        case 'ArrowUp':
            moverArriba();
            break;
        default:
            console.log(`Tecla de movimiento invalida! → ${e.key === ' '? 'SpaceBar': e.key}`)
            break;
    }
}

function iniciarMapa() {
    mapa.width = 320;
    mapa.height = 240;

    mascotaJugadorObjeto = obtenerObjetoMascota();

    intervalo = setInterval(pintarCanvas, 50);

    window.addEventListener('keydown', sePresionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento);
}

function obtenerObjetoMascota() {
    return mokepones.find((mokepon) => mokepon.nombre == idMascotaSeleccionada);
}

window.addEventListener("load", iniciarJuego);