class Ayuda extends Sprite {
	constructor({ posicion = { x: 0, y: 0 }, velocidad = { x: 0, y: 0 }, imagenes, offset = { x: 0, y: 0 } }) {
		super({ posicion, velocidad, imagenes });
		this.ocultar = false;

		this.mapaLibro = {
			abrirLibro: {
				contadorLimiteCuadros: 10,
				frames: 8,
			},
			cerrarLibro: {
				contadorLimiteCuadros: 10,
				frames: 8,
				libroCerrado: false,
			},
			botonCerrar: {
				cuadroActual: 0,
				contadorCuadros: 0,
				contadorLimiteCuadros: 10,
				frames: 5,
				opacidad: 0,
				posicion: {
					x:
						this.posicion.x +
						this.imagenes.abrirLibro.frame_1.width * juego.proporciones.ayuda.libro -
						this.imagenes.abrirLibro.frame_1.width * 0.07 * juego.proporciones.ayuda.libro -
						this.imagenes.botonCerrar.width * juego.proporciones.ayuda.cerrar,
					y: this.posicion.y + this.imagenes.abrirLibro.frame_1.height * 0.27 * juego.proporciones.ayuda.libro,
				},
				botonActivo: false,
				eventoCreado: false,
			},
			botonArriba: {
				cuadroActual: 0,
				contadorCuadros: 0,
				contadorLimiteCuadros: 24,
				posicion: {
					x: this.posicion.x + (this.imagenes.abrirLibro.frame_1.width * 0.25 + 16) * juego.proporciones.ayuda.libro - (this.imagenes.botonArriba.frame_1.width / 2) * juego.proporciones.ayuda.teclas,
					y: this.posicion.y + this.imagenes.abrirLibro.frame_1.height * 0.27 * juego.proporciones.ayuda.libro,
				},
				frames: 2,
			},
			botonW: {
				cuadroActual: 0,
				contadorCuadros: 0,
				contadorLimiteCuadros: 24,
				posicion: {
					x: this.posicion.x + (this.imagenes.abrirLibro.frame_1.width * 0.75 - 8) * juego.proporciones.ayuda.libro - (this.imagenes.botonArriba.frame_1.width / 2) * juego.proporciones.ayuda.teclas,
					y: this.posicion.y + this.imagenes.abrirLibro.frame_1.height * 0.27 * juego.proporciones.ayuda.libro,
				},
				frames: 2,
			},
			botonIzquierda: {
				cuadroActual: 0,
				contadorCuadros: 0,
				contadorLimiteCuadros: 24,
				frames: 2,

				posicion: {
					x: this.posicion.x + (this.imagenes.abrirLibro.frame_1.width * 0.13 + 16) * juego.proporciones.ayuda.libro - (this.imagenes.botonIzquierda.frame_1.width / 2) * juego.proporciones.ayuda.teclas,
					y: this.posicion.y + this.imagenes.abrirLibro.frame_1.height * 0.38 * juego.proporciones.ayuda.libro,
				},
			},
			botonA: {
				cuadroActual: 0,
				contadorCuadros: 0,
				contadorLimiteCuadros: 24,
				posicion: {
					x: this.posicion.x + this.imagenes.abrirLibro.frame_1.width * 0.63 * juego.proporciones.ayuda.libro - (this.imagenes.botonIzquierda.frame_1.width / 2) * juego.proporciones.ayuda.teclas,
					y: this.posicion.y + this.imagenes.abrirLibro.frame_1.height * 0.38 * juego.proporciones.ayuda.libro,
				},
				frames: 2,
			},
			botonDerecha: {
				cuadroActual: 0,
				contadorCuadros: 0,
				contadorLimiteCuadros: 24,
				frames: 2,
				posicion: {
					x:
						this.posicion.x +
						(this.imagenes.abrirLibro.frame_1.width * 0.5 - this.imagenes.abrirLibro.frame_1.width * 0.13) * juego.proporciones.ayuda.libro -
						(this.imagenes.botonDerecha.frame_1.width / 2) * juego.proporciones.ayuda.teclas,
					y: this.posicion.y + this.imagenes.abrirLibro.frame_1.height * 0.38 * juego.proporciones.ayuda.libro,
				},
			},
			botonD: {
				cuadroActual: 0,
				contadorCuadros: 0,
				contadorLimiteCuadros: 24,
				posicion: {
					x:
						this.posicion.x +
						(this.imagenes.abrirLibro.frame_1.width - 16 - this.imagenes.abrirLibro.frame_1.width * 0.13) * juego.proporciones.ayuda.libro -
						(this.imagenes.botonDerecha.frame_1.width / 2) * juego.proporciones.ayuda.teclas,
					y: this.posicion.y + this.imagenes.abrirLibro.frame_1.height * 0.38 * juego.proporciones.ayuda.libro,
				},
				frames: 2,
			},
			botonEspacio: {
				cuadroActual: 0,
				contadorCuadros: 0,
				contadorLimiteCuadros: 24,
				frames: 2,
				posicion: {
					x: this.posicion.x + (this.imagenes.abrirLibro.frame_1.width * 0.25 + 16) * juego.proporciones.ayuda.libro - (this.imagenes.botonEspacio.frame_1.width / 2) * juego.proporciones.ayuda.teclas,
					y: this.posicion.y + this.imagenes.abrirLibro.frame_1.height * 0.5 * juego.proporciones.ayuda.libro,
				},
			},
			botonCheck: {
				cuadroActual: 0,
				contadorCuadros: 0,
				contadorLimiteCuadros: 8,
				frames: 5,
				opacidad: 0,
				botonActivo: false,
				eventoCreado: false,
				imagen: this.imagenes.botonUncheck,
				posicion: {
					x: this.posicion.x + this.imagenes.abrirLibro.frame_1.width * juego.proporciones.ayuda.libro * 0.08,
					y: this.posicion.y + this.imagenes.abrirLibro.frame_1.height * 0.65 * juego.proporciones.ayuda.libro,
				},
			},
		};
		this.contadorCuadros = 0;
		this.cuadroActual = 0;

		this.estado = 'abrirLibro';
		this.imagenActual = this.imagenes[this.estado].frame_1;
	}

