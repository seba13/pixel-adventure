class Jugador extends Sprite {
	constructor({ posicion = { x: 0, y: 0 }, velocidad = { x: 0, y: 0 }, imagenes, escalaSprite, offset = { x: 0, y: 0 }, ataques }) {
		super({ posicion, velocidad, imagenes, escalaSprite });

		this.ataques = ataques;
		this.vida = 4;
		this.energia = 4;
		this.offset = offset;
		this.width = 32 * this.escalaSprite - this.offset.x * this.escalaSprite;
		this.height = 32 * this.escalaSprite;
		this.estado = 'inactivo';
		this.ultimaDireccion = 'derecha';
		this.cuadroActual = 0;
		this.cicloAnimacion = 0; //cuenta cuando se ha completado un ciclo de animacion
		this.contadorCuadros = 0;

		this.recibirGolpe = true;
		this.realizarAtaque = false;
		//numero de frames
		this.mapa = {
			inactivo: {
				x: 0,
				y: 0,
				frames: 2,
			},
			parpadear: {
				x: 0,
				y: 32,
				frames: 2,
			},
			caminando: {
				x: 0,
				y: 64,
				frames: 4,
			},
			corriendo: {
				x: 0,
				y: 96,
				frames: 8,
			},
			saltando: {
				x: 0,
				y: 160,
				frames: 4,
			},
			caida: {
				x: 128,
				y: 160,
				frames: 4,
			},
			daño: {
				x: 0,
				y: 192,
				frames: 3,
			},
			muerto: {
				x: 0,
				y: 224,
				frames: 8,
			},
			ataque: {
				x: 0,
				y: 256,
				frames: 8,
			},
		};

		this.mapaVida = {
			fullVida: {
				x: 0,
				y: 0,
			},
			tresVidas: {
				x: 51,
				y: 0,
			},
			dosVidas: {
				x: 51 * 2,
				y: 0,
			},
			unaVida: {
				x: 51 * 3,
				y: 0,
			},
			ceroVida: {
				x: 51 * 4,
				y: 0,
			},
			vidaActual: 'fullVida',
		};

		this.mapaEnergia = {
			fullEnergia: {
				x: 0,
				y: 0,
			},
			tresEnergias: {
				x: 51,
				y: 0,
			},
			dosEnergias: {
				x: 51 * 2,
				y: 0,
			},
			unaEnergia: {
				x: 51 * 3,
				y: 0,
			},
			ceroEnergia: {
				x: 51 * 4,
				y: 0,
			},
			energiaActual: 'fullEnergia',
			cuadroActual: 0,
			contadorLimiteCuadros: 96,
		};

		// definir cada cuantas iteraciones se cambia el fotograma
		this.mapa.inactivo.contadorLimiteCuadros = 120 / this.mapa.inactivo.frames;
		this.mapa.parpadear.contadorLimiteCuadros = 60 / this.mapa.parpadear.frames;
		this.mapa.caminando.contadorLimiteCuadros = 120 / this.mapa.caminando.frames;
		this.mapa.corriendo.contadorLimiteCuadros = 120 / this.mapa.corriendo.frames;
		this.mapa.saltando.contadorLimiteCuadros = 120 / this.mapa.saltando.frames;
		this.mapa.caida.contadorLimiteCuadros = 120 / this.mapa.caida.frames;
		this.mapa.daño.contadorLimiteCuadros = 120 / this.mapa.daño.frames;
		this.mapa.muerto.contadorLimiteCuadros = 120 / this.mapa.muerto.frames;
		this.mapa.ataque.contadorLimiteCuadros = 10 / this.mapa.ataque.frames;
	}

	dibujarPersonaje() {
		let flip = 0;
		if (this.ultimaDireccion === 'izquierda') {
			ctx.save();
			ctx.scale(-1, 1);
			flip = -1;
		} else {
			ctx.save();
			ctx.scale(1, 1);
			flip = 1;
		}

		ctx.drawImage(
			this.imagenes.tileset,
			this.mapa[this.estado].x + 32 * this.cuadroActual,
			this.mapa[this.estado].y,
			32,
			32,
			(this.posicion.x - this.offset.x * this.escalaSprite) * flip,
			this.posicion.y,
			32 * this.escalaSprite * flip,
			32 * this.escalaSprite,
		);

		ctx.restore();

		// ctx.fillStyle = 'rgba(255,0,0,.2)';
		// ctx.fillRect(this.posicion.x - (this.offset.x * this.escalaSprite)/2, this.posicion.y, this.width, this.height);
	}

	dibujarVidaPersonaje() {
		if (this.vida == 4) {
			this.mapaVida.vidaActual = 'fullVida';
		} else if (this.vida == 3) {
			this.mapaVida.vidaActual = 'tresVidas';
		} else if (this.vida == 2) {
			this.mapaVida.vidaActual = 'dosVidas';
		} else if (this.vida == 1) {
			this.mapaVida.vidaActual = 'unaVida';
		} else if (this.vida == 0) {
			this.mapaVida.vidaActual = 'ceroVida';
		}

		ctx.drawImage(
			this.imagenes.tilesetVida,
			this.mapaVida[this.mapaVida.vidaActual].x,
			this.mapaVida[this.mapaVida.vidaActual].y,
			this.imagenes.tilesetVida.width / 5,
			this.imagenes.tilesetVida.height,
			10,
			10,
			(this.imagenes.tilesetVida.width / 5) * juego.proporciones.barraVida,
			this.imagenes.tilesetVida.height * juego.proporciones.barraVida,
		);
	}

	dibujarEnergiaPersonaje() {
		if (this.energia == 4) {
			this.mapaEnergia.energiaActual = 'fullEnergia';
		} else if (this.energia == 3) {
			this.mapaEnergia.energiaActual = 'tresEnergias';
		} else if (this.energia == 2) {
			this.mapaEnergia.energiaActual = 'dosEnergias';
		} else if (this.energia == 1) {
			this.mapaEnergia.energiaActual = 'unaEnergia';
		} else if (this.energia == 0) {
			this.mapaEnergia.energiaActual = 'ceroEnergia';
		}

		ctx.drawImage(
			this.imagenes.tilesetEnergia,
			this.mapaEnergia[this.mapaEnergia.energiaActual].x,
			this.mapaEnergia[this.mapaEnergia.energiaActual].y,
			this.imagenes.tilesetEnergia.width / 5,
			this.imagenes.tilesetEnergia.height,
			10 + (this.imagenes.tilesetEnergia.width / 5) * juego.proporciones.barraEnergia - 13 * juego.proporciones.barraEnergia,
			10,
			(this.imagenes.tilesetEnergia.width / 5) * juego.proporciones.barraEnergia,
			this.imagenes.tilesetEnergia.height * juego.proporciones.barraEnergia,
		);

		this.recuperarEnergia();
	}

	recuperarEnergia() {
		if (!juego.controles[' '].presionada) {
			if (this.energia < 4) {
				this.mapaEnergia.cuadroActual++;

				if (this.mapaEnergia.cuadroActual % this.mapaEnergia.contadorLimiteCuadros == 0) {
					this.energia++;
				}
			}
		} else {
			this.mapaEnergia.cuadroActual = 0;
		}
	}

	dibujar() {
		this.dibujarPersonaje();
		this.dibujarVidaPersonaje();
		this.dibujarEnergiaPersonaje();
		this.lanzarAtaques();
	}

	animarSprite() {
		this.contadorCuadros++;
		if (this.contadorCuadros % this.mapa[this.estado].contadorLimiteCuadros == 0) {
			if (this.cuadroActual < this.mapa[this.estado].frames - 1) {
				this.cuadroActual++;
				if (this.estado == 'ataque') {
					if (this.cuadroActual + 1 >= this.mapa[this.estado].frames - 1) {
						this.realizarAtaque = false;
					}
				}
				if (this.estado == 'muerto') {
					if (this.cuadroActual + 1 >= this.mapa[this.estado].frames - 1) {
						setTimeout(() => {
							juego.finalizar();
						}, 1000);
					}
				}
			} else {
				if (this.estado != 'muerto') {
					this.cuadroActual = 0;
					this.cicloAnimacion++; // propiedad para cambiar animacion de estado inactivo a parpadear (function cambiarEstado())
				}
			}
		}
	}

	detectarColisionPlataforma() {
		juego.fondo.escenario.plataformas.forEach((plataforma) => {
			if (
				this.posicion.y + this.height <= plataforma.posicion.y &&
				this.posicion.y + this.height + this.velocidad.y >= plataforma.posicion.y &&
				this.posicion.x + this.width >= plataforma.posicion.x &&
				this.posicion.x <= plataforma.posicion.x + plataforma.width
			) {
				this.velocidad.y = 0;
			}
		});
	}

	// cambia la velocidad para mover el personaje e indica la direccion (derecha o izquierda)
	cambiarVelocidad() {
		// personaje moviendose a la derecha
		if (juego.controles['ArrowRight'].presionada) {
			console.log('derecha');
			this.ultimaDireccion = 'derecha';
			this.velocidad.x = 5;
		}
		// personaje moviendo a la izquierda
		else if (juego.controles['ArrowLeft'].presionada) {
			console.log('izq');
			this.ultimaDireccion = 'izquierda';
			this.velocidad.x = -5;
		}
		// movimiento en el eje Y se ve desde la clase juego
		// debido a que es donde se activa el evento keydown

		// personaje estático
		else {
			this.velocidad.x = 0;
		}
	}

	// Cambia el estado que referencia al sprite de animacion
	cambiarEstado() {
		if (this.vida < 1) {
			if (this.estado != 'muerto') {
				this.estado = 'muerto';
				this.cuadroActual = 0;
			}
		} else if (!this.realizarAtaque) {
			if (juego.controles['ArrowRight'].presionada || juego.controles['ArrowLeft'].presionada) {
				if (juego.controles['ArrowRight'].presionada) {
					this.ultimaDireccion = 'derecha';
				} else if (juego.controles['ArrowLeft'].presionada) {
					this.ultimaDireccion = 'izquierda';
				}

				if (this.velocidad.y < 0) {
					if (this.estado != 'saltando') {
						this.estado = 'saltando';
						this.cuadroActual = 0;
					}
					else
					if (juego.controles[' '].presionada) {
						if (this.estado != 'ataque') {
							this.realizarAtaque = true;
							this.estado = 'ataque';
							this.cuadroActual = 0;
						}
					}  
				}
				// cuando se está presionando el boton saltar y está cayendo por la gravedad
				else if (this.velocidad.y > juego.gravedad) {

					if (this.estado != 'caida') {
						this.estado = 'caida';
						this.cuadroActual = 0;
					}
					else
					if (juego.controles[' '].presionada) {
						if (this.estado != 'ataque') {
							this.realizarAtaque = true;
							this.estado = 'ataque';
							this.cuadroActual = 0;
						}
					}
					
				}
				else
				if (juego.controles[' '].presionada) {
					if (this.estado != 'ataque') {
						this.realizarAtaque = true;
						this.estado = 'ataque';
						this.cuadroActual = 0;
					}
				} 
				// else
				// {
					else
					if (this.estado != 'corriendo') {
						this.estado = 'corriendo';
						this.cuadroActual = 0;
					}
				// }

				// siempre comenzara por la animacion inactiva
				this.cicloAnimacion = 0;
			} else if (juego.controles['ArrowUp'].presionada) {
				// siempre comenzara por la animacion inactiva
				this.cicloAnimacion = 0;

				// cuando se está presionando el boton saltar y se está elevenado
				if (this.velocidad.y < 0) {
					if (this.estado != 'saltando') {
						this.estado = 'saltando';
						this.cuadroActual = 0;
					}
				}
				// cuando se está presionando el boton saltar y está cayendo por la gravedad
				else if (this.velocidad.y > juego.gravedad) {
					if (this.estado != 'caida') {
						this.estado = 'caida';
						this.cuadroActual = 0;
					}
				}
				// cuando se está presionando el boton saltar pero ya caido al suelo
				else {
					if (this.estado != 'inactivo') {
						this.estado = 'inactivo';
						this.cuadroActual = 0;
					}
				}
			} else if (juego.controles[' '].presionada) {
				if (this.estado != 'ataque') {
					this.realizarAtaque = true;
					this.estado = 'ataque';
					this.cuadroActual = 0;
				}
			}
			// cuando se deja de pulsar cualquier boton
			else {
				// cuanto está cayendo por gravedad
				if (this.velocidad.y > juego.gravedad) {
					if (this.estado != 'caida') {
						this.estado = 'caida';
						this.cuadroActual = 0;
					}
				}
				// cuando ya ha caido al suelo o no se ha realizado alguna acción
				else if (this.estado != 'inactivo') {
					if (this.cicloAnimacion < 2) {
						this.estado = 'inactivo';
						this.cuadroActual = 0;
					} else {
						// si cicloAnimacion > 2 cambiar a la animacion inactiva
						if (this.cicloAnimacion > 2) {
							this.cicloAnimacion = 0;
						}
					}
					// this.cicloAnimacion = 0
				} else {
					// si cicloAnimacion es 2 cambiar a la animacion pestañear
					if (this.cicloAnimacion == 2) {
						if (this.estado != 'parpadear') {
							this.estado = 'parpadear';
							this.cuadroActual = 0;
						}
					}
				}
			}
		}
	}

	crearAtaque() {
		let posX = 0;
		let velX = 0;
		if (this.ultimaDireccion == 'derecha') {
			posX = this.posicion.x + 2;
			velX = 7;
		} else {
			posX = this.posicion.x - this.width - 2;
			velX = -7;
		}

		this.ataques.push(
			new Ataque({
				posicion: {
					x: posX,
					y: this.posicion.y,
				},
				velocidad: {
					x: velX,
					y: 0,
				},
				imagenes: {
					bolaFuego: this.imagenes.bolaFuego,
				},
			}),
		);
	}

	lanzarAtaques() {
		this.ataques.forEach((ataque, index) => {
			if (ataque.liberar) {
				this.ataques.splice(index, 1);
			} else {
				ataque.actualizarAtaque();
			}
		});
	}

	actualizarSprite() {
		this.posicion.y += this.velocidad.y;

		this.posicion.x += this.velocidad.x;

		this.dibujar();

		this.animarSprite();

		if (this.posicion.y - this.velocidad.y > canvas.height) {
			this.vida = 0;
		} else if (this.posicion.y + this.velocidad.y < canvas.height - this.height) {
			this.velocidad.y += juego.gravedad;
		}

		// cambia la velocidad para mover el personaje e indica la direccion (derecha o izquierda)
		this.cambiarVelocidad();

		// Cambia el estado que referencia al sprite de animacion
		this.cambiarEstado();
	}
}
