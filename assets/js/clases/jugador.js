class Jugador extends Sprite {
	constructor({ posicion = { x: 0, y: 0 }, velocidad = { x: 0, y: 0 }, imagenes, offset = { x: 0, y: 0 }, ataques }) {
		super({ posicion, velocidad, imagenes });

		this.ataques = ataques;
		this.puntuacion = '0000000';
		this.vidaTotal = 4;
		this.vida = 4;
		this.anchoVidaActual = 1; // 1=> 100%
		this.anchoVidaTarget = 1; // 1 => 100%
		this.energiaTotal = 4;
		this.energia = 4;
		this.anchoEnergiaActual = 1; // 1 => 100%
		this.anchoEnergiaTarget = 1; // 1 => 100%
		this.offset = offset;
		this.width = 32 * juego.proporciones.personaje;
		this.height = 32 * juego.proporciones.personaje;
		this.saltando = false;
		this.dobleSalto = false;
		this.cayendo = false;
		this.tiempoRecuperarEnergia = 600; // cada 600 ms recupera
		this.tiempoEnergia = 0;

		// animacion daño
		this.recibiendoDaño = false;
		this.invulnerable = false;
		this.tiempoInvulnerableTranscurrido = 0;
		this.tiempoParpadeoTranscurrido = 0;
		this.tiempoInvulnerabilidad = 1000;
		this.tiempoParpadeoDaño = 1000;
		this.parpadeando = false;
		this.parpadear = false;

		// posicion jugador
		// this.offset.x = this.offset.x * juego.proporciones.personaje;
		this.anchoColision = this.width - this.offset.x;
		this.estado = 'inactivo';
		this.ultimaDireccion = 'derecha';
		this.cuadroActual = 0;
		this.cicloAnimacion = 0; //cuenta cuando se ha completado un ciclo de animacion
		this.contadorCuadros = 0;

		this.realizandoAtaque = false;
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
				frames: 4,
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

			// EFECTO DE RECIBIR DAÑO PARPADEANDO LA ANIMACION
			if (this.parpadeando && this.vida > 0) {
				if (this.tiempoParpadeoTranscurrido <= this.tiempoParpadeoDaño) {
					this.parpadear = !this.parpadear;
				}

				if (this.parpadear) {
					ctx.globalAlpha = 0.3;
				}
			}
		} else {
			ctx.save();
			ctx.scale(1, 1);
			flip = 1;

			// EFECTO DE RECIBIR DAÑO PARPADEANDO LA ANIMACION
			if (this.parpadeando && this.vida > 0) {
				if (this.tiempoParpadeoTranscurrido <= this.tiempoParpadeoDaño) {
					this.parpadear = !this.parpadear;
				}

				if (this.parpadear) {
					ctx.globalAlpha = 0.3;
				}
			}
		}

		ctx.drawImage(this.imagenes.tileset, this.mapa[this.estado].x + 32 * this.cuadroActual, this.mapa[this.estado].y, 32, 32, this.posicion.x * flip, this.posicion.y, 32 * juego.proporciones.personaje * flip, 32 * juego.proporciones.personaje);

		ctx.restore();

		// RECTANGULO DE PRUEBA PARA DETERMINAR COLISIONES
		// ctx.fillStyle = 'rgba(0,255,0,.2)';
		// ctx.fillRect(this.posicion.x + this.offset.x / 2, this.posicion.y, this.anchoColision, this.height);
	}

	agregarPuntaje(puntuacion) {
		puntuacion = parseInt(this.puntuacion) + puntuacion;

		if (puntuacion.toString().length < 7) {
			let cantidadCeros = 7 - puntuacion.toString().length;

			this.puntuacion = '0'.repeat(cantidadCeros) + puntuacion.toString();
		}
	}

	dibujarVidaPersonaje() {
		// if (this.vida == 4) {
		// 	this.mapaVida.vidaActual = 'fullVida';
		// } else if (this.vida == 3) {
		// 	this.mapaVida.vidaActual = 'tresVidas';
		// } else if (this.vida == 2) {
		// 	this.mapaVida.vidaActual = 'dosVidas';
		// } else if (this.vida == 1) {
		// 	this.mapaVida.vidaActual = 'unaVida';
		// } else if (this.vida == 0) {
		// 	this.mapaVida.vidaActual = 'ceroVida';
		// }

		// ctx.drawImage(
		// 	this.imagenes.tilesetVida,
		// 	this.mapaVida[this.mapaVida.vidaActual].x,
		// 	this.mapaVida[this.mapaVida.vidaActual].y,
		// 	this.imagenes.tilesetVida.width / 5,
		// 	this.imagenes.tilesetVida.height,
		// 	0,
		// 	10+ this.imagenes.tilesetPuntuacion.height * juego.proporciones.barraPuntuaciones,
		// 	(this.imagenes.tilesetVida.width / 5) * juego.proporciones.barraVida,
		// 	this.imagenes.tilesetVida.height * juego.proporciones.barraVida,
		// );

		ctx.drawImage(
			this.imagenes.contenedorVida,
			0,
			0,
			this.imagenes.contenedorVida.width,
			this.imagenes.contenedorVida.height,
			10 + 25 * juego.proporciones.barraVida,
			10 + 6 * juego.proporciones.barraVida,
			this.imagenes.contenedorVida.width * juego.proporciones.barraVida,
			this.imagenes.contenedorVida.height * juego.proporciones.barraVida,
		);

		this.anchoVidaTarget = this.vida / this.vidaTotal;

		ctx.drawImage(
			this.imagenes.barraVida,
			0,
			0,
			this.imagenes.barraVida.width,
			this.imagenes.barraVida.height,
			10 + (25 + 1) * juego.proporciones.barraVida,
			10 + (6 + 2) * juego.proporciones.barraVida,
			this.imagenes.barraVida.width * juego.proporciones.barraVida * this.anchoVidaActual,
			this.imagenes.barraVida.height * juego.proporciones.barraVida,
		);

		if (this.anchoVidaActual > this.anchoVidaTarget) {
			this.anchoVidaActual -= 0.05 / this.vidaTotal;
		} else if (this.anchoVidaActual < this.anchoVidaTarget) {
			this.anchoVidaActual += 0.05 / this.vidaTotal;

			if (this.anchoVidaTarget - this.anchoVidaActual <= 0.02) {
				this.anchoVidaActual = this.anchoVidaTarget;
			}
		}
	}

	dibujarPuntuacionPersonaje() {
		ctx.drawImage(
			this.imagenes.tilesetPuntuacion,
			0,
			0,
			this.imagenes.tilesetPuntuacion.width,
			this.imagenes.tilesetPuntuacion.height,
			10,
			10,
			this.imagenes.tilesetPuntuacion.width * juego.proporciones.barraPuntuaciones,
			this.imagenes.tilesetPuntuacion.height * juego.proporciones.barraPuntuaciones,
		);

		ctx.font = `${juego.proporciones.texto * 16}px VT323`;
		ctx.fillStyle = 'white';

		ctx.fillText(
			`${this.puntuacion}`,
			10 + this.imagenes.tilesetPuntuacion.width * juego.proporciones.barraPuntuaciones - ctx.measureText(this.puntuacion).width - this.imagenes.tilesetPuntuacion.width * 0.046 * juego.proporciones.barraPuntuaciones,
			10 + this.imagenes.tilesetPuntuacion.height * juego.proporciones.barraPuntuaciones - this.imagenes.tilesetPuntuacion.height * 0.1 * juego.proporciones.barraPuntuaciones,
		);
	}

	dibujarEnergiaPersonaje() {
		// if (this.energia == 4) {
		// 	this.mapaEnergia.energiaActual = 'fullEnergia';
		// } else if (this.energia == 3) {
		// 	this.mapaEnergia.energiaActual = 'tresEnergias';
		// } else if (this.energia == 2) {
		// 	this.mapaEnergia.energiaActual = 'dosEnergias';
		// } else if (this.energia == 1) {
		// 	this.mapaEnergia.energiaActual = 'unaEnergia';
		// } else if (this.energia == 0) {
		// 	this.mapaEnergia.energiaActual = 'ceroEnergia';
		// }

		// ctx.drawImage(
		// 	this.imagenes.tilesetEnergia,
		// 	this.mapaEnergia[this.mapaEnergia.energiaActual].x,
		// 	this.mapaEnergia[this.mapaEnergia.energiaActual].y,
		// 	this.imagenes.tilesetEnergia.width / 5,
		// 	this.imagenes.tilesetEnergia.height,
		// 	0 + (this.imagenes.tilesetEnergia.width / 5) * juego.proporciones.barraEnergia - 13 * juego.proporciones.barraEnergia,
		// 	10  + this.imagenes.tilesetPuntuacion.height * juego.proporciones.barraPuntuaciones,
		// 	(this.imagenes.tilesetEnergia.width / 5) * juego.proporciones.barraEnergia,
		// 	this.imagenes.tilesetEnergia.height * juego.proporciones.barraEnergia,
		// );

		ctx.drawImage(
			this.imagenes.contenedorEnergia,
			0,
			0,
			this.imagenes.contenedorEnergia.width,
			this.imagenes.contenedorEnergia.height,
			10 + 25 * juego.proporciones.barraEnergia,
			10 + 12 * juego.proporciones.barraEnergia,
			this.imagenes.contenedorEnergia.width * juego.proporciones.barraEnergia,
			this.imagenes.contenedorEnergia.height * juego.proporciones.barraEnergia,
		);

		this.anchoEnergiaTarget = this.energia / this.energiaTotal;

		// console.log(this.anchoEnergiaTarget);

		ctx.drawImage(
			this.imagenes.barraEnergia,
			0,
			0,
			this.imagenes.barraEnergia.width,
			this.imagenes.barraEnergia.height,
			10 + (25 + 1) * juego.proporciones.barraEnergia,
			10 + (12 + 2) * juego.proporciones.barraEnergia,
			this.imagenes.barraEnergia.width * juego.proporciones.barraEnergia * this.anchoEnergiaActual,
			this.imagenes.barraEnergia.height * juego.proporciones.barraEnergia,
		);

		if (this.anchoEnergiaActual > this.anchoEnergiaTarget) {
			this.anchoEnergiaActual -= 0.1 / this.energiaTotal;
			this.anchoEnergiaActual = Math.round(this.anchoEnergiaActual * 1000) / 1000;
		} else if (this.anchoEnergiaActual < this.anchoEnergiaTarget) {
			if (this.tiempoEnergia >= this.tiempoRecuperarEnergia) {
				if (this.anchoEnergiaActual >= 0.98) {
					this.anchoEnergiaActual = 1;
				} else {
					this.anchoEnergiaActual += 0.05 / this.energiaTotal;
					this.anchoEnergiaActual = Math.round(this.anchoEnergiaActual * 1000) / 1000;
				}
			}
		}

		this.recuperarEnergia();
	}

	recuperarEnergia() {
		if (!juego.controles[' '].presionada) {
			if (this.energia < 4) {
				this.mapaEnergia.cuadroActual++;

				// cambiar por
				// if (this.mapaEnergia.cuadroActual % this.mapaEnergia.contadorLimiteCuadros/juego.proporcionesFPS.proporcionLimiteCuadros == 0) {
				// 	this.energia++;
				// }

				if (this.tiempoEnergia >= this.tiempoRecuperarEnergia) {
					this.energia++;
					// this.tiempoEnergia = this.tiempoRecuperarEnergia/2
				} else {
					this.tiempoEnergia += juego.deltaTiempo;
				}

				// if (this.tiempoEnergia >= this.tiempoRecuperarEnergia) {
				// 	this.energia++;
				// 	this.tiempoEnergia = 0;
				// } else {
				// 	this.tiempoEnergia += juego.deltaTiempo;
				// }

				// if(this.anchoEnergiaActual <= this.anchoEnergiaTarget) {
				// 	this.anchoEnergiaActual += 0.05 / this.energiaTotal;
				// }
			}
		} else {
			this.mapaEnergia.cuadroActual = 0;
			this.tiempoEnergia = 0;
		}
	}

	dibujar() {
		this.dibujarPersonaje();
		// if (this.invulnerable) {
		// 	if (this.parpadeando && this.vida > 0) {
		// 		if (!this.parpadear) {
		// 			this.dibujarPersonaje();
		// 		}
		// 	} else {
		// 		this.dibujarPersonaje();
		// 	}
		// } else {
		// 	this.dibujarPersonaje();
		// }
		this.dibujarVidaPersonaje();
		this.dibujarPuntuacionPersonaje();
		this.dibujarEnergiaPersonaje();
		this.lanzarAtaques();
	}

	animarSprite() {
		this.contadorCuadros++;

		this.contadorLimiteCuadros = Math.ceil(this.mapa[this.estado].contadorLimiteCuadros / juego.proporcionesFPS.proporcionLimiteCuadros);

		if (this.contadorCuadros % this.contadorLimiteCuadros == 0) {
			if (this.cuadroActual < this.mapa[this.estado].frames - 1) {
				this.cuadroActual++;

				if (this.estado == 'daño') {
					if (this.cuadroActual + 1 >= this.mapa[this.estado].frames - 1) {
						this.recibiendoDaño = false;
					}
				}

				if (this.estado == 'ataque') {
					if (this.cuadroActual + 1 >= this.mapa[this.estado].frames - 1) {
						this.realizandoAtaque = false;
						this.lanzarAtaques();
					}
				}
				if (this.estado == 'muerto') {
					if (this.cuadroActual + 1 >= this.mapa[this.estado].frames - 1) {
						setTimeout(() => {
							juego.finalizar();
						}, 1000);
					}
				}

				if (this.estado == 'caida') {
					if (this.cuadroActual + 1 >= this.mapa[this.estado].frames - 1) {
						this.estado == 'inactivo';
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
		if (juego.controles['ArrowRight'].presionada || juego.controles['d'].presionada) {
			this.ultimaDireccion = 'derecha';
			this.velocidad.x = juego.proporcionesFPS.proporcionMovimiento * 5;
		}
		// personaje moviendo a la izquierda
		else if (juego.controles['ArrowLeft'].presionada || juego.controles['a'].presionada) {
			this.ultimaDireccion = 'izquierda';
			this.velocidad.x = -(juego.proporcionesFPS.proporcionMovimiento * 5);
		}
		// movimiento en el eje Y se ve desde la clase juego
		// debido a que es donde se activa el evento keydown

		// personaje estático
		else {
			this.velocidad.x = 0;
		}
	}

	// actualizarPosicionAtaques() {

	// 	this.ataques.forEach( ataque => {

	// 		if(this.ultimaDireccion == 'derecha') {
	// 			ataque.posicion.x = this.posicion.x + this.offset.x/2 + this.anchoColision
	// 		}else {
	// 			ataque.posicion.x = this.posicion.x - this.offset.x/2 - this.anchoColision
	// 		}

	// 	})

	// }

	recibirDaño(dañoRecibido) {
		this.vida -= dañoRecibido;

		// if (this.vida < 2) {
		// 	this.vida = 4;
		// }

		this.recibiendoDaño = true;
		this.parpadeando = true;
		this.parpadear = true;
		this.invulnerable = true;

		this.tiempoInvulnerableTranscurrido = 0;
		this.tiempoParpadeoTranscurrido = 0;

		if (this.ultimaDireccion == 'derecha') {
			this.posicion.x -= 80;
		} else {
			this.posicion.x += 80;
		}
		this.velocidad.y = -10;
	}

	cambiarEstado() {
		if (this.vida < 1) {
			if (this.estado != 'muerto') {
				Object.keys(juego.controles).forEach((tecla) => {
					juego.controles[tecla].presionada = false;
				});

				this.estado = 'muerto';
				this.cuadroActual = 0;
			}
			return;
		}

		// if (this.recibiendoDaño) {
		// 	console.log(this.tiempoInvulnerableTranscurrido);
		// 	console.log(this.invulnerable);

		// 	if (this.tiempoInvulnerableTranscurrido >= this.tiempoInvulnerabilidad) {
		// 		// this.tiempoInvulnerableTranscurrido = 0;
		// 		// this.tiempoParpadeoTranscurrido = 0;
		// 		this.invulnerable = false;
		// 		this.parpadeando = false;

		// 		console.log('entra acacaaacaacacac');
		// 	} else {
		// 		this.tiempoInvulnerableTranscurrido += juego.deltaTiempo;
		// 	}

		// 	// if (this.tiempoParpadeoTranscurrido <= this.tiempoParpadeoDaño) {
		// 	// 	this.parpadear = !this.parpadear;

		// 	// 	this.tiempoParpadeoTranscurrido += juego.deltaTiempo;
		// 	// } else {
		// 	// 	this.tiempoParpadeoTranscurrido = 0;
		// 	// 	this.parpadeando = false;
		// 	// }
		// }
		// if (juego.controles[' '].presionada) {
		// 	if (this.realizandoAtaque) {
		// 		if (this.estado != 'ataque') {
		// 			this.estado = 'ataque';
		// 			this.cuadroActual = 0;
		// 		}
		// 		return;
		// 	}
		// }
		if (this.realizandoAtaque) {
			if (this.estado != 'ataque') {
				this.estado = 'ataque';
				this.cuadroActual = 0;
			}
			return;
		}

		if (juego.controles['ArrowLeft'].presionada || juego.controles['a'].presionada) {
			if (this.velocidad.y < 0) {
				if (this.estado != 'saltando') {
					this.estado = 'saltando';
					this.cuadroActual = 0;
				}
			} else if (this.velocidad.y > juego.gravedad) {
				if (this.estado != 'caida') {
					this.estado = 'caida';
					this.cuadroActual = 0;
				}
			} else if (this.estado != 'corriendo') {
				this.ultimaDireccion = 'derecha';
				this.estado = 'corriendo';
				this.cuadroActual = 0;
			}
			return;
		} else if (juego.controles['ArrowRight'].presionada || juego.controles['d'].presionada) {
			if (this.velocidad.y < 0) {
				if (this.estado != 'saltando') {
					this.estado = 'saltando';
					this.cuadroActual = 0;
				}
			} else if (this.velocidad.y > juego.gravedad) {
				if (this.estado != 'caida') {
					this.estado = 'caida';
					this.cuadroActual = 0;
				}
			} else if (this.estado != 'corriendo') {
				this.ultimaDireccion = 'derecha';
				this.estado = 'corriendo';
				this.cuadroActual = 0;
			}
			return;
		} else if (juego.controles['ArrowUp'].presionada || juego.controles['w'].presionada) {
			if (this.velocidad.y < 0) {
				if (this.estado != 'saltando') {
					this.estado = 'saltando';
					this.cuadroActual = 0;
				}
			} else if (this.velocidad.y > juego.gravedad) {
				if (this.estado != 'caida') {
					this.estado = 'caida';
					this.cuadroActual = 0;
				}
			} else if (this.estado != 'saltando') {
				this.estado = 'saltando';
				this.cuadroActual = 0;
			}
			return;
		} else {
			if (this.velocidad.y < 0) {
				if (this.estado != 'saltando') {
					this.estado = 'saltando';
					this.cuadroActual = 0;
				}
			} else if (this.velocidad.y > juego.gravedad) {
				if (this.estado != 'caida') {
					this.estado = 'caida';
					this.cuadroActual = 0;
				}
			} else if (this.estado != 'inactivo') {
				this.estado = 'inactivo';
				this.cuadroActual = 0;
			}
		}
	}

	// Cambia el estado que referencia al sprite de animacion
	// cambiarEstado() {
	// 	if (this.vida < 1) {
	// 		if (this.estado != 'muerto') {
	// 			this.estado = 'muerto';
	// 			this.cuadroActual = 0;
	// 		}
	// 		return
	// 	}
	// 	if(this.recibirDaño){

	// 		if(this.estado != 'daño' && this.tiempoRecibirDaño >= this.intervaloRecibirDaño ) {
	// 			this.estado = 'daño'
	// 			this.cuadroActual = 0
	// 			this.tiempoRecibirDaño = 0
	// 			this.desplazado = false
	// 		}else {
	// 			this.recibirDaño = false
	// 		}
	// 		return
	// 	}
	// 	if (!this.realizarAtaque) {
	// 		if (juego.controles['ArrowRight'].presionada || juego.controles['ArrowLeft'].presionada) {
	// 			if (juego.controles['ArrowRight'].presionada) {
	// 				this.ultimaDireccion = 'derecha';
	// 			} else if (juego.controles['ArrowLeft'].presionada) {
	// 				this.ultimaDireccion = 'izquierda';
	// 			}

	// 			if (this.velocidad.y < 0) {
	// 				if (this.estado != 'saltando') {
	// 					this.estado = 'saltando';
	// 					this.cuadroActual = 0;
	// 				}
	// 				else
	// 				if (juego.controles[' '].presionada) {
	// 					if (this.estado != 'ataque') {
	// 						this.realizarAtaque = true;
	// 						this.estado = 'ataque';
	// 						this.cuadroActual = 0;
	// 					}
	// 				}
	// 			}
	// 			// cuando se está presionando el boton saltar y está cayendo por la gravedad
	// 			else if (this.velocidad.y > juego.gravedad) {

	// 				if (this.estado != 'caida') {
	// 					this.estado = 'caida';
	// 					this.cuadroActual = 0;
	// 				}
	// 				else
	// 				if (juego.controles[' '].presionada) {
	// 					if (this.estado != 'ataque') {
	// 						this.realizarAtaque = true;
	// 						this.estado = 'ataque';
	// 						this.cuadroActual = 0;
	// 					}
	// 				}

	// 			}
	// 			else
	// 			if (juego.controles[' '].presionada) {
	// 				if (this.estado != 'ataque') {
	// 					this.realizarAtaque = true;
	// 					this.estado = 'ataque';
	// 					this.cuadroActual = 0;
	// 				}
	// 			}
	// 			// else
	// 			// {
	// 				else
	// 				if (this.estado != 'corriendo') {
	// 					this.estado = 'corriendo';
	// 					this.cuadroActual = 0;
	// 				}
	// 			// }

	// 			// siempre comenzara por la animacion inactiva
	// 			this.cicloAnimacion = 0;
	// 		} else if (juego.controles['ArrowUp'].presionada) {
	// 			// siempre comenzara por la animacion inactiva
	// 			this.cicloAnimacion = 0;

	// 			// cuando se está presionando el boton saltar y se está elevenado
	// 			if (this.velocidad.y < 0) {
	// 				if (this.estado != 'saltando') {
	// 					this.estado = 'saltando';
	// 					this.cuadroActual = 0;
	// 				}
	// 			}
	// 			// cuando se está presionando el boton saltar y está cayendo por la gravedad
	// 			else if (this.velocidad.y > juego.gravedad) {
	// 				if (this.estado != 'caida') {
	// 					this.estado = 'caida';
	// 					this.cuadroActual = 0;
	// 				}
	// 			}
	// 			// cuando se está presionando el boton saltar pero ya caido al suelo
	// 			else {
	// 				if (this.estado != 'inactivo') {
	// 					this.estado = 'inactivo';
	// 					this.cuadroActual = 0;
	// 				}
	// 			}
	// 		} else if (juego.controles[' '].presionada) {
	// 			if (this.estado != 'ataque') {
	// 				this.realizarAtaque = true;
	// 				this.estado = 'ataque';
	// 				this.cuadroActual = 0;
	// 			}
	// 		}
	// 		// cuando se deja de pulsar cualquier boton
	// 		else {
	// 			// cuanto está cayendo por gravedad
	// 			if (this.velocidad.y > juego.gravedad) {
	// 				if (this.estado != 'caida') {
	// 					this.estado = 'caida';
	// 					this.cuadroActual = 0;
	// 				}
	// 			}
	// 			// cuando ya ha caido al suelo o no se ha realizado alguna acción
	// 			else if (this.estado != 'inactivo') {
	// 				if (this.cicloAnimacion < 2) {
	// 					this.estado = 'inactivo';
	// 					this.cuadroActual = 0;
	// 				} else {
	// 					// si cicloAnimacion > 2 cambiar a la animacion inactiva
	// 					if (this.cicloAnimacion > 2) {
	// 						this.cicloAnimacion = 0;
	// 					}
	// 				}
	// 				// this.cicloAnimacion = 0
	// 			} else {
	// 				// si cicloAnimacion es 2 cambiar a la animacion pestañear
	// 				if (this.cicloAnimacion == 2) {
	// 					if (this.estado != 'parpadear') {
	// 						this.estado = 'parpadear';
	// 						this.cuadroActual = 0;
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	crearAtaque() {
		let posX = 0;
		let velX = 0;
		if (this.ultimaDireccion == 'derecha') {
			posX = this.posicion.x + this.offset.x / 2;
			velX = 7;
		} else {
			posX = this.posicion.x - this.offset.x / 2;
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
					impactoAtaque: this.imagenes.impactoAtaque,
				},
				direccion: this.ultimaDireccion,
				offset: {
					x: 35,
					y: 50,
				},
				daño: 20,
			}),
		);
	}

	lanzarAtaques() {
		this.ataques = this.ataques.filter((ataque) => !ataque.liberar);

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

		// console.log({"INVULNERABLE":this.invulnerable });

		// CONTROLADOR DE ANIMACION DE PARPADEO AL RECIBIR DAÑO Y VARIABLE DE INVULNERABILIDAD DE DAÑO
		if (this.parpadeando) {
			if (this.tiempoParpadeoTranscurrido >= this.tiempoParpadeoDaño) {
				this.parpadeando = false;
			} else {
				this.tiempoParpadeoTranscurrido += juego.deltaTiempo;
			}
		}
		if (this.invulnerable) {
			if (this.tiempoInvulnerableTranscurrido >= this.tiempoInvulnerabilidad) {
				// console.log("invulnerable!!!!!!!!!!!!!!!!!!!!!!!!");
				this.invulnerable = false;
			} else {
				// console.log({"TIEMPO INVULNERABLE TRANSCURRIDO": this.tiempoInvulnerableTranscurrido});
				this.tiempoInvulnerableTranscurrido += juego.deltaTiempo;
			}
		}

		this.dibujar();

		this.animarSprite();

		if (this.posicion.y - this.velocidad.y > canvas.height) {
			this.vida = 0;
			this.velocidad.y = 0;
		} else if (this.posicion.y + this.velocidad.y < canvas.height - this.height) {
			this.velocidad.y += juego.gravedad;
		}

		// cambia la velocidad para mover el personaje e indica la direccion (derecha o izquierda)
		this.cambiarVelocidad();

		// Cambia el estado que referencia al sprite de animacion
		this.cambiarEstado();
	}
}