	actualizarSprite() {
		if (!this.mapaLibro.cerrarLibro.libroCerrado) {
			this.dibujarLibro();
		} else {
			if (this.mapaLibro.botonCheck.imagen == this.imagenes.botonCheck) {
				sessionStorage.setItem('ocultarAyuda', true);
			} else {
				sessionStorage.removeItem('ocultarAyuda');
			}
		}

		if (this.estado == 'abrirLibro') {
			if (this.cuadroActual >= this.mapaLibro[this.estado].frames - 1) {
				this.dibujarBotonCerrar();
				this.dibujarBotonArriba();
				this.dibujarBotonW();
				this.dibujarBotonA();
				this.dibujarBotonD();
				this.dibujarBotonDerecha();
				this.dibujarBotonIzquierda();
				this.dibujarBotonEspacio();
				this.dibujarBotonCheck();
			}
		}

		this.animarSprite();
	}

	dibujarLibro() {
		ctx.drawImage(this.imagenActual, 0, 0, this.imagenActual.width, this.imagenActual.height, this.posicion.x, this.posicion.y, this.imagenActual.width * juego.proporciones.ayuda.libro, this.imagenActual.height * juego.proporciones.ayuda.libro);
	}

	animarSprite() {
		this.contadorCuadros++;

		if (this.contadorCuadros % Math.ceil(this.mapaLibro[this.estado].contadorLimiteCuadros / juego.proporcionesFPS.proporcionLimiteCuadros) == 0) {
			if (this.cuadroActual < this.mapaLibro[this.estado].frames - 1) {
				this.cuadroActual++;
				this.imagenActual = Object.values(this.imagenes[this.estado])[this.cuadroActual];

				if (this.estado == 'cerrarLibro') {
					if (this.cuadroActual + 1 > this.mapaLibro[this.estado].frames - 1) {
						this.mapaLibro.cerrarLibro.libroCerrado = true;
					}
				}
			}
		}
	}

