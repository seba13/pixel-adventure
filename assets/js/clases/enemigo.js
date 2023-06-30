class Enemigo extends Sprite {
	constructor({ posicion = { x: 0, y: 0 }, velocidad = { x: 0, y: 0 }, imagenes }) {
		super({ posicion, velocidad, imagenes });
	}

	actualizar() {
		this.cambiarEstado();

		if (!this.recibiendoDaño && this.vida > 0) {
			if (this.rangoPersecucion()) {
				console.log("PERSEGUIR");
				this.perseguirJugador();
			} else {
				if (this.centrando == false) {
					
					// this.realizarGuardia();
				} else {
					console.log("CENTRAR");
					this.centrar();
				}
			}
		}

		this.animarSprite();

		if (this.vida > 0) {
			this.dibujar();
		} else {
			if (this.muriendo) {
				this.dibujarMuerte();
				this.dibujarPuntaje();
			}
		}
	}

	dibujarPuntaje() {
		// this.mapaPuntaje.y = this.posicion.y + this.offset.y + this.altoColision
		// this.mapaPuntaje.y = this.posicion.y - this.offset.y + juego.proporciones.texto * this.mapaPuntaje.tamañoFuente

		this.mapaPuntaje.contadorCuadros++;
		if (this.mapaPuntaje.contadorCuadros % Math.ceil(this.mapaPuntaje.contadorLimiteCuadros / juego.proporcionesFPS.proporcionLimiteCuadros) == 0) {
			if (this.mapaPuntaje.cuadroActual < this.mapaPuntaje.frames - 1) {
				this.mapaPuntaje.cuadroActual++;
				this.mapaPuntaje.y = this.posicion.y + this.offset.y + this.altoColision - juego.proporciones.texto * this.mapaPuntaje.tamañoFuente;
				this.mapaPuntaje.tamañoFuente += 1;

				if (this.mapaPuntaje.cuadroActual > this.mapaPuntaje.frames - 10) {
					this.mapaPuntaje.opacidad -= 0.1;
				}
			} else {
				juego.personaje.agregarPuntaje(this.puntaje)
				this.liberar = true;
			}
		}

		ctx.save();
		ctx.globalAlpha = this.mapaPuntaje.opacidad;
		ctx.font = `${juego.proporciones.texto * this.mapaPuntaje.tamañoFuente}px VT323`;
		ctx.fillStyle = this.mapaPuntaje.colorPuntaje;

		ctx.fillText(`+${this.puntaje}`, this.posicion.x + this.offset.x / 2 + this.anchoColision / 2, this.mapaPuntaje.y);
		ctx.restore();
	}

	realizarGuardia() {
		console.log('GUARDIA!!!');

		this.tiempo += juego.deltaTiempo / 1000;
		this.velocidad.x = 0;

		if (this.tiempo > this.tiempoInactivo && this.tiempo < this.tiempoIzquierda) {
			if (this.posicion.x + this.velocidad.x + this.offset.x / 2 >= this.posicionInicial - this.alcance) {
				this.ultimaDireccion = 'izquierda';
				this.velocidad.x = -juego.proporcionesFPS.proporcionMovimientoEnemigo;
				console.log('GUARDIA DIR IZQ');
			}
		} else if (this.tiempo < this.tiempoIzquierda + this.tiempoInactivo) {
			this.velocidad.x = 0;
		} else if (this.tiempo > this.tiempoIzquierda + this.tiempoInactivo && this.tiempo < this.tiempoCentrarIzquierda) {
			if (this.posicion.x + this.velocidad.x + this.offset.x / 2 + this.anchoColision <= this.posicionInicial) {
				this.ultimaDireccion = 'derecha';
				console.log('GUARDIA DIR IZQ CENTRO');
				this.velocidad.x = juego.proporcionesFPS.proporcionMovimientoEnemigo;
			}
		} else if (this.tiempo < this.tiempoCentrarIzquierda + this.tiempoInactivo) {
			this.velocidad.x = 0;
		} else if (this.tiempo < this.tiempoDerecha) {
			if (this.posicion.x + this.velocidad.x + this.offset.x / 2 + this.anchoColision <= this.posicionInicial + this.alcance) {
				this.ultimaDireccion = 'derecha';
				console.log('GUARDIA DIR DER');
				this.velocidad.x = juego.proporcionesFPS.proporcionMovimientoEnemigo;
			}
		} else if (this.tiempo < this.tiempoDerecha + this.tiempoInactivo) {
			this.velocidad.x = 0;
		} else if (this.tiempo < this.tiempoCentrarDerecha) {
			if (this.posicion.x + this.velocidad.x + this.offset.x / 2 >= this.posicionInicial) {
				this.ultimaDireccion = 'izquierda';
				console.log('GUARDIA DIR CENTRO DER');
				this.velocidad.x = -juego.proporcionesFPS.proporcionMovimientoEnemigo;
			}
		} else {
			this.tiempo = 0;
		}
	}

	rangoPersecucion() {
		// console.log("CONDICION");
		if (
			juego.personaje.posicion.x + juego.personaje.offset.x / 2 + juego.personaje.anchoColision >= this.posicionInicial - this.alcancePersecucion &&
			juego.personaje.posicion.x + juego.personaje.offset.x / 2 < this.posicionInicial + this.alcancePersecucion
		) {
			return true;
		}
		return false;
	}

	perseguirJugador() {
		// console.log("PERSECUCION");

		if (
			juego.personaje.posicion.x + juego.personaje.offset.x / 2 + juego.personaje.anchoColision >= this.posicionInicial - this.alcancePersecucion &&
			juego.personaje.posicion.x + juego.personaje.offset.x / 2 < this.posicionInicial + this.alcancePersecucion
		) {
			if (juego.personaje.posicion.x + juego.personaje.offset.x / 2 + juego.personaje.anchoColision + this.alcanceAtaque * juego.proporcionResolucion < this.posicion.x + this.offset.x / 2) {
				this.ultimaDireccion = 'izquierda';
				this.velocidad.x = -juego.proporcionesFPS.proporcionMovimientoEnemigo;
			} else if (juego.personaje.posicion.x + juego.personaje.offset.x / 2 - this.alcanceAtaque * juego.proporcionResolucion > this.posicion.x + this.offset.x / 2 + this.anchoColision) {
				this.ultimaDireccion = 'derecha';
				this.velocidad.x = juego.proporcionesFPS.proporcionMovimientoEnemigo;
			} else {
				this.velocidad.x = 0;
			}

			this.centrando = true;
		}
	}

	centrar() {
		if (this.centrando) {
			if (this.posicion.x + this.offset.x / 2 + this.alcance < this.posicionInicial) {
				this.ultimaDireccion = 'derecha';
				this.velocidad.x = juego.proporcionesFPS.proporcionMovimientoEnemigo;
			} else if (this.posicion.x + this.offset.x / 2 + this.anchoColision - this.alcance > this.posicionInicial) {
				this.ultimaDireccion = 'izquierda';
				this.velocidad.x = -juego.proporcionesFPS.proporcionMovimientoEnemigo;
			}
			if (this.posicion.x + this.offset.x / 2 + this.alcance == this.posicionInicial) {
				this.centrando = false;
			}
		}
	}

	cambiarEstado() {
		console.log("acacca");
		if (this.vida <= 0 && this.muriendo) {
			if (this.estado != 'muerte') {
				this.estado = 'muerte';
				this.cuadroActual = 0;
			}
			this.velocidad.x = 0;
			return;
		}
		if (this.recibiendoDaño) {
			if (this.estado != 'daño') {
				this.estado = 'daño';
				this.cuadroActual = 0;
			}
			return;
		}
		if (
			juego.personaje.posicion.x + juego.personaje.offset.x / 2 + juego.personaje.anchoColision + this.alcanceAtaque * juego.proporcionResolucion > this.posicion.x + this.offset.x / 2 &&
			juego.personaje.posicion.x + juego.personaje.offset.x / 2 + juego.personaje.anchoColision < this.posicion.x + this.offset.x / 2
		) {
			if (this.estado != 'atacar' && this.tiempoVolverAtacar >= this.tiempoRecarga) {
				this.tiempoVolverAtacar = 0;
				if (!juego.personaje.invulnerable && juego.personaje.vida > 0) {
					console.log('ESTADO ATACANDO');
					this.atacando = true;
					this.estado = 'atacar';
					this.cuadroActual = 0;
				}
			} else {
				this.tiempoVolverAtacar += juego.deltaTiempo;
			}
		}
		if (
			juego.personaje.posicion.x + juego.personaje.offset.x / 2 - this.alcanceAtaque * juego.proporcionResolucion < this.posicion.x + this.offset.x / 2 + this.anchoColision &&
			juego.personaje.posicion.x + juego.personaje.offset.x / 2 > this.posicion.x + this.offset.x / 2 + this.anchoColision
		) {
			if (this.estado != 'atacar' && this.tiempoVolverAtacar >= this.tiempoRecarga) {
				this.tiempoVolverAtacar = 0;
				if (!juego.personaje.invulnerable && juego.personaje.vida > 0) {
					console.log('ESTADO ATACANDO');
					this.atacando = true;
					this.estado = 'atacar';
					this.cuadroActual = 0;
				}
			} else {
				this.tiempoVolverAtacar += juego.deltaTiempo;
			}
		}
		if (this.atacando) {
			return;
		}
		if (this.velocidad.x == 0) {
			if (this.estado != 'inactivo') {
				this.cuadroActual = 0;
				this.estado = 'inactivo';
			}
		} else if (this.velocidad.x > 0 || this.velocidad.x < 0) {
			if (this.estado != 'caminar') {
				this.cuadroActual = 0;
				this.estado = 'caminar';
			}
		}
	}

	animarSprite() {
		if (this.posicion.x + this.offset.x / 2 + this.velocidad.x < this.plataforma.posicion.x + this.plataforma.offset.x / 2) {
			if (this.velocidad.x < 0) {
				this.velocidad.x = 0;
			}
		} else if (this.posicion.x + this.offset.x / 2 + this.anchoColision >= this.plataforma.posicion.x + this.plataforma.width - 2) {
			if (this.velocidad.x > 0) {
				this.velocidad.x = 0;
			}
		}
		this.posicion.x += this.velocidad.x;
		this.posicion.y += this.velocidad.y;

		this.contadorCuadros++;

		if (this.contadorCuadros % Math.ceil(this.mapa[this.estado].contadorLimiteCuadros / juego.proporcionesFPS.proporcionLimiteCuadros) == 0) {
			if (this.cuadroActual < this.mapa[this.estado].frames - 1) {
				this.cuadroActual++;

				if (this.estado == 'atacar' && juego.personaje.vida > 0) {
					if (this.cuadroActual == 2) {
						this.atacar();
					}
					if (this.cuadroActual + 1 >= this.mapa[this.estado].frames - 1) {
						this.atacando = false;
					}
				}

				if (this.estado == 'daño') {
					if (this.cuadroActual + 1 >= this.mapa[this.estado].frames - 1) {
						this.recibiendoDaño = false;
					}
				}

				if (this.estado == 'muerte') {
					if (this.cuadroActual + 1 >= this.mapa[this.estado].frames - 1) {
						this.muriendo = false;
						// this.liberar = true;
					}
				}
			} else {
				this.cuadroActual = 0;
			}
		}
	}

	atacar() {
		if (
			juego.personaje.posicion.x + juego.personaje.offset.x / 2 + juego.personaje.anchoColision >= this.posicion.x + this.offset.x / 2 - Math.ceil(this.rectangulocolisionAtaque.ancho * juego.proporcionResolucion) &&
			juego.personaje.posicion.x + juego.personaje.offset.x / 2 <= this.posicion.x + this.offset.x / 2 + this.anchoColision + Math.ceil(this.rectangulocolisionAtaque.ancho * juego.proporcionResolucion) &&
			juego.personaje.posicion.y + juego.personaje.height > this.posicion.y + this.offset.y - Math.ceil(this.rectangulocolisionAtaque.alto * juego.proporcionResolucion) &&
			juego.personaje.posicion.y < this.posicion.y + this.offset.y + this.altoColision + Math.ceil(this.rectangulocolisionAtaque.alto * juego.proporcionResolucion)
		) {
			juego.personaje.recibirDaño(this.dañoAtaque);
		}
	}

	recibirDaño(daño) {
		if (this.armadura <= 0) {
			this.vida -= daño - this.defensa;
		} else {
			this.armadura -= daño;
		}
		this.recibiendoDaño = true;

		if (this.vida < 0) {
			this.muriendo = true;
		}
	}

	dibujar() {
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

		ctx.drawImage(this.imagenes.enemigo, this.mapa[this.estado].x + this.anchoSprite * this.cuadroActual, this.mapa[this.estado].y, this.anchoSprite, this.altoSprite, this.posicion.x * flip, this.posicion.y, this.ancho * flip, this.alto);

		//RECTANGULO DE PRUEBA PARA EL RANGO DE ATAQUE DEL ENEMIGO

		// ctx.fillStyle = 'rgba(255,0,255, .2)';
		// if (this.ultimaDireccion === 'derecha') {
		// 	ctx.fillRect(
		// 		(this.posicion.x + this.offset.x / 2 + this.anchoColision) * flip,
		// 		this.posicion.y + this.offset.y - this.rectangulocolisionAtaque.alto,
		// 		this.rectangulocolisionAtaque.ancho * flip * juego.proporcionResolucion,
		// 		this.rectangulocolisionAtaque.alto,
		// 	);
		// } else {
		// 	ctx.fillRect(
		// 		(this.posicion.x + this.offset.x / 2 - this.rectangulocolisionAtaque.ancho) * flip,
		// 		this.posicion.y + this.offset.y - this.rectangulocolisionAtaque.alto,
		// 		this.rectangulocolisionAtaque.ancho * flip * juego.proporcionResolucion,
		// 		this.rectangulocolisionAtaque.alto,
		// 	);
		// }

		// BARRA DE VIDA DE ENEMIGO

		ctx.fillStyle = 'black';
		ctx.fillRect((this.posicion.x + this.offset.x / 2) * flip, this.posicion.y + this.offset.y / 2, this.anchoColision * flip, 10);

		// BARRA FONDO VIDA
		this.porcentajeArmadura = this.armadura / this.totalArmadura >= 0 ? this.armadura / this.totalArmadura : 0;
		this.porcentajeVida = this.vida / this.totalVida >= 0 ? this.vida / this.totalVida : 0;

		// VIDA ENEMIGO
		ctx.fillStyle = '#e63946';
		ctx.fillRect((this.posicion.x + this.offset.x / 2) * flip, this.posicion.y + this.offset.y / 2, this.anchoColision * this.porcentajeVida * flip, 10);

		// ARMADURA ENEMIGO
		ctx.fillStyle = '#ffb703';
		ctx.fillRect((this.posicion.x + this.offset.x / 2) * flip, this.posicion.y + this.offset.y / 2, this.anchoColision * this.porcentajeArmadura * flip, 10);

		ctx.restore();

		// RECTANGULOS DE PRUEBAS DE COLISIONES

		ctx.fillStyle = 'rgba(255,0,0,.4)';
		ctx.fillRect(this.posicion.x + this.offset.x / 2, this.posicion.y + this.offset.y, this.anchoColision, this.altoColision);

		ctx.fillStyle = 'rgba(255,0,255, .2)';
		ctx.fillRect(this.posicionInicial - this.alcancePersecucion, this.posicion.y, this.alcancePersecucion * 2, this.alto);

		ctx.fillStyle = 'rgba(255,255,0,.6)';
		ctx.fillRect(this.posicionInicial - this.alcance, this.posicion.y, this.alcance * 2, this.alto);
	}

	dibujarMuerte() {
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
			this.imagenes.muerte,
			this.mapa[this.estado].x + this.anchoSpriteHumo * this.cuadroActual,
			this.mapa[this.estado].y,
			this.anchoSpriteHumo,
			this.altoSpriteHumo,
			this.posicion.x * flip,
			this.posicion.y - this.offset.y + this.altoColision,
			this.anchoHumoEscalado * flip,
			this.altoHumoEscalado,
		);

		ctx.restore();
	}
}
