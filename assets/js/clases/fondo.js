class Fondo extends Sprite {
	constructor({ posicion, velocidad, imagenes, contadorLimiteCuadros, escenario }) {
		super({ posicion, velocidad, imagenes });

		this.PLANOS = {
			principal: 0.8,
			medio: 0.2,
			fondo: 0.09,
			'sin-definir': 0,
		};
		this.escenario = escenario;

		// ------------ ASIGNACIÓN IMAGEN POR DEFECTO Y POSICION (X e Y)

		// MONTAÑA 1
		this.imagenes.montaña_1.frameActual = this.imagenes.montaña_1.frame_1;
		this.imagenes.montaña_1.posicion.x = 0;
		this.imagenes.montaña_1.posicion.y = canvas.height - this.imagenes.montaña_1.frameActual.height * juego.proporciones.fondo.montaña_1;

		// MONTAÑA 2
		this.imagenes.montaña_2.frameActual = this.imagenes.montaña_2.frame_1;
		this.imagenes.montaña_2.posicion.x = canvas.width;
		this.imagenes.montaña_2.posicion.y = canvas.height - this.imagenes.montaña_2.frameActual.height * juego.proporciones.fondo.montaña_2;

		// MONTAÑA 3
		this.imagenes.montaña_3.frameActual = this.imagenes.montaña_3.frame_1;
		this.imagenes.montaña_3.posicion.x = this.imagenes.montaña_3.frameActual.width / 4;
		this.imagenes.montaña_3.posicion.y =
			canvas.height - this.imagenes.montaña_3.frameActual.height * juego.proporciones.fondo.montaña_3 + this.imagenes.montaña_3.offset.y;

		// MONTAÑA 4
		this.imagenes.montaña_4.frameActual = this.imagenes.montaña_4.frame_1;
		this.imagenes.montaña_4.posicion.x = canvas.width;
		this.imagenes.montaña_4.posicion.y = canvas.height - this.imagenes.montaña_4.frameActual.height * juego.proporciones.fondo.montaña_4 + this.imagenes.montaña_4.offset.y;

		// MONTAÑA 5
		this.imagenes.montaña_5.frameActual = this.imagenes.montaña_5.frame_1;
		this.imagenes.montaña_5.posicion.x =
			(this.imagenes.montaña_5.frameActual.width * juego.proporciones.fondo.montaña_5) / (200 * juego.proporciones.fondo.montaña_5);
		this.imagenes.montaña_5.posicion.y =
			canvas.height - this.imagenes.montaña_5.frameActual.height * juego.proporciones.fondo.montaña_5 + this.imagenes.montaña_5.offset.y;

		// NUBE 1
		this.imagenes.nube_1.frameActual = this.imagenes.nube_1.frame_1;
		this.imagenes.nube_1.posicion.x = this.imagenes.nube_1.frameActual.width;
		this.imagenes.nube_1.posicion.y = this.imagenes.montaña_4.posicion.y + 300;

		// NUBE 2
		this.imagenes.nube_2.frameActual = this.imagenes.nube_2.frame_1;
		this.imagenes.nube_2.posicion.x = 0;
		this.imagenes.nube_2.posicion.y = canvas.height - this.imagenes.nube_2.frameActual.height * juego.proporciones.fondo.nube_2;

		// NUBE 3
		this.imagenes.nube_3.frameActual = this.imagenes.nube_3.frame_1;
		this.imagenes.nube_3.posicion.y =
			canvas.height - this.imagenes.nube_3.frameActual.height * juego.proporciones.fondo.nube_3 + this.imagenes.nube_3.offset.y;

		this.contadorLimiteCuadros = contadorLimiteCuadros;
		this.contadorCuadros = 0;
	}


	


	dibujar() {
		//fondo
		ctx.drawImage(this.imagenes.fondo, 0, 0, this.imagenes.fondo.width, this.imagenes.fondo.height, 0, 0, canvas.width, canvas.height);

		// PLANO FONDO NUBE 1 INFERIOR
		// ctx.drawImage(
		// 	this.imagenes.nube_1.frameActual,
		// 	0,
		// 	0,
		// 	this.imagenes.nube_1.frameActual.width,
		// 	this.imagenes.nube_1.frameActual.height,
		// 	this.imagenes.nube_1.posicion.x,
		// 	this.imagenes.nube_1.posicion.y,
		// 	this.imagenes.nube_1.frameActual.width * this.imagenes.nube_1.escalaSprite,
		// 	this.imagenes.nube_1.frameActual.height * this.imagenes.nube_1.escalaSprite,
		// );

		//PLANO FONDO MONTAÑA 1 INFERIOR
		ctx.drawImage(
			this.imagenes.montaña_1.frameActual,
			0,
			0,
			this.imagenes.montaña_1.ancho,
			this.imagenes.montaña_1.frameActual.height,
			this.imagenes.montaña_1.posicion.x,
			this.imagenes.montaña_1.posicion.y,
			this.imagenes.montaña_1.ancho * juego.proporciones.fondo.montaña_1,
			this.imagenes.montaña_1.frameActual.height * juego.proporciones.fondo.montaña_1,
		);

		// PLANO FONDO MONTAÑA 2 INFERIOR
		ctx.drawImage(
			this.imagenes.montaña_2.frameActual,
			0,
			0,
			this.imagenes.montaña_2.ancho,
			this.imagenes.montaña_2.frameActual.height,
			this.imagenes.montaña_2.posicion.x,
			this.imagenes.montaña_2.posicion.y,
			this.imagenes.montaña_2.ancho * juego.proporciones.fondo.montaña_2,
			this.imagenes.montaña_2.frameActual.height * juego.proporciones.fondo.montaña_2,
		);

		//PLANO MEDIO Montaña 3 INFERIOR
		ctx.drawImage(
			this.imagenes.montaña_3.frameActual,
			this.imagenes.montaña_3.ancho,
			0,
			this.imagenes.montaña_3.frameActual.width,
			this.imagenes.montaña_3.frameActual.height,
			this.imagenes.montaña_3.posicion.x,
			this.imagenes.montaña_3.posicion.y,
			this.imagenes.montaña_3.frameActual.width * juego.proporciones.fondo.montaña_3,
			this.imagenes.montaña_3.frameActual.height * juego.proporciones.fondo.montaña_3,
		);

		//PLANO MEDIO Montaña 4 INFERIOR
		ctx.drawImage(
			this.imagenes.montaña_4.frameActual,
			this.imagenes.montaña_4.ancho,
			0,
			this.imagenes.montaña_4.frameActual.width,
			this.imagenes.montaña_4.frameActual.height,
			this.imagenes.montaña_4.posicion.x,
			this.imagenes.montaña_4.posicion.y,
			this.imagenes.montaña_4.frameActual.width * juego.proporciones.fondo.montaña_4,
			this.imagenes.montaña_4.frameActual.height * juego.proporciones.fondo.montaña_4,
		);

		// PLANO MEDIO NUBE 1
		ctx.drawImage(
			this.imagenes.nube_1.frameActual,
			0,
			0,
			this.imagenes.nube_1.frameActual.width,
			this.imagenes.nube_1.frameActual.height,
			this.imagenes.nube_1.posicion.x,
			this.imagenes.nube_1.posicion.y,
			this.imagenes.nube_1.frameActual.width * juego.proporciones.fondo.nube_1,
			this.imagenes.nube_1.frameActual.height * juego.proporciones.fondo.nube_1,
		);

		// Montaña 5 inferior (PLANO Principal)
		ctx.drawImage(
			this.imagenes.montaña_5.frameActual,
			0,
			0,
			this.imagenes.montaña_5.frameActual.width,
			this.imagenes.montaña_5.frameActual.height,
			this.imagenes.montaña_5.posicion.x,
			this.imagenes.montaña_5.posicion.y,
			this.imagenes.montaña_5.frameActual.width * juego.proporciones.fondo.montaña_5,
			this.imagenes.montaña_5.frameActual.height * juego.proporciones.fondo.montaña_5,
		);

		this.escenario.actualizarSprite();

		// Nube 3 inferior (PRIMER PLANO)
		

	}

	dibujarNube3() {
		ctx.drawImage(
			this.imagenes.nube_3.frameActual,
			0,
			0,
			this.imagenes.nube_2.frameActual.width,
			this.imagenes.nube_3.frameActual.height,
			this.imagenes.nube_3.posicion.x,
			this.imagenes.nube_3.posicion.y,
			this.imagenes.nube_3.frameActual.width * juego.proporciones.fondo.nube_3,
			this.imagenes.nube_3.frameActual.height * juego.proporciones.fondo.nube_3,
		);
	}

	alternarFrame(imagen) {
		if (imagen.frameActual && imagen.frame_1 && imagen.frame_2) {
			if (imagen.frameActual === imagen.frame_1) {
				imagen.frameActual = imagen.frame_2;
			} else {
				imagen.frameActual = imagen.frame_1;
			}
		}
	}

	moverFondo(imagen) {
		if (imagen.frameActual && imagen.frame_1 && imagen.frame_2) {

		
			// imagen.posicion.x -= this.PLANOS[imagen.plano];
			if (imagen.posicion.x + imagen.frameActual.width * juego.proporciones.fondo[imagen.proporcion] < 0) {
				imagen.posicion.x = canvas.width;
			}
			imagen.posicion.x += imagen.velocidad.x;
			if (imagen === this.imagenes.nube_3 || imagen === this.imagenes.nube_1) {
				imagen.velocidad.x = -this.PLANOS[imagen.plano];
			} else {
				if (
					( (juego.controles['ArrowRight'].presionada || juego.controles['d'].presionada) && juego.personaje.posicion.x > canvas.width * 0.6) ||
					( (juego.controles['ArrowLeft'].presionada || juego.controles['a'].presionada) && juego.personaje.posicion.x < 200)
				) {
					if ((juego.controles['ArrowRight'].presionada || juego.controles['d'].presionada)) {
						imagen.velocidad.x = -this.PLANOS[imagen.plano];
					}
					else
					if (juego.controles['ArrowLeft'].presionada || juego.controles['a'].presionada) {
						imagen.velocidad.x = this.PLANOS[imagen.plano];
					}else {
						imagen.velocidad.x = 0;
					}
				}else {
					imagen.velocidad.x = 0;
				}
			}
		}
	}

	actualizarSprite() {
		this.contadorCuadros++;
		// CAMBIAR FOTOGRAMA
		if (this.contadorCuadros % (this.contadorLimiteCuadros/juego.proporcionesFPS.proporcionLimiteCuadros) === 0) {
			for (const obj in this.imagenes) {
				this.alternarFrame(this.imagenes[obj]);
			}
		}

		// MOVIMIENTO PARALLAX
		for (const obj in this.imagenes) {
			this.moverFondo(this.imagenes[obj]);
		}

		this.dibujar();
	}
}
