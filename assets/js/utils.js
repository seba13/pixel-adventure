let titulo = document.getElementById('titulo');
let texto = titulo.dataset.titulo.split('');
let panelPrincipal = document.querySelector('.principal');
let panelJugar = document.querySelector('.secundario');
let botonJugar = document.getElementById('boton-jugar');
let botonPuntuaciones = document.getElementById('boton-puntuaciones');
let form = document.querySelector('.panel-jugador');
let formDatosJugador = document.querySelector(".formulario-datos-jugador");

let nombreJugador = document.getElementById("nombre-jugador");

let botonInciarJuego = document.getElementById("iniciar-juego");

window.addEventListener('load', function (e) {
	botonJugar.focus();
});

document.addEventListener('keydown', (e) => {
	if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {
		if (botonJugar == document.activeElement) {
			botonPuntuaciones.focus();
		} else {
			if (botonPuntuaciones == document.activeElement) {
				botonJugar.focus();
			}
		}
	}
});

texto.forEach((letra, index, arr) => {
	if(letra != ' ') {
        titulo.innerHTML += `<span style="--i:${0.2 * index }s" class="texto-animado">${letra}</span>`;
    }else {
        titulo.innerHTML += `<span>${letra}</span>`;
    }

});

titulo.addEventListener('animationend', (e) => {

    e.target.classList.remove('texto-animado')
    
    setTimeout(()=>{
        e.target.classList.add('texto-animado')
    },texto.length*.2 - .2)
})


form.addEventListener('submit', (e) => {
	e.preventDefault();
});

formDatosJugador.addEventListener("submit", (e) => {
    e.preventDefault()
})

botonJugar.addEventListener('click', (e) => {
	panelPrincipal.classList.add('ocultar');
	panelJugar.classList.remove('ocultar');
});


botonInciarJuego.addEventListener('click', () => {

    if(nombreJugador.value.split() != '') {
        juego.gameStart = true
        // juego.audios.audioFondo.play()
        panelJugar.classList.add('ocultar')
    }

})