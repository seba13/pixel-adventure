class Ataque extends Sprite {
	constructor({ posicion = { x: 0, y: 0 }, velocidad = { x: 0, y: 0 }, imagenes, offset = { x: 0, y: 0 }, direccion, daño }) {
		super({ posicion, velocidad, imagenes });

		this.daño = daño;
		this.offset = offset;
		this.offset.x = offset.x * juego.proporciones.bolaFuego;
		this.offset.y = offset.y * juego.proporciones.bolaFuego;
		this.impactando = false;
		this.mostrarImpacto = true;

		this.direcion = direccion;
		// this.posicion.y =
		this.mapaAtaque = {
			bolaFuego: {
				ataque: {
					x: 0,
					y: 0,
					frames: 60,
					contadorLimiteCuadros: 8,
				},
				impacto: {
					x: 0,
					y: 0,
					frames: 4,
					contadorLimiteCuadros: 24,
				},
				// framesTotales: 60,
				estadoAtaque: 'ataque',
			},
			cuadroActual: 0,
			contadorCuados: 0,
			// contadorLimiteCuadros: 48
		};
		this.alcanceAtaque = {
			bolaFuego: {
				x: this.posicion.x,
				alcance: 600,
			},
		};

		this.mapaAtaque.bolaFuego.ataque.width = this.imagenes.bolaFuego.width / this.mapaAtaque.bolaFuego.ataque.frames;
		this.mapaAtaque.bolaFuego.ataque.height = this.imagenes.bolaFuego.height;

		this.mapaAtaque.bolaFuego.impacto.width = this.imagenes.impactoAtaque.width / this.mapaAtaque.bolaFuego.impacto.frames;
		this.mapaAtaque.bolaFuego.impacto.height = this.imagenes.impactoAtaque.height;

		this.anchoColision = this.mapaAtaque.bolaFuego.ataque.width * juego.proporciones.bolaFuego - this.offset.x;
		this.altoColision = this.imagenes.bolaFuego.height * juego.proporciones.bolaFuego - this.offset.y;

		this.liberar = false;
	}

	dibujarAtaque() {
		let flip = 0;
		if (this.direcion === 'izquierda') {
			ctx.save();
			ctx.scale(-1, 1);
			flip = -1;
		} else {
			ctx.save();
			ctx.scale(1, 1);
			flip = 1;
		}

		ctx.drawImage(
			this.imagenes.bolaFuego,
			this.mapaAtaque.bolaFuego.ataque.x + this.mapaAtaque.bolaFuego.ataque.width * this.mapaAtaque.cuadroActual,
			this.mapaAtaque.bolaFuego.ataque.y,
			this.mapaAtaque.bolaFuego.ataque.width,
			this.mapaAtaque.bolaFuego.ataque.height,
			this.posicion.x * flip,
			this.posicion.y,
			this.mapaAtaque.bolaFuego.ataque.width * juego.proporciones.bolaFuego * flip,
			this.mapaAtaque.bolaFuego.ataque.height * juego.proporciones.bolaFuego,
		);
		// ctx.drawImage(
		// 	this.imagenes.tileset,
		// 	this.mapa[this.estado].x + 32 * this.cuadroActual,
		// 	this.mapa[this.estado].y,
		// 	32,
		// 	32,
		// 	(this.posicion.x - this.offset.x * this.escalaSprite) * flip,
		// 	this.posicion.y,
		// 	32 * this.escalaSprite * flip,
		// 	32 * this.escalaSprite,
		// );

		// RECTANGULO DE PRUEBA DE COLISION DE PROYECTIL DE ATAQUE DEL PERSONAJE
		// ctx.fillStyle = 'rgba(0,0,255,.5)';
		// ctx.fillRect( (this.posicion.x + this.offset.x/2)*flip, this.posicion.y + this.offset.y/2, this.anchoColision *flip , this.altoColision);

		ctx.restore();
	}

	dibujarImpacto() {
		let flip = 0;
		if (this.direcion === 'izquierda') {
			ctx.save();
			ctx.scale(-1, 1);
			flip = -1;
		} else {
			ctx.save();
			ctx.scale(1, 1);
			flip = 1;
		}

		ctx.drawImage(
			this.imagenes.impactoAtaque,
			this.mapaAtaque.bolaFuego.impacto.width * this.mapaAtaque.cuadroActual,
			this.mapaAtaque.bolaFuego.impacto.y,
			this.mapaAtaque.bolaFuego.impacto.width,
			this.mapaAtaque.bolaFuego.impacto.height,
			(this.posicion.x + this.offset.x * flip) * flip,
			this.posicion.y,
			this.mapaAtaque.bolaFuego.impacto.width * juego.proporciones.impacto * flip,
			this.mapaAtaque.bolaFuego.impacto.height * juego.proporciones.impacto,
		);

		ctx.restore();
	}

	animarAtaque() {
		this.mapaAtaque.contadorCuados++;
		if (this.mapaAtaque.contadorCuados % (this.mapaAtaque.bolaFuego[this.mapaAtaque.bolaFuego.estadoAtaque].contadorLimiteCuadros/juego.proporcionesFPS.proporcionLimiteCuadros) == 0) {
			if (this.mapaAtaque.cuadroActual < this.mapaAtaque.bolaFuego[this.mapaAtaque.bolaFuego.estadoAtaque].frames - 1) {
				this.mapaAtaque.cuadroActual++;

				if (this.mapaAtaque.bolaFuego.estadoAtaque == 'impacto') {
					console.log('estado impacto');
					if (this.mapaAtaque.cuadroActual + 1 >= this.mapaAtaque.bolaFuego[this.mapaAtaque.bolaFuego.estadoAtaque].frames - 1) {
						this.impactando = false;
						this.liberar = true;
					}
				}
			} else {
				this.mapaAtaque.cuadroActual = 0;
			}
			// else
			// {
			//     this.mapaAtaque.cuadroActual = 0
			//     if(this.mapaAtaque.bolaFuego.estadoAtaque = 'impacto') {
			//         this.liberar = true
			//     }
			// }
		}
	}

	detectarColisionEnemigo() {
		if (!this.impactando) {
			juego.fondo.escenario.plataformas.forEach((plataforma) => {
				plataforma.enemigos.forEach((enemigo) => {
					if (enemigo.vida > 0) {
						if (
							this.posicion.x + this.offset.x / 2 + this.anchoColision >= enemigo.posicion.x + enemigo.offset.x / 2 &&
							this.posicion.x + this.offset.x / 2 <= enemigo.posicion.x + enemigo.offset.x / 2 + enemigo.anchoColision &&
							this.posicion.y + this.offset.y / 2 + this.altoColision >= enemigo.posicion.y + enemigo.offset.y / 2 &&
							this.posicion.y + this.offset.y / 2 <= enemigo.posicion.y + enemigo.offset.y + enemigo.altoColision
						) {
							if (enemigo.vida + enemigo.defensa - this.daño < 0) {
								this.mostrarImpacto = false;
							}
							this.impactando = true;
							enemigo.recibirDaño(this.daño);
						}
					}
				});
			});
		}
	}

	cambiarEstado() {
		if (this.impactando) {
			if (this.mapaAtaque.bolaFuego.estadoAtaque != 'impacto') {
				this.mapaAtaque.bolaFuego.estadoAtaque = 'impacto';
				this.mapaAtaque.cuadroActual = 0;
			}
		}
	}

	actualizarAtaque() {
		if (this.impactando) {
			this.velocidad.x = 0;
		}
		this.posicion.x += this.velocidad.x;

		if (this.posicion.x + this.mapaAtaque.bolaFuego.ataque.width * juego.proporciones.bolaFuego < 0 || this.posicion.x > canvas.width) {
			this.liberar = true;
		}

		this.cambiarEstado();
		this.detectarColisionEnemigo();

		if (this.mapaAtaque.bolaFuego.estadoAtaque == 'ataque') {
			this.dibujarAtaque();
		} else if (this.mapaAtaque.bolaFuego.estadoAtaque == 'impacto' && this.impactando) {
			if (this.mostrarImpacto) {
				this.dibujarImpacto();
			}
		}
		this.animarAtaque();
	}
}
