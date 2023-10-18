class Juego {
	constructor() {
		this.gameStart = false;
		this.gameOver = false;
		this.idAnimation = null;
		this.fps = 0;
		this.establecerFPS = false;
		this.contadorSeg = 0;

		// this.proporcionResolucion = Math.min(canvas.width / 1920, canvas.height / 1333);
		this.proporcionResolucion = Math.round(Math.min(canvas.width / 1920, canvas.height / 1333) * 100) / 100;

		this.proporcionesFPS = {
			proporcionLimiteCuadros: Math.round(((1000 / this.fps) * 1) / (1000 / 165)),
			proporcionMovimiento: Math.round(((1000 / this.fps) * 1) / (1000 / 165)),
			proporcionMovimientoEnemigo: Math.round(((1000 / this.fps) * 1) / (1000 / 165)),
			proporcionSalto: Math.round(((1000 / this.fps) * 1) / (1000 / 165)),
		};

		this.proporcionesFPS.proporcionMovimiento = (canvas.width * this.proporcionesFPS.proporcionMovimiento) / 2560;

		this._gravedad = 1;
		this.saltoPersonaje = obtenerSaltoInicial((canvas.height * obtenerAlturaMaxima(obtenerSaltoInicial(410, this.gravedad))) / 1333);
		this.ultimoTiempo = 1;
		this.contadorTiempoFps = 0;
		this.contadorFps = 0;
		this.deltaTiempo = 0;

		this._controles = {
			ArrowUp: {
				presionada: false,
			},
			w: {
				presionada: false,
			},
			ArrowDown: {
				presionada: false,
			},
			ArrowLeft: {
				presionada: false,
			},
			a: {
				presionada: false,
			},
			ArrowRight: {
				presionada: false,
			},
			d: {
				presionada: false,
			},
			' ': {
				presionada: false,
			},
		};

		this.proporciones = {
			ayuda: {
				libro: Math.ceil(2 * this.proporcionResolucion),
				botonCerrar: Math.ceil(1 * this.proporcionResolucion),
				check: Math.ceil(2 * this.proporcionResolucion),
				teclas: Math.ceil(2 * this.proporcionResolucion),
				cerrar: Math.ceil(1 * this.proporcionResolucion),
			},
			pocion: Math.ceil(2 * this.proporcionResolucion),
			texto: Math.ceil(2 * this.proporcionResolucion),
			personaje: Math.ceil(4 * this.proporcionResolucion),
			barraVida: Math.ceil(3 * this.proporcionResolucion),
			barraEnergia: Math.ceil(3 * this.proporcionResolucion),
			barraPuntuaciones: Math.ceil(3 * this.proporcionResolucion),
			escenario: Math.ceil(3 * this.proporcionResolucion),
			bolaFuego: Math.ceil(2 * this.proporcionResolucion),
			impacto: Math.ceil(4 * this.proporcionResolucion),
			enemigos: {
				samurai: {
					proporcion: Math.ceil(4 * this.proporcionResolucion),
					alcanceVigilar: Math.ceil(100 * this.proporcionResolucion),
				},
				jabali: {
					proporcion: Math.ceil(4 * this.proporcionResolucion),
					alcanceVigilar: Math.ceil(100 * this.proporcionResolucion),
				},
				caballeroOscuro: {
					proporcion: Math.ceil(4 * this.proporcionResolucion),
					alcanceVigilar: Math.ceil(100 * this.proporcionResolucion),
				},
				minotauro: {
					proporcion: Math.ceil(4 * this.proporcionResolucion),
					alcanceVigilar: Math.ceil(100 * this.proporcionResolucion),
				},

				humo: Math.ceil(4 * this.proporcionResolucion),
			},
			fondo: {
				montaña_1: Math.ceil(3 * this.proporcionResolucion),
				montaña_2: Math.ceil(2.5 * this.proporcionResolucion),
				montaña_3: Math.ceil(3 * this.proporcionResolucion),
				montaña_4: Math.ceil(3.5 * this.proporcionResolucion),
				montaña_5: Math.ceil(4.1 * this.proporcionResolucion),
				nube_1: Math.ceil(2 * this.proporcionResolucion),
				nube_2: Math.ceil(1.5 * this.proporcionResolucion),
				nube_3: Math.ceil(3 * this.proporcionResolucion),
			},
			plataforma: {
				suelo: Math.ceil(3 * this.proporcionResolucion),
				arbol_1: Math.ceil(3 * this.proporcionResolucion),
				arbol_2: Math.ceil(3 * this.proporcionResolucion),
				arbusto_1: Math.ceil(3 * this.proporcionResolucion),
				arbusto_2: Math.ceil(3 * this.proporcionResolucion),
				cascada: Math.ceil(1 * this.proporcionResolucion),
			},
		};

		this.imagenesAyuda = {
			abrirLibro: {
				frame_1: new Image(),
				frame_2: new Image(),
				frame_3: new Image(),
				frame_4: new Image(),
				frame_5: new Image(),
				frame_6: new Image(),
				frame_7: new Image(),
				frame_8: new Image(),
			},
			cerrarLibro: {
				frame_1: new Image(),
				frame_2: new Image(),
				frame_3: new Image(),
				frame_4: new Image(),
				frame_5: new Image(),
				frame_6: new Image(),
				frame_7: new Image(),
				frame_8: new Image(),
			},
			botonArriba: {
				frame_1: new Image(),
				frame_2: new Image(),
			},
			botonDerecha: {
				frame_1: new Image(),
				frame_2: new Image(),
			},
			botonIzquierda: {
				frame_1: new Image(),
				frame_2: new Image(),
			},
			botonW: {
				frame_1: new Image(),
				frame_2: new Image(),
			},
			botonA: {
				frame_1: new Image(),
				frame_2: new Image(),
			},
			botonD: {
				frame_1: new Image(),
				frame_2: new Image(),
			},
			botonEspacio: {
				frame_1: new Image(),
				frame_2: new Image(),
			},
			botonCerrar: new Image(),
			botonCheck: new Image(),
			botonUncheck: new Image(),
		};

		// imagenes de fondo
		this.imagenesFondo = {
			fondo: new Image(),
			montaña_1: {
				frame_1: new Image(),
				frame_2: new Image(),
				frameActual: this.frame_1,
				ancho: 210,
				plano: 'fondo',
				posicion: {
					x: 0,
					y: 0,
				},
				velocidad: {
					x: 0,
					y: 0,
				},
				offset: {
					x: 0,
					y: 0,
				},
				proporcion: 'montaña_1',
			},
			montaña_2: {
				frame_1: new Image(),
				frame_2: new Image(),
				frameActual: this.frame_1,
				plano: 'fondo',
				ancho: 369,
				posicion: {
					x: 0,
					y: 0,
				},
				velocidad: {
					x: 0,
					y: 0,
				},
				offset: {
					x: 0,
					y: 0,
				},
				proporcion: 'montaña_2',
			},
			montaña_3: {
				frame_1: new Image(),
				frame_2: new Image(),
				frameActual: this.frame_1,
				ancho: 450,
				plano: 'medio',
				posicion: {
					x: 0,
					y: 0,
				},
				velocidad: {
					x: 0,
					y: 0,
				},
				offset: {
					x: 0,
					y: 0,
				},
				proporcion: 'montaña_3',
			},
			montaña_4: {
				frame_1: new Image(),
				frame_2: new Image(),
				frameActual: this.frame_1,
				ancho: 450,
				plano: 'medio',
				ancho: 450,
				posicion: {
					x: 0,
					y: 0,
				},
				velocidad: {
					x: 0,
					y: 0,
				},
				offset: {
					x: 0,
					y: 0,
				},
				proporcion: 'montaña_4',
			},
			montaña_5: {
				frame_1: new Image(),
				frame_2: new Image(),
				frameActual: this.frame_1,
				ancho: 450,
				plano: 'principal',
				posicion: {
					x: 0,
					y: 0,
				},
				velocidad: {
					x: 0,
					y: 0,
				},
				offset: {
					x: 0,
					y: 0,
				},
				proporcion: 'montaña_5',
			},
			nube_1: {
				frame_1: new Image(),
				frame_2: new Image(),
				frameActual: this.frame_1,
				plano: 'medio',
				posicion: {
					x: 0,
					y: 0,
				},
				velocidad: {
					x: 0,
					y: 0,
				},
				offset: {
					x: 0,
					y: 0,
				},
				proporcion: 'nube_1',
			},
			nube_2: {
				frame_1: new Image(),
				frame_2: new Image(),
				frameActual: this.frame_1,
				plano: 'fondo',
				posicion: {
					x: 0,
					y: 0,
				},
				velocidad: {
					x: 0,
					y: 0,
				},
				offset: {
					x: 0,
					y: 0,
				},
				proporcion: 'nube_2',
			},
			nube_3: {
				frame_1: new Image(),
				frame_2: new Image(),
				frameActual: this.frame_1,
				plano: 'principal',
				posicion: {
					x: 0,
					y: 0,
				},
				velocidad: {
					x: 0,
					y: 0,
				},
				offset: {
					x: 0,
					y: 0,
				},
				proporcion: 'nube_3',
			},
		};

		this.imagenesEnemigos = {
			samurai: new Image(),
			muerte: new Image(),
			jabali: new Image(),
			caballeroOscuro: new Image(),
			minotauro: new Image(),
			pocion: new Image(),
		};

		this.tilesetJugador = {
			tileset: new Image(),
			contenedorVida: new Image(),
			contenedorEnergia: new Image(),
			barraVida: new Image(),
			barraEnergia: new Image(),
			tilesetVida: new Image(),
			tilesetEnergia: new Image(),
			tilesetPuntuacion: new Image(),
			bolaFuego: new Image(),
			impactoAtaque: new Image(),
		};

		// tileset escenario
		this.tilesetEscenario = {
			tileset: new Image(),
			tilesetSuelo: {
				suelo_0_0: new Image(),
				suelo_0_1: new Image(),
				suelo_0_2: new Image(),
				suelo_0_3: new Image(),
				suelo_0_4: new Image(),
				suelo_1_0: new Image(),
				suelo_1_1: new Image(),
				suelo_1_2: new Image(),
				suelo_1_3: new Image(),
				suelo_1_4: new Image(),
				suelo_2_0: new Image(),
				suelo_2_1: new Image(),
				suelo_2_2: new Image(),
				suelo_2_3: new Image(),
				suelo_2_4: new Image(),
				suelo_3_0: new Image(),
				suelo_3_1: new Image(),
				suelo_3_2: new Image(),
				suelo_3_3: new Image(),
				suelo_3_4: new Image(),
			},
			tilesetArbol_1: new Image(),
			tilesetArbol_2: new Image(),
			tilesetArbusto_1: new Image(),
			tilesetArbusto_2: new Image(),
			tilesetCascada: {
				cascada_1: new Image(),
				cascada_2: new Image(),
				cascada_3: new Image(),
				cascada_4: new Image(),
				cascada_5: new Image(),
			},
		};
	}

	get gravedad() {
		return this._gravedad;
	}

	set gravedad(gravedad) {
		this._gravedad = gravedad;
	}

	get controles() {
		return this._controles;
	}

	async cargarAssets() {
		let cargarAssets = [this.cargarImagenesFondo(), this.cargarTileset(), this.cargarAudios(), this.cargarImagenJugador(), this.cargarImagenesEnemigos(), this.cargarImagenesAyuda()];

		let cargado = await Promise.all(cargarAssets);

		if (cargado) {
			this.cargarEscenario();
			this.cargarAyuda();
			this.cargarPersonaje();
			this.escucharEventos();
		}

		return cargado;
	}

	cargarEscenario() {
		this.fondo = new Fondo({
			posicion: {
				x: 0,
				y: 0,
			},
			velocidad: {
				x: 0,
				y: 0,
			},
			imagenes: this.imagenesFondo,
			contadorLimiteCuadros: 48,
			escenario: new Escenario({
				plataformas: [
					new Plataforma({
						posicion: {
							x: Math.round(800 * this.proporcionResolucion),
							// y: Math.floor((canvas.height - 535) / 32) * 32
							y: Math.floor(canvas.height - Math.floor(300 * this.proporcionResolucion)),
						},
						width: Math.floor(384 * 4 * this.proporcionResolucion),
						imagenes: this.tilesetEscenario,
						offset: {
							x: 16,
							y: 28,
						},
					}),
				],
			}),
		});
	}

	cargarPersonaje() {
		this.personaje = new Jugador({
			posicion: {
				x: this.fondo.escenario.plataformas[0].posicion.x + 50,
				y: 0,
			},
			velocidad: {
				x: 0,
				y: 0,
			},
			offset: {
				x: 20 * this.proporciones.personaje,
				y: 0,
			},
			imagenes: this.tilesetJugador,
			ataques: [],
		});
	}

	cargarAyuda() {
		this.ayuda = new Ayuda({
			posicion: {
				x: canvas.width / 2 - (this.imagenesAyuda.abrirLibro.frame_1.width / 2) * this.proporciones.ayuda.libro,
				y: canvas.height / 2 - (this.imagenesAyuda.abrirLibro.frame_1.height / 2) * this.proporciones.ayuda.libro,
			},
			velocidad: {
				x: 0,
				y: 0,
			},
			offset: {
				x: 20 * this.proporciones.personaje,
				y: 0,
			},
			imagenes: this.imagenesAyuda,
			ataques: [],
		});
	}

	escucharEventos() {
		document.addEventListener('keydown', this.moverJugador.bind(this));
		document.addEventListener('keyup', this.detenerJugador.bind(this));
		window.addEventListener('blur', this.detenerAcciones.bind(this));
		this.audios.audioFondo.addEventListener(
			'ended',
			function () {
				if (!this.gameStart) {
					this.audios.audioFondo.volume = 0.3;
					this.audios.audioFondo.play();
				}
			}.bind(this),
		);

		this.audios.audioFondo_2.addEventListener(
			'ended',
			function () {
				if (this.gameStart) {
					this.audios.audioFondo_2.volume = 0.3;
					this.audios.audioFondo_2.play();
				}
			}.bind(this),
		);

		this.audios.audioViento.addEventListener(
			'ended',
			function () {
				if (this.gameStart) {
					this.audios.audioViento.volume = 0.3;
					this.audios.audioViento.play();
				}
			}.bind(this),
		);

		document.addEventListener(
			'mousemove',
			function () {
				if (!this.gameStart) {
					this.audios.audioFondo.volume = 0.3;
					this.audios.audioFondo.play();
				}
			}.bind(this),
		);
	}

	detenerAcciones() {
		Object.keys(this.controles).forEach((tecla) => {
			this.controles[tecla].presionada = false;
		});
	}

	reproducirMusicaFondo() {
		if (this.gameStart) {
			this.audios.audioFondo.pause();

			this.audios.audioFondo_2.volume = 0.3;
			this.audios.audioFondo_2.play();

			this.audios.audioViento.volume = 0.3;
			this.audios.audioViento.play();
		}
	}

	moverJugador(e) {
		// si el juego ha comenzado el jugador se puede mover
		if (this.gameStart && this.personaje.vida > 0) {
			if (this.controles[e.key]) {
				if (e.key === 'ArrowUp' || e.key == 'w') {
					if (this.personaje.velocidad.y >= juego.gravedad) {
						if (!this.controles[e.key].presionada) {
							if (this.personaje.dobleSalto && this.personaje.saltando) {
								this.personaje.velocidad.y = -this.saltoPersonaje;
								this.personaje.dobleSalto = false;
							}

							if (!this.personaje.saltando) {
								this.personaje.saltando = true;
								this.personaje.velocidad.y = -this.saltoPersonaje;
								this.personaje.dobleSalto = true;
							}
						}
					}
				}
				if (e.key === ' ') {
					if (this.personaje.energia > 0) {
						if (!this.controles[e.key].presionada) {
							this.personaje.realizandoAtaque = true;
							this.personaje.crearAtaque();
							this.personaje.velocidad.x = 0;
							this.personaje.energia -= 1;
						}
					}
				}
				this.controles[e.key].presionada = true;
			}
		}
	}
	detenerJugador(e) {
		if (this.controles[e.key]) {
			if (e.key === 'ArrowUp') {
				// this.personaje.velocidad.y = 0
			}
			this.controles[e.key].presionada = false;
		}
	}

	async cargarTileset() {
		this.tilesetEscenario.tileset.src = '/assets/img/fondo/tilesets/tileset.png';
		this.tilesetEscenario.tilesetArbol_1.src = '/assets/img/fondo/tilesets/tileset-arbol-1.png';
		this.tilesetEscenario.tilesetArbol_2.src = '/assets/img/fondo/tilesets/tileset-arbol-2.png';
		this.tilesetEscenario.tilesetArbusto_1.src = '/assets/img/fondo/tilesets/tileset-arbusto-1.png';
		this.tilesetEscenario.tilesetArbusto_2.src = '/assets/img/fondo/tilesets/tileset-arbusto-2.png';

		this.tilesetEscenario.tilesetSuelo.suelo_0_0.src = '/assets/img/fondo/tilesets/tileset-suelo-0-0.png';
		this.tilesetEscenario.tilesetSuelo.suelo_0_1.src = '/assets/img/fondo/tilesets/tileset-suelo-0-1.png';
		this.tilesetEscenario.tilesetSuelo.suelo_0_2.src = '/assets/img/fondo/tilesets/tileset-suelo-0-2.png';
		this.tilesetEscenario.tilesetSuelo.suelo_0_3.src = '/assets/img/fondo/tilesets/tileset-suelo-0-3.png';
		this.tilesetEscenario.tilesetSuelo.suelo_0_4.src = '/assets/img/fondo/tilesets/tileset-suelo-0-4.png';
		this.tilesetEscenario.tilesetSuelo.suelo_1_0.src = '/assets/img/fondo/tilesets/tileset-suelo-1-0.png';
		this.tilesetEscenario.tilesetSuelo.suelo_1_1.src = '/assets/img/fondo/tilesets/tileset-suelo-1-1.png';
		this.tilesetEscenario.tilesetSuelo.suelo_1_2.src = '/assets/img/fondo/tilesets/tileset-suelo-1-2.png';
		this.tilesetEscenario.tilesetSuelo.suelo_1_3.src = '/assets/img/fondo/tilesets/tileset-suelo-1-3.png';
		this.tilesetEscenario.tilesetSuelo.suelo_1_4.src = '/assets/img/fondo/tilesets/tileset-suelo-1-4.png';
		this.tilesetEscenario.tilesetSuelo.suelo_2_0.src = '/assets/img/fondo/tilesets/tileset-suelo-2-0.png';
		this.tilesetEscenario.tilesetSuelo.suelo_2_1.src = '/assets/img/fondo/tilesets/tileset-suelo-2-1.png';
		this.tilesetEscenario.tilesetSuelo.suelo_2_2.src = '/assets/img/fondo/tilesets/tileset-suelo-2-2.png';
		this.tilesetEscenario.tilesetSuelo.suelo_2_3.src = '/assets/img/fondo/tilesets/tileset-suelo-2-3.png';
		this.tilesetEscenario.tilesetSuelo.suelo_2_4.src = '/assets/img/fondo/tilesets/tileset-suelo-2-4.png';
		this.tilesetEscenario.tilesetSuelo.suelo_3_0.src = '/assets/img/fondo/tilesets/tileset-suelo-3-0.png';
		this.tilesetEscenario.tilesetSuelo.suelo_3_1.src = '/assets/img/fondo/tilesets/tileset-suelo-3-1.png';
		this.tilesetEscenario.tilesetSuelo.suelo_3_2.src = '/assets/img/fondo/tilesets/tileset-suelo-3-2.png';
		this.tilesetEscenario.tilesetSuelo.suelo_3_3.src = '/assets/img/fondo/tilesets/tileset-suelo-3-3.png';
		this.tilesetEscenario.tilesetSuelo.suelo_3_4.src = '/assets/img/fondo/tilesets/tileset-suelo-3-4.png';

		//cascada
		this.tilesetEscenario.tilesetCascada.cascada_1.src = '/assets/img/fondo/cascada/cascada-1-test.png';
		this.tilesetEscenario.tilesetCascada.cascada_2.src = '/assets/img/fondo/cascada/cascada-2-test.png';
		this.tilesetEscenario.tilesetCascada.cascada_3.src = '/assets/img/fondo/cascada/cascada-3-test.png';
		this.tilesetEscenario.tilesetCascada.cascada_4.src = '/assets/img/fondo/cascada/cascada-4-test.png';
		this.tilesetEscenario.tilesetCascada.cascada_5.src = '/assets/img/fondo/cascada/cascada-5-test.png';

		let imagenes = Object.values(this.tilesetEscenario).reduce((arr, objActual) => {
			if (objActual instanceof Image) {
				arr.push(objActual);
			} else {
				arr.push(...Object.values(objActual));
			}
			return arr;
		}, []);

		imagenes = imagenes.map((img) => {
			return new Promise((resolve, reject) => {
				img.addEventListener('load', (e) => resolve(e.target));

				img.addEventListener('error', (e) => reject(e.target));
			});
		});

		let arrayImg = await Promise.all(imagenes);

		return arrayImg;
	}

	async cargarImagenesAyuda() {
		this.imagenesAyuda.abrirLibro.frame_1.src = '/assets/img/ayuda/libro/abrir-libro/1.png';
		this.imagenesAyuda.abrirLibro.frame_2.src = '/assets/img/ayuda/libro/abrir-libro/2.png';
		this.imagenesAyuda.abrirLibro.frame_3.src = '/assets/img/ayuda/libro/abrir-libro/3.png';
		this.imagenesAyuda.abrirLibro.frame_4.src = '/assets/img/ayuda/libro/abrir-libro/4.png';
		this.imagenesAyuda.abrirLibro.frame_5.src = '/assets/img/ayuda/libro/abrir-libro/5.png';
		this.imagenesAyuda.abrirLibro.frame_6.src = '/assets/img/ayuda/libro/abrir-libro/6.png';
		this.imagenesAyuda.abrirLibro.frame_7.src = '/assets/img/ayuda/libro/abrir-libro/7.png';
		this.imagenesAyuda.abrirLibro.frame_8.src = '/assets/img/ayuda/libro/abrir-libro/8.png';

		this.imagenesAyuda.cerrarLibro.frame_1.src = '/assets/img/ayuda/libro/cerrar-libro/1.png';
		this.imagenesAyuda.cerrarLibro.frame_2.src = '/assets/img/ayuda/libro/cerrar-libro/2.png';
		this.imagenesAyuda.cerrarLibro.frame_3.src = '/assets/img/ayuda/libro/cerrar-libro/3.png';
		this.imagenesAyuda.cerrarLibro.frame_4.src = '/assets/img/ayuda/libro/cerrar-libro/4.png';
		this.imagenesAyuda.cerrarLibro.frame_5.src = '/assets/img/ayuda/libro/cerrar-libro/5.png';
		this.imagenesAyuda.cerrarLibro.frame_6.src = '/assets/img/ayuda/libro/cerrar-libro/6.png';
		this.imagenesAyuda.cerrarLibro.frame_7.src = '/assets/img/ayuda/libro/cerrar-libro/7.png';
		this.imagenesAyuda.cerrarLibro.frame_8.src = '/assets/img/ayuda/libro/cerrar-libro/8.png';

		this.imagenesAyuda.botonArriba.frame_1.src = '/assets/img/ayuda/iconos/boton-arriba-1.png';
		this.imagenesAyuda.botonArriba.frame_2.src = '/assets/img/ayuda/iconos/boton-arriba-2.png';

		this.imagenesAyuda.botonDerecha.frame_1.src = '/assets/img/ayuda/iconos/boton-derecha-1.png';
		this.imagenesAyuda.botonDerecha.frame_2.src = '/assets/img/ayuda/iconos/boton-derecha-2.png';

		this.imagenesAyuda.botonIzquierda.frame_1.src = '/assets/img/ayuda/iconos/boton-izquierda-1.png';
		this.imagenesAyuda.botonIzquierda.frame_2.src = '/assets/img/ayuda/iconos/boton-izquierda-2.png';

		this.imagenesAyuda.botonW.frame_1.src = '/assets/img/ayuda/iconos/boton-w-1.png';
		this.imagenesAyuda.botonW.frame_2.src = '/assets/img/ayuda/iconos/boton-w-2.png';

		this.imagenesAyuda.botonA.frame_1.src = '/assets/img/ayuda/iconos/boton-a-1.png';
		this.imagenesAyuda.botonA.frame_2.src = '/assets/img/ayuda/iconos/boton-a-2.png';

		this.imagenesAyuda.botonD.frame_1.src = '/assets/img/ayuda/iconos/boton-d-1.png';
		this.imagenesAyuda.botonD.frame_2.src = '/assets/img/ayuda/iconos/boton-d-2.png';

		this.imagenesAyuda.botonEspacio.frame_1.src = '/assets/img/ayuda/iconos/boton-espacio-1.png';
		this.imagenesAyuda.botonEspacio.frame_2.src = '/assets/img/ayuda/iconos/boton-espacio-2.png';

		this.imagenesAyuda.botonCerrar.src = '/assets/img/ayuda/iconos/boton-cerrar.png';

		this.imagenesAyuda.botonCheck.src = '/assets/img/ayuda/iconos/boton-check.png';
		this.imagenesAyuda.botonUncheck.src = '/assets/img/ayuda/iconos/boton-uncheck.png';

		let imagenes = Object.values(this.imagenesAyuda).reduce((arr, objActual) => {
			if (objActual instanceof Image) {
				arr.push(objActual);
			} else {
				Object.values(objActual).forEach((img) => {
					arr.push(img);
				});
			}
			return arr;
		}, []);

		imagenes = imagenes.map((img) => {
			return new Promise((resolve, reject) => {
				img.addEventListener('load', (e) => resolve(e.target));

				img.addEventListener('error', (e) => reject(e.target));
			});
		});

		let arrayImg = await Promise.all(imagenes);

		return arrayImg;
	}

	async cargarImagenesFondo() {
		// fondo
		this.imagenesFondo.fondo.src = '/assets/img/fondo/montañas/Background.png';

		// montaña 1
		this.imagenesFondo.montaña_1.frame_1.src = 'assets/img/fondo/montañas/Layer 1 anim1.png';
		this.imagenesFondo.montaña_1.frame_2.src = '/assets/img/fondo/montañas/Layer 1 anim2.png';

		// montaña 2
		this.imagenesFondo.montaña_2.frame_1.src = '/assets/img/fondo/montañas/Layer 2 anim1.png';
		this.imagenesFondo.montaña_2.frame_2.src = '/assets/img/fondo/montañas/Layer 2 anim2.png';

		// montaña 3
		this.imagenesFondo.montaña_3.frame_1.src = '/assets/img/fondo/montañas/Layer 3 anim1.png';
		this.imagenesFondo.montaña_3.frame_2.src = '/assets/img/fondo/montañas/Layer 3 anim2.png';

		// montaña 4
		this.imagenesFondo.montaña_4.frame_1.src = '/assets/img/fondo/montañas/Layer 4 anim1.png';
		this.imagenesFondo.montaña_4.frame_2.src = '/assets/img/fondo/montañas/Layer 4 anim2.png';

		// montaña 5
		this.imagenesFondo.montaña_5.frame_1.src = '/assets/img/fondo/montañas/Layer 6 anim1.png';
		this.imagenesFondo.montaña_5.frame_2.src = '/assets/img/fondo/montañas/Layer 6 anim2.png';

		// nube 1
		this.imagenesFondo.nube_1.frame_1.src = '/assets/img/fondo/montañas/Layer 1 clound anim1.png';
		this.imagenesFondo.nube_1.frame_2.src = '/assets/img/fondo/montañas/Layer 1 clound anim2.png';

		// nube 2
		this.imagenesFondo.nube_2.frame_1.src = '/assets/img/fondo/montañas/Layer 3 clound anim1.png';
		this.imagenesFondo.nube_2.frame_2.src = '/assets/img/fondo/montañas/Layer 3 clound anim2.png';

		// nube 3
		this.imagenesFondo.nube_3.frame_1.src = '/assets/img/fondo/montañas/Layer 5 anim1.png';
		this.imagenesFondo.nube_3.frame_2.src = '/assets/img/fondo/montañas/Layer 5 anim2.png';

		let imagenes = Object.values(this.imagenesFondo).reduce((arr, objActual) => {
			if (objActual instanceof Image) {
				arr.push(objActual);
			} else {
				if (objActual.frame_1 && objActual.frame_1 instanceof Image) {
					arr.push(objActual.frame_1);
				}
				if (objActual.frame_2 && objActual.frame_2 instanceof Image) {
					arr.push(objActual.frame_2);
				}
				if (objActual.frame_3 && objActual.frame_3 instanceof Image) {
					arr.push(objActual.frame_3);
				}
				if (objActual.frame_4 && objActual.frame_4 instanceof Image) {
					arr.push(objActual.frame_4);
				}
				if (objActual.frame_5 && objActual.frame_5 instanceof Image) {
					arr.push(objActual.frame_5);
				}
			}
			return arr;
		}, []);

		imagenes = imagenes.map((img) => {
			return new Promise((resolve, reject) => {
				img.addEventListener('load', (e) => resolve(e.target));

				img.addEventListener('error', (e) => reject(e.target));
			});
		});

		let arrayImg = await Promise.all(imagenes);

		return arrayImg;
	}

	async cargarImagenJugador() {
		this.tilesetJugador.tileset.src = '/assets/img/personaje/personaje-2.png';

		this.tilesetJugador.contenedorEnergia.src = '/assets/img/personaje/estadisticas/contenedor-energia.png';
		this.tilesetJugador.contenedorVida.src = '/assets/img/personaje/estadisticas/contenedor-vida.png';
		this.tilesetJugador.barraEnergia.src = '/assets/img/personaje/estadisticas/barra-energia.png';
		this.tilesetJugador.barraVida.src = '/assets/img/personaje/estadisticas/barra-vida.png';

		this.tilesetJugador.tilesetVida.src = '/assets/img/personaje/estadisticas/vida.png';
		this.tilesetJugador.tilesetEnergia.src = '/assets/img/personaje/estadisticas/energia.png';
		this.tilesetJugador.tilesetPuntuacion.src = '/assets/img/personaje/estadisticas/puntuacion.png';
		// this.tilesetJugador.bolaFuego.src = '/assets/img/personaje/ataque/bola-fuego.png'
		this.tilesetJugador.bolaFuego.src = '/assets/img/personaje/ataque/bola-fuego-2.png';
		this.tilesetJugador.impactoAtaque.src = '/assets/img/personaje/ataque/impacto-ataque-3.png';

		let imagenes = Object.values(this.tilesetJugador).reduce((arr, objActual) => {
			if (objActual instanceof Image) {
				arr.push(objActual);
			}
			return arr;
		}, []);

		imagenes = imagenes.map((img) => {
			return new Promise((resolve, reject) => {
				img.addEventListener('load', (e) => resolve(e.target));

				img.addEventListener('error', (e) => reject(e.target));
			});
		});

		let arrayImg = await Promise.all(imagenes);

		return arrayImg;
	}

	async cargarImagenesEnemigos() {
		this.imagenesEnemigos.samurai.src = '/assets/img/enemigos/enemigo-1/samurai.png';
		this.imagenesEnemigos.muerte.src = '/assets/img/enemigos/muerte/humo-1.png';
		this.imagenesEnemigos.jabali.src = '/assets/img/enemigos/enemigo-3/jabali.png';
		this.imagenesEnemigos.caballeroOscuro.src = '/assets/img/enemigos/enemigo-5/caballero-oscuro.png';
		this.imagenesEnemigos.minotauro.src = '/assets/img/enemigos/enemigo-4/minotauro.png';
		this.imagenesEnemigos.pocion.src = '/assets/img/items/pocion.png';

		let imagenes = Object.values(this.tilesetJugador).reduce((arr, objActual) => {
			if (objActual instanceof Image) {
				arr.push(objActual);
			}
			return arr;
		}, []);

		imagenes = imagenes.map((img) => {
			return new Promise((resolve, reject) => {
				img.addEventListener('load', (e) => resolve(e.target));

				img.addEventListener('error', (e) => reject(e.target));
			});
		});

		let arrayImg = await Promise.all(imagenes);

		return arrayImg;
	}

	async cargarAudios() {
		this.audios = {
			audioFondo: new Audio('./assets/audio/audio-fondo.ogg'),
			audioViento: new Audio('./assets/audio/audio-viento.mp3'),
			audioFondo_2: new Audio('./assets/audio/audio-fondo-2.ogg'),
		};

		let audios = Object.values(this.imagenesFondo).reduce((arr, objActual) => {
			if (objActual instanceof Audio) {
				arr.push(objActual);
			}
			return arr;
		}, []);

		audios = audios.map((audio) => {
			return new Promise((resolve, reject) => {
				audio.addEventListener('load', (e) => resolve(e.target));

				audio.addEventListener('error', (e) => reject(e.target));
			});
		});

		let arrayAudios = await Promise.all(audios);

		return arrayAudios;
	}

	iniciar() {
		this.idAnimation = requestAnimationFrame((timestamp) => this.animar(timestamp));
	}

	animar(timestamp) {
		this.deltaTiempo = timestamp - this.ultimoTiempo;
		this.contadorFps++;
		this.contadorTiempoFps += this.deltaTiempo;
		this.ultimoTiempo = timestamp;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if (this.contadorTiempoFps >= 1000) {
			this.fps = this.contadorFps;
			this.contadorFps = 0;
			this.contadorTiempoFps = 0;

			this.definirProporciones();

			this.contadorSeg++;

			// fps.textContent = this.fps

			ctx.fillText(this.fps + 'fps', 0, 0);
		}

		// this.dibujar();

		this.fondo.actualizarSprite(this.deltaTiempo);

		// this.escenario.actualizarSprite()

		if (this.gameStart) {
			this.personaje.actualizarSprite(this.deltaTiempo);

			if (!sessionStorage.getItem('ocultarAyuda')) {
				this.ayuda.actualizarSprite();
			}
		}

		if (!this.gameOver) {
			this.idAnimation = requestAnimationFrame((timestamp) => this.animar(timestamp));
		}
	}

	definirProporciones() {
		if (this.fps >= 140 && !this.establecerFPS) {
			if (this.contadorSeg >= 2) {
				this.establecerFPS = true;
			}
			this.proporcionesFPS.proporcionLimiteCuadros = Math.round(((1000 / 165) * 1) / (1000 / 165));
			this.proporcionesFPS.proporcionMovimiento = Math.round(((1000 / 165) * 1) / (1000 / 165));
			this.proporcionesFPS.proporcionMovimientoEnemigo = Math.round(((1000 / 165) * 1) / (1000 / 165));
			this.proporcionesFPS.proporcionSalto = Math.round(((1000 / 166) * 1) / (1000 / 165));

			this.gravedad = (60 * 1.2) / this.fps;

			this.saltoPersonaje = obtenerSaltoInicial((canvas.height * obtenerAlturaMaxima(obtenerSaltoInicial(410, this.gravedad))) / 1333);

			if (canvas.width <= 1920 && canvas > 1366) {
				this.proporcionesFPS.proporcionLimiteCuadros = 1;
				this.proporcionesFPS.proporcionMovimiento = 1;
				this.proporcionesFPS.proporcionMovimientoEnemigo = 1;
				this.proporcionesFPS.proporcionSalto = 1;

				// this.proporcionesFPS.proporcionLimiteCuadros = Math.ceil((canvas.width * this.proporcionesFPS.proporcionLimiteCuadros) / 2560);
				// this.proporcionesFPS.proporcionMovimiento = Math.ceil((canvas.width * this.proporcionesFPS.proporcionMovimiento) / 2560);
				// this.proporcionesFPS.proporcionMovimientoEnemigo = Math.ceil((canvas.width * this.proporcionesFPS.proporcionMovimientoEnemigo) / 2560);
				// this.proporcionesFPS.proporcionSalto = Math.ceil((canvas.width * this.proporcionesFPS.proporcionSalto) / 2560);
			} else if (canvas.width <= 1366) {
				this.proporcionesFPS.proporcionLimiteCuadros = 1;
				this.proporcionesFPS.proporcionMovimiento = 0.7;
				this.proporcionesFPS.proporcionMovimientoEnemigo = 0.7;
				this.proporcionesFPS.proporcionSalto = 0.7;
			}
		} else if (this.fps >= 80 && this.fps < 140 && !this.establecerFPS) {
			if (this.contadorSeg >= 2) {
				this.establecerFPS = true;
			}

			if (canvas.height < 600) {
				this.gravedad = 0.5;
			} else {
				if (canvas.height < 973) {
					this.gravedad = 0.5;
				} else {
					this.gravedad = 0.7;
				}
			}

			this.saltoPersonaje = obtenerSaltoInicial((canvas.height * obtenerAlturaMaxima(obtenerSaltoInicial(410, this.gravedad))) / 1333);

			if (canvas.width <= 1920 && canvas.width > 1366) {
				this.proporcionesFPS.proporcionLimiteCuadros = 2;
				this.proporcionesFPS.proporcionMovimiento = 1.33;
				this.proporcionesFPS.proporcionMovimientoEnemigo = 1.33;
				this.proporcionesFPS.proporcionSalto = 1.33;
			} else if (canvas.width <= 1366) {
				this.proporcionesFPS.proporcionLimiteCuadros = 2;
				this.proporcionesFPS.proporcionMovimiento = 0.9;
				this.proporcionesFPS.proporcionMovimientoEnemigo = 0.9;
				this.proporcionesFPS.proporcionSalto = 0.9;
			}
		} else if (this.fps <= 80 && !this.establecerFPS) {
			if (this.contadorSeg >= 2) {
				this.establecerFPS = true;
			}

			if (canvas.height < 600) {
				this.gravedad = 1.6;
			} else {
				if (canvas.height < 973) {
					this.gravedad = 1.8;
				} else {
					this.gravedad = 2.3;
				}
			}
			this.saltoPersonaje = obtenerSaltoInicial((canvas.height * obtenerAlturaMaxima(obtenerSaltoInicial(410, this.gravedad))) / 1333);

			if (canvas.width <= 1920 && canvas.width > 1366) {
				this.proporcionesFPS.proporcionLimiteCuadros = 4;
				this.proporcionesFPS.proporcionMovimiento = 2.66;
				this.proporcionesFPS.proporcionMovimientoEnemigo = 2.66;
				this.proporcionesFPS.proporcionSalto = 2.66;
			} else if (canvas.width <= 1366) {
				this.proporcionesFPS.proporcionLimiteCuadros = 4;
				this.proporcionesFPS.proporcionMovimiento = 1.8;
				this.proporcionesFPS.proporcionMovimientoEnemigo = 1.8;
				this.proporcionesFPS.proporcionSalto = 1.8;
			}
		}
	}

	finalizar() {
		if (this.gameStart) {
			this.gameStart = false;

			let datosJugador = {
				nombre: nombreJugador.value,
				puntuacion: parseInt(this.personaje.puntuacion),
			};

			this.cargarEscenario();
			this.cargarAyuda();
			this.cargarPersonaje();

			this.audios.audioFondo_2.pause();
			this.audios.audioFondo_2.currentTime = 0;

			this.audios.audioFondo.currentTime = 0;
			this.audios.audioFondo.play();

			this.audios.audioViento.pause();
			this.audios.audioViento.currentTime = 0;

			guardarPuntuacion(datosJugador).then((res) => {
				if (res) {
					mostrarPuntuacionesFinJuego();
				} else {
					mostrarPuntuacionesFinJuego();
				}
			});

			mostrarPuntuacionesFinJuego();
		}
	}
}
