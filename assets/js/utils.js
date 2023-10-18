const containerPrincipal = document.querySelector('.container-principal');

// PANEL PRINCIPAL

const panelPrincipal = document.querySelector('.principal');
// H1 QUE CONTIENE EL TEXTO A ANIMAR
let titulo = document.getElementById('titulo');
let texto = titulo.dataset.titulo.split('');

// FORMULARIO QUE CONTIENE BOTONES JUGAR Y PUNTUACIONES
const form = document.querySelector('.panel-jugador');
// BOTON QUE LLEVA AL PANEL PARA INICIAR JUEGO
const botonJugar = document.getElementById('boton-jugar');
// BOTON QUE LLEVA AL PANEL DE PUNTUACIONES
const botonPuntuaciones = document.getElementById('boton-puntuaciones');

// PANEL SECUDARIO

const panelJugar = document.querySelector('.secundario');
// CONTENEDOR DE ALERTAS
const containerAlertas = document.querySelector('.container__alertas');
// FORMULARIO PARA LLENAR DATOS DEL JUGADOR
const formDatosJugador = document.querySelector('.formulario-datos-jugador');
const nombreJugador = document.getElementById('nombre-jugador');
const botonIniciarJuego = document.getElementById('iniciar-juego');
const botonVolverJugar = document.querySelector('.boton-volver-jugar');
const botonVolverPuntuaciones = document.querySelector('.boton-volver-puntuaciones');

// PANEL TERCIARIO

const panelPuntuaciones = document.querySelector('.terciario');
const listaPuntuaciones = document.querySelector('.lista__puntuaciones');
const loader = document.querySelector('.loader');

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
	if (letra != ' ') {
		titulo.innerHTML += `<span style="--i:${0.2 * index}s" class="texto-animado">${letra}</span>`;
	} else {
		titulo.innerHTML += `<span>${letra}</span>`;
	}
});

titulo.addEventListener('animationend', (e) => {
	e.target.classList.remove('texto-animado');

	setTimeout(() => {
		e.target.classList.add('texto-animado');
	}, texto.length * 0.2 - 0.2);
});

form.addEventListener('submit', (e) => {
	e.preventDefault();
});

formDatosJugador.addEventListener('submit', (e) => {
	e.preventDefault();
});

botonJugar.addEventListener('click', () => {
	panelPrincipal.classList.remove('animacion-aparecer');
	panelPrincipal.classList.add('animacion-desaparecer');

	panelPrincipal.addEventListener('animationend', cbOcultarPanelPrincipal);

	function cbOcultarPanelPrincipal(e) {
		if (e.animationName === 'desaparecer-texto') {
			panelPrincipal.classList.add('ocultar');
			panelPuntuaciones.classList.add('ocultar');

			panelJugar.classList.remove('ocultar');
			panelJugar.classList.remove('animacion-desaparecer');
			panelJugar.classList.add('animacion-aparecer');

			panelPrincipal.removeEventListener('animationend', cbOcultarPanelPrincipal);
		}
	}
});

botonIniciarJuego.addEventListener('click', (ev) => {
	function cbOcultarPaneljugar(e) {
		if (e.animationName === 'desaparecer-texto') {
			panelJugar.classList.add('ocultar');

			if (ev.target == botonIniciarJuego) {
				juego.gameStart = true;
				juego.reproducirMusicaFondo();
			}
			panelJugar.removeEventListener('animationend', cbOcultarPaneljugar);
		}
	}

	panelJugar.addEventListener('animationend', cbOcultarPaneljugar);

	if (nombreJugador.value.split() != '') {
		panelJugar.classList.remove('animacion-aparecer');
		panelJugar.classList.add('animacion-desaparecer');
	} else {
		crearAlerta({});
	}
});

botonVolverJugar.addEventListener('click', (e) => {
	function cbOcultarPaneljugar(e) {
		if (e.animationName === 'desaparecer-texto') {
			panelJugar.classList.add('ocultar');
			panelPuntuaciones.classList.add('ocultar');

			panelPrincipal.classList.remove('ocultar');
			panelPrincipal.classList.remove('animacion-desaparecer');
			panelPrincipal.classList.add('animacion-aparecer');

			panelJugar.removeEventListener('animationend', cbOcultarPaneljugar);
		}
	}
	panelJugar.addEventListener('animationend', cbOcultarPaneljugar);

	panelJugar.classList.remove('animacion-aparecer');
	panelJugar.classList.add('animacion-desaparecer');
});

