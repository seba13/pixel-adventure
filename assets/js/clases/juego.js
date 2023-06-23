class Juego {
	constructor() {
		this.gameStart = false;
		this.gameOver = false;
		this.idAnimation = null;

		this._gravedad = 0.5;

		this._controles = {
			ArrowUp: {
				presionada: false,
			},
			ArrowDown: {
				presionada: false,
			},
			ArrowLeft: {
				presionada: false,
			},
			ArrowRight: {
				presionada: false,
			},
			' ': {
				presionada: false,
			},
		};

		this.proporciones = {
			personaje: 2,
			escenario: 3,
			fondo: {
				montaña_1: 3,
				montaña_2: 2.5,
				montaña_3: 3,
				montaña_4: 3.5,
				montaña_5: 4.1,
				nube_1: 2,
				nube_2: 1.5,
				nube_3: 3,
			},
			plataforma: {
				suelo: 3,
				arbol_1: 3,
				arbol_2: 3,
				arbusto_1: 3,
				arbusto_2: 3,
				cascada: 1,
			},
		};

		// imagenes de fondo
		this.imagenesFondo = {
			fondo: new Image(),
			montaña_1: {
				frame_1: new Image(),
				frame_2: new Image(),
				frameActual: this.frame_1,
				ancho: 210,
				escalaSprite: 3,
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
			},
			montaña_2: {
				frame_1: new Image(),
				frame_2: new Image(),
				frameActual: this.frame_1,
				escalaSprite: 2.5,
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
			},
			montaña_3: {
				frame_1: new Image(),
				frame_2: new Image(),
				frameActual: this.frame_1,
				escalaSprite: 3,
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
			},
			montaña_4: {
				frame_1: new Image(),
				frame_2: new Image(),
				frameActual: this.frame_1,
				escalaSprite: 3.5,
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
			},
			montaña_5: {
				frame_1: new Image(),
				frame_2: new Image(),
				frameActual: this.frame_1,
				escalaSprite: 4.1,
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
			},
			nube_1: {
				frame_1: new Image(),
				frame_2: new Image(),
				frameActual: this.frame_1,
				escalaSprite: 2,
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
			},
			nube_2: {
				frame_1: new Image(),
				frame_2: new Image(),
				frameActual: this.frame_1,
				escalaSprite: 1.5,
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
			},
			nube_3: {
				frame_1: new Image(),
				frame_2: new Image(),
				frameActual: this.frame_1,
				escalaSprite: 3,
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
			},
		};

		this.tilesetJugador = {
			tileset: new Image(),
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

	get controles() {
		return this._controles;
	}

	async cargarAssets() {
		let cargarAssets = [this.cargarImagenesFondo(), this.cargarTileset(), this.cargarAudios(), this.cargarImagenJugador()];

		let cargado = await Promise.all(cargarAssets);

		if (cargado) {
			this.cargarEscenario();
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
			escalaSprite: 1.5,
			escenario: new Escenario({
				plataformas: [
					new Plataforma({
						posicion: {
							x: 800,
							// y: Math.floor((canvas.height - 535) / 32) * 32
							y: Math.floor(canvas.height - 300),
						},
						width: 384 * 4,
						imagenes: this.tilesetEscenario,
						escalaSprite: 3,
						offset: {
							x: 28,
							y: 28,
						},
					}),

					// new Plataforma({
					// 	posicion: {
					// 		x: 384*4 + 800 + 350,
					// 		// y: Math.floor((canvas.height - 535) / 32) * 32
					// 		y: Math.floor((canvas.height - 150) )
					// 	},
					// 	width: 380 ,
					// 	imagenes: this.tilesetEscenario,
					// 	escalaSprite:3,
					// 	offset : {
					// 		x: 16,
					// 		y: 28
					// 	}
					// }),
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
				x: 10,
				y: 0,
			},
			imagenes: this.tilesetJugador,
			escalaSprite: 4,
		});
	}

	escucharEventos() {
		document.addEventListener('keydown', this.moverJugador.bind(this));
		document.addEventListener('keyup', this.detenerJugador.bind(this));

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
		if (this.gameStart) {
			if (this.controles[e.key]) {
				if (e.key === 'ArrowUp') {
					if (!this.controles[e.key].presionada) {
						this.personaje.velocidad.y -= 20;
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
		this.tilesetEscenario.tilesetCascada.cascada_1.src = '/assets/img/fondo/cascada/cascada-1.png';
		this.tilesetEscenario.tilesetCascada.cascada_2.src = '/assets/img/fondo/cascada/cascada-2.png';
		this.tilesetEscenario.tilesetCascada.cascada_3.src = '/assets/img/fondo/cascada/cascada-3.png';
		this.tilesetEscenario.tilesetCascada.cascada_4.src = '/assets/img/fondo/cascada/cascada-4.png';
		this.tilesetEscenario.tilesetCascada.cascada_5.src = '/assets/img/fondo/cascada/cascada-5.png';

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
		this.tilesetJugador.tileset.src = '/assets/img/personaje/personaje.png';

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
		this.idAnimation = requestAnimationFrame(() => this.animar());
	}

	animar() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// this.dibujar();

		this.fondo.actualizarSprite();

		// this.escenario.actualizarSprite()

		if (this.gameStart) {
			this.personaje.actualizarSprite();
		}

		if (!this.gameOver) {
			this.idAnimation = requestAnimationFrame(() => this.animar());
		}
	}

	finalizar() {
		this.gameStart = false;
		this.cargarEscenario();
		this.cargarPersonaje();
		// this.gameStart = false

		this.audios.audioFondo_2.pause();
		this.audios.audioFondo_2.currentTime = 0;

		this.audios.audioFondo.currentTime = 0;
		this.audios.audioFondo.play();

		this.audios.audioViento.pause();
		this.audios.audioViento.currentTime = 0;

		mostrarPuntuacionesFinJuego()

	}
}