	cerrarLibro(e) {
		if (
			e.clientX >= this.mapaLibro.botonCerrar.posicion.x + 7 &&
			e.clientX <= this.mapaLibro.botonCerrar.posicion.x - 7 + this.imagenes.botonCerrar.width * juego.proporciones.ayuda.botonCerrar &&
			e.clientY >= this.mapaLibro.botonCerrar.posicion.y + 7 &&
			e.clientY <= this.mapaLibro.botonCerrar.posicion.y - 7 + this.imagenes.botonCerrar.height * juego.proporciones.ayuda.botonCerrar &&
			this.mapaLibro.botonCerrar.botonActivo
		) {
			this.estado = 'cerrarLibro';
			this.imagenActual = this.imagenActual = this.imagenes[this.estado].frame_1;
			this.cuadroActual = 0;

			this.mapaLibro.botonCerrar.botonActivo = false;
		}
	}

	ocultarMensaje(e) {
		// console.log("clickkkkk");
		// console.log(e);

		// 7 offset x
		if (
			e.clientX >= this.mapaLibro.botonCheck.posicion.x &&
			e.clientX <= this.mapaLibro.botonCheck.posicion.x + this.mapaLibro.botonCheck.imagen.width * juego.proporciones.ayuda.check &&
			e.clientY >= this.mapaLibro.botonCheck.posicion.y &&
			e.clientY <= this.mapaLibro.botonCheck.posicion.y + this.mapaLibro.botonCheck.imagen.height * juego.proporciones.ayuda.check &&
			this.mapaLibro.botonCerrar.botonActivo
		) {
			if (this.mapaLibro.botonCheck.imagen == this.imagenes.botonCheck) {
				this.mapaLibro.botonCheck.imagen = this.imagenes.botonUncheck;
			} else {
				this.mapaLibro.botonCheck.imagen = this.imagenes.botonCheck;
			}
		}
	}

	dibujarBotonArriba() {
		this.mapaLibro.botonArriba.contadorCuadros++;

		if (this.mapaLibro.botonArriba.contadorCuadros % Math.floor(this.mapaLibro.botonArriba.contadorLimiteCuadros / juego.proporcionesFPS.proporcionLimiteCuadros) == 0) {
			if (this.mapaLibro.botonArriba.cuadroActual < this.mapaLibro.botonArriba.frames - 1) {
				this.mapaLibro.botonArriba.cuadroActual++;
			} else {
				this.mapaLibro.botonArriba.cuadroActual = 0;
			}
		}

		let imagen = this.mapaLibro.botonArriba.cuadroActual == 0 ? this.imagenes.botonArriba.frame_1 : this.imagenes.botonArriba.frame_2;

		ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height, this.mapaLibro.botonArriba.posicion.x, this.mapaLibro.botonArriba.posicion.y, imagen.width * juego.proporciones.ayuda.teclas, imagen.height * juego.proporciones.ayuda.teclas);

		ctx.font = `${juego.proporciones.texto * 16}px VT323`;
		ctx.fillStyle = 'black';

		let texto = 'Saltar';