botonPuntuaciones.addEventListener('click', (e) => {
	panelPrincipal.addEventListener('animationend', cbOcultarPanelPrincipal);

	panelPrincipal.classList.remove('animacion-aparecer');
	panelPrincipal.classList.add('animacion-desaparecer');

	function cbOcultarPanelPrincipal(e) {
		if (e.animationName === 'desaparecer-texto') {
			loader.classList.remove('ocultar');
			cargarPuntuaciones()
				.then((res) => {
					if (res) {
						loader.classList.add('ocultar');

						panelPrincipal.classList.add('ocultar');
						panelJugar.classList.add('ocultar');

						panelPuntuaciones.classList.remove('ocultar');
						panelPuntuaciones.classList.remove('animacion-desaparecer');
						panelPuntuaciones.classList.add('animacion-aparecer');

						panelPrincipal.removeEventListener('animationend', cbOcultarPanelPrincipal);
					}
				})
				.catch((err) => {
					loader.classList.add('ocultar');

					panelPrincipal.classList.add('ocultar');
					panelJugar.classList.add('ocultar');

					panelPuntuaciones.classList.remove('ocultar');
					panelPuntuaciones.classList.remove('animacion-desaparecer');
					panelPuntuaciones.classList.add('animacion-aparecer');

					panelPrincipal.removeEventListener('animationend', cbOcultarPanelPrincipal);
				});
		}
	}
});

function mostrarPuntuacionesFinJuego() {
	loader.classList.remove('ocultar');
	cargarPuntuaciones()
		.then((res) => {
			if (res) {
				loader.classList.add('ocultar');
				panelPrincipal.classList.add('ocultar');
				panelJugar.classList.add('ocultar');

				panelPuntuaciones.classList.remove('ocultar');
				panelPuntuaciones.classList.remove('animacion-desaparecer');
				panelPuntuaciones.classList.add('animacion-aparecer');
			}
		})
		.catch((err) => {
			loader.classList.add('ocultar');

			panelPrincipal.classList.add('ocultar');
			panelJugar.classList.add('ocultar');

			panelPuntuaciones.classList.remove('ocultar');
			panelPuntuaciones.classList.remove('animacion-desaparecer');
			panelPuntuaciones.classList.add('animacion-aparecer');

			panelPrincipal.removeEventListener('animationend', cbOcultarPanelPrincipal);
		});
}

botonVolverPuntuaciones.addEventListener('click', (e) => {
	function cbOcultarPanelPuntuaciones(e) {
		if (e.animationName === 'desaparecer-texto') {
			panelPuntuaciones.classList.add('ocultar');

			panelPrincipal.classList.remove('ocultar');
			panelPrincipal.classList.remove('animacion-desaparecer');
			panelPrincipal.classList.add('animacion-aparecer');

			panelPuntuaciones.removeEventListener('animationend', cbOcultarPanelPuntuaciones);
		}
	}
	panelPuntuaciones.addEventListener('animationend', cbOcultarPanelPuntuaciones);
	panelPuntuaciones.classList.remove('animacion-aparecer');
	panelPuntuaciones.classList.add('animacion-desaparecer');
});

function obtenerSaltoInicial(alturaMaxima, gravedad = 0.5) {
	let salto = 0;
	let sumatoria = -1;

	while (obtenerAlturaMaxima(salto, gravedad) < alturaMaxima) {
		if (obtenerAlturaMaxima(salto + gravedad, gravedad) <= alturaMaxima) {
			salto += gravedad;
		} else {
			break;
		}
	}

	if (alturaMaxima != obtenerAlturaMaxima(salto)) {
		while (obtenerAlturaMaxima(salto) <= alturaMaxima) {
			if (obtenerAlturaMaxima(salto + 0.001) <= alturaMaxima) {
				salto += 0.001;
			} else {
				break;
			}
		}
	}
	return salto;
}

function obtenerAlturaMaxima(salto, gravedad = 0.5) {
	let alturaMaxima = 0;

	while (salto > 0) {
		alturaMaxima += salto;
		salto = salto - gravedad;
	}

	return alturaMaxima;
}
