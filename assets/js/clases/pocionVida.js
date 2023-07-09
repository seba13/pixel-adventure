class PocionVida extends Sprite {
	constructor({ posicion = { x: 0, y: 0 }, velocidad = { x: 0, y: 0 }, imagenes, offset }) {
		super({ posicion, velocidad, imagenes });

		this.offset = offset;
		this.movimiento = this.posicion.y;
		this.intervalo = 0;
		this.rango = 10;
		this.consumir = false;
		this.consumido = false;
		this.anchoColision = (this.imagenes.pocion.width - this.offset.x) * juego.proporciones.pocion;
		this.altoColision = (this.imagenes.pocion.height - this.offset.y) * juego.proporciones.pocion;
		this.liberar = false;
		this.contadorLimiteMovimiento = 4;
		this.contadorMovimiento = 0;
		this.contadorLimiteCuadros = 4;
		this.contadorCuadros = 0;
		this.opacidad = 1;
	}

	actualizarSprite() {
		if (this.opacidad > 0) {
			this.dibujar();
		}
		this.animarSprite();
	}

	dibujar() {
		ctx.save();
		ctx.globalAlpha = this.opacidad;

		ctx.drawImage(
			this.imagenes.pocion,
			0,
			0,
			this.imagenes.pocion.width,
			this.imagenes.pocion.height,
			this.posicion.x,
			this.movimiento,
			this.imagenes.pocion.width * juego.proporciones.pocion,
			this.imagenes.pocion.height * juego.proporciones.pocion,
		);

		ctx.restore();
	}

	animarSprite() {
		this.contadorMovimiento++;
		if (this.contadorMovimiento % Math.ceil(this.contadorLimiteMovimiento / juego.proporcionesFPS.proporcionLimiteCuadros) == 0) {
			this.movimiento = this.rango * Math.sin(this.intervalo * 0.04) + this.posicion.y;
			this.intervalo += 1;
		}

		if (this.consumir) {
			this.contadorCuadros++;
			if (this.contadorCuadros % Math.ceil(this.contadorLimiteCuadros / juego.proporcionesFPS.proporcionLimiteCuadros) == 0) {
				if (this.opacidad > 0) {
					this.opacidad -= 0.2;
				} else {
					this.liberar = true;
				}
			}
		}
	}
}