		ctx.fillText(
			texto,
			this.mapaLibro.botonArriba.posicion.x + (this.imagenes.botonArriba.frame_1.width / 2) * juego.proporciones.ayuda.teclas - ctx.measureText(texto).width / 2,
			this.mapaLibro.botonArriba.posicion.y + this.imagenes.botonArriba.frame_1.height * juego.proporciones.ayuda.teclas + 25,
		);
	}

	dibujarBotonW() {
		this.mapaLibro.botonW.contadorCuadros++;

		if (this.mapaLibro.botonW.contadorCuadros % Math.floor(this.mapaLibro.botonW.contadorLimiteCuadros / juego.proporcionesFPS.proporcionLimiteCuadros) == 0) {
			if (this.mapaLibro.botonW.cuadroActual < this.mapaLibro.botonW.frames - 1) {
				this.mapaLibro.botonW.cuadroActual++;
			} else {
				this.mapaLibro.botonW.cuadroActual = 0;
			}
		}

		let imagen = this.mapaLibro.botonW.cuadroActual == 0 ? this.imagenes.botonW.frame_1 : this.imagenes.botonW.frame_2;

		ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height, this.mapaLibro.botonW.posicion.x, this.mapaLibro.botonW.posicion.y, imagen.width * juego.proporciones.ayuda.teclas, imagen.height * juego.proporciones.ayuda.teclas);

		ctx.font = `${juego.proporciones.texto * 16}px VT323`;
		ctx.fillStyle = 'black';

		let texto = 'Saltar';

		ctx.fillText(
			texto,
			this.mapaLibro.botonW.posicion.x + (this.imagenes.botonW.frame_1.width / 2) * juego.proporciones.ayuda.teclas - ctx.measureText(texto).width / 2,
			this.mapaLibro.botonW.posicion.y + this.imagenes.botonW.frame_1.height * juego.proporciones.ayuda.teclas + 25,
		);
	}
	dibujarBotonA() {
		this.mapaLibro.botonA.contadorCuadros++;

		if (this.mapaLibro.botonA.contadorCuadros % Math.floor(this.mapaLibro.botonA.contadorLimiteCuadros / juego.proporcionesFPS.proporcionLimiteCuadros) == 0) {
			if (this.mapaLibro.botonA.cuadroActual < this.mapaLibro.botonA.frames - 1) {
				this.mapaLibro.botonA.cuadroActual++;
			} else {
				this.mapaLibro.botonA.cuadroActual = 0;
			}
		}

		let imagen = this.mapaLibro.botonA.cuadroActual == 0 ? this.imagenes.botonA.frame_1 : this.imagenes.botonA.frame_2;

		ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height, this.mapaLibro.botonA.posicion.x, this.mapaLibro.botonA.posicion.y, imagen.width * juego.proporciones.ayuda.teclas, imagen.height * juego.proporciones.ayuda.teclas);

		ctx.font = `${juego.proporciones.texto * 16}px VT323`;
		ctx.fillStyle = 'black';

		let texto = 'Mover Izquierda';

		ctx.fillText(
			texto,
			this.mapaLibro.botonA.posicion.x + (this.imagenes.botonA.frame_1.width / 2) * juego.proporciones.ayuda.teclas - ctx.measureText(texto).width / 2,
			this.mapaLibro.botonA.posicion.y + this.imagenes.botonA.frame_1.height * juego.proporciones.ayuda.teclas + 25,
		);
	}
	dibujarBotonD() {
		this.mapaLibro.botonD.contadorCuadros++;

		if (this.mapaLibro.botonD.contadorCuadros % Math.floor(this.mapaLibro.botonD.contadorLimiteCuadros / juego.proporcionesFPS.proporcionLimiteCuadros) == 0) {
			if (this.mapaLibro.botonD.cuadroActual < this.mapaLibro.botonD.frames - 1) {
				this.mapaLibro.botonD.cuadroActual++;
			} else {
				this.mapaLibro.botonD.cuadroActual = 0;
			}
		}

		let imagen = this.mapaLibro.botonD.cuadroActual == 0 ? this.imagenes.botonD.frame_1 : this.imagenes.botonD.frame_2;

		ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height, this.mapaLibro.botonD.posicion.x, this.mapaLibro.botonD.posicion.y, imagen.width * juego.proporciones.ayuda.teclas, imagen.height * juego.proporciones.ayuda.teclas);

		ctx.font = `${juego.proporciones.texto * 16}px VT323`;
		ctx.fillStyle = 'black';

		let texto = 'Mover Derecha';

		ctx.fillText(
			texto,
			this.mapaLibro.botonD.posicion.x + (this.imagenes.botonD.frame_1.width / 2) * juego.proporciones.ayuda.teclas - ctx.measureText(texto).width / 2,
			this.mapaLibro.botonD.posicion.y + this.imagenes.botonD.frame_1.height * juego.proporciones.ayuda.teclas + 25,
		);
	}

	dibujarBotonDerecha() {
		this.mapaLibro.botonDerecha.contadorCuadros++;

		if (this.mapaLibro.botonDerecha.contadorCuadros % Math.floor(this.mapaLibro.botonDerecha.contadorLimiteCuadros / juego.proporcionesFPS.proporcionLimiteCuadros) == 0) {
			if (this.mapaLibro.botonDerecha.cuadroActual < this.mapaLibro.botonDerecha.frames - 1) {
				this.mapaLibro.botonDerecha.cuadroActual++;
			} else {
				this.mapaLibro.botonDerecha.cuadroActual = 0;
			}
		}

		let imagen = this.mapaLibro.botonDerecha.cuadroActual == 0 ? this.imagenes.botonDerecha.frame_1 : this.imagenes.botonDerecha.frame_2;

		ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height, this.mapaLibro.botonDerecha.posicion.x, this.mapaLibro.botonDerecha.posicion.y, imagen.width * juego.proporciones.ayuda.teclas, imagen.height * juego.proporciones.ayuda.teclas);

		ctx.font = `${juego.proporciones.texto * 16}px VT323`;
		ctx.fillStyle = 'black';

		let texto = 'Mover Derecha';

		ctx.fillText(
			texto,
			this.mapaLibro.botonDerecha.posicion.x + (this.imagenes.botonDerecha.frame_1.width / 2) * juego.proporciones.ayuda.teclas - ctx.measureText(texto).width / 2,
			this.mapaLibro.botonDerecha.posicion.y + this.imagenes.botonDerecha.frame_1.height * juego.proporciones.ayuda.teclas + 25,
		);
	}

	dibujarBotonIzquierda() {
		this.mapaLibro.botonIzquierda.contadorCuadros++;

		if (this.mapaLibro.botonIzquierda.contadorCuadros % Math.floor(this.mapaLibro.botonIzquierda.contadorLimiteCuadros / juego.proporcionesFPS.proporcionLimiteCuadros) == 0) {
			if (this.mapaLibro.botonIzquierda.cuadroActual < this.mapaLibro.botonIzquierda.frames - 1) {
				this.mapaLibro.botonIzquierda.cuadroActual++;
			} else {
				this.mapaLibro.botonIzquierda.cuadroActual = 0;
			}
		}

		let imagen = this.mapaLibro.botonIzquierda.cuadroActual == 0 ? this.imagenes.botonIzquierda.frame_1 : this.imagenes.botonIzquierda.frame_2;

		ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height, this.mapaLibro.botonIzquierda.posicion.x, this.mapaLibro.botonIzquierda.posicion.y, imagen.width * juego.proporciones.ayuda.teclas, imagen.height * juego.proporciones.ayuda.teclas);

		ctx.font = `${juego.proporciones.texto * 16}px VT323`;
		ctx.fillStyle = 'black';

		let texto = 'Mover Izquierda';

		ctx.fillText(
			texto,
			this.mapaLibro.botonIzquierda.posicion.x + (this.imagenes.botonIzquierda.frame_1.width / 2) * juego.proporciones.ayuda.teclas - ctx.measureText(texto).width / 2,
			this.mapaLibro.botonIzquierda.posicion.y + this.imagenes.botonIzquierda.frame_1.height * juego.proporciones.ayuda.teclas + 25,
		);
	}

	dibujarBotonEspacio() {
		this.mapaLibro.botonEspacio.contadorCuadros++;

		if (this.mapaLibro.botonEspacio.contadorCuadros % Math.floor(this.mapaLibro.botonEspacio.contadorLimiteCuadros / juego.proporcionesFPS.proporcionLimiteCuadros) == 0) {
			if (this.mapaLibro.botonEspacio.cuadroActual < this.mapaLibro.botonEspacio.frames - 1) {
				this.mapaLibro.botonEspacio.cuadroActual++;
			} else {
				this.mapaLibro.botonEspacio.cuadroActual = 0;
			}
		}

		let imagen = this.mapaLibro.botonEspacio.cuadroActual == 0 ? this.imagenes.botonEspacio.frame_1 : this.imagenes.botonEspacio.frame_2;

		ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height, this.mapaLibro.botonEspacio.posicion.x, this.mapaLibro.botonEspacio.posicion.y, imagen.width * juego.proporciones.ayuda.teclas, imagen.height * juego.proporciones.ayuda.teclas);

		ctx.font = `${juego.proporciones.texto * 16}px VT323`;
		ctx.fillStyle = 'black';

		let texto = 'Atacar';

		ctx.fillText(
			texto,
			this.mapaLibro.botonEspacio.posicion.x + (this.imagenes.botonEspacio.frame_1.width / 2) * juego.proporciones.ayuda.teclas - ctx.measureText(texto).width / 2,
			this.mapaLibro.botonEspacio.posicion.y + this.imagenes.botonEspacio.frame_1.height * juego.proporciones.ayuda.teclas + 25,
		);
	}

	dibujarBotonCheck() {
		if (!this.mapaLibro.botonCheck.eventoCreado) {
			this.mapaLibro.botonCheck.eventoCreado = true;
			document.addEventListener('click', this.cerrarLibro.bind(this));
		}

		ctx.drawImage(
			this.mapaLibro.botonCheck.imagen,
			0,
			0,
			this.mapaLibro.botonCheck.imagen.width,
			this.mapaLibro.botonCheck.imagen.height,
			this.mapaLibro.botonCheck.posicion.x,
			this.mapaLibro.botonCheck.posicion.y,
			this.mapaLibro.botonCheck.imagen.width * juego.proporciones.ayuda.check,
			this.mapaLibro.botonCheck.imagen.height * juego.proporciones.ayuda.check,
		);

		ctx.font = `${juego.proporciones.texto * 16}px VT323`;
		let texto = 'No volver a mostrar';

		ctx.fillText(
			texto,
			this.mapaLibro.botonCheck.posicion.x + this.imagenes.botonCheck.width * juego.proporciones.ayuda.teclas + 10,
			this.mapaLibro.botonCheck.posicion.y + (this.imagenes.botonCheck.height / 2) * juego.proporciones.ayuda.teclas + (juego.proporciones.texto * 16) / 2,
		);
	}

	dibujarBotonCerrar() {
		if (this.mapaLibro.botonCerrar.botonActivo != true) {
			this.mapaLibro.botonCerrar.botonActivo = true;
		}

		this.mapaLibro.botonCerrar.contadorCuadros++;

		if (this.mapaLibro.botonCerrar.contadorCuadros % Math.ceil(this.mapaLibro.botonCerrar.contadorLimiteCuadros / juego.proporcionesFPS.proporcionLimiteCuadros) == 0) {
			if (this.mapaLibro.botonCerrar.cuadroActual < this.mapaLibro.botonCerrar.frames - 1) {
				this.mapaLibro.botonCerrar.cuadroActual++;

				this.mapaLibro.botonCerrar.opacidad += 0.2;
			}
		}

		ctx.save();
		ctx.globalAlpha = this.mapaLibro.botonCerrar.opacidad;

		ctx.drawImage(
			this.imagenes.botonCerrar,
			0,
			0,
			this.imagenes.botonCerrar.width,
			this.imagenes.botonCerrar.height,
			this.mapaLibro.botonCerrar.posicion.x,
			this.mapaLibro.botonCerrar.posicion.y,
			this.imagenes.botonCerrar.width * juego.proporciones.ayuda.cerrar,
			this.imagenes.botonCerrar.height * juego.proporciones.ayuda.cerrar,
		);

		ctx.restore();

		if (!this.mapaLibro.botonCerrar.eventoCreado) {
			this.mapaLibro.botonCerrar.eventoCreado = true;
			document.addEventListener('click', this.ocultarMensaje.bind(this));
		}
	}
}
