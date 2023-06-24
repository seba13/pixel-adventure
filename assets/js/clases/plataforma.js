class Plataforma extends Sprite {
	constructor({ posicion = { x: 0, y: 0 }, velocidad = { x: 0, y: 0 }, imagenes, escalaSprite = 1, width, offset }) {
		super({ posicion, velocidad, imagenes, escalaSprite, offset });

		// OFFSET ignorar espacio transparente de imagenes
		this.width = width;
		this.height = 32;

		this.anchoPixel = 32;
		this.altoPixel = 32;

		this.tile = {
			arbol: {
				arbol_1: {
					x: this.width, //propiedad se setea desde escenario
					pintar: false,
					offset: {
						x: 0,
						y: 0,
					},
				},
				arbol_2: {
					x: this.width,
					pintar: false,
					offset: {
						x: 0,
						y: 0,
					},
				},
			},
			arbusto: {
				arbusto_1: {
					x: this.width, //propiedad se setea desde escenario
					pintar: false,
					offset: {
						x: 0,
						y: 8,
					},
				},
				arbusto_2: {
					x: this.width, //propiedad se setea desde escenario
					pintar: false,
					offset: {
						x: 0,
						y: 8,
					},
				},
			},
			cascada: {
				x: this.width,
				pintar: false,
			},
		};

		this.cascada = {
			frameActual: this.imagenes.tilesetCascada.cascada_1,
			cascada_1: this.imagenes.tilesetCascada.cascada_1,
			cascada_2: this.imagenes.tilesetCascada.cascada_2,
			cascada_3: this.imagenes.tilesetCascada.cascada_3,
			cascada_4: this.imagenes.tilesetCascada.cascada_4,
			cascada_5: this.imagenes.tilesetCascada.cascada_5,
		};

		this.contadorLimiteCuadros = 36;
		this.contadorCuadros = 0;
	}

	dibujarElementosPlataforma() {
		this.contadorCuadros++;

		if (this.tile.arbol.arbol_1.pintar) {
			this.dibujarArbol1();
		}
		if (this.tile.arbol.arbol_2.pintar) {
			this.dibujarArbol2();
		}
		if (this.tile.arbusto.arbusto_1.pintar) {
			this.dibujarArbusto1();
		}
		if (this.tile.arbusto.arbusto_2.pintar) {
			this.dibujarArbusto2();
		}
		if (this.tile.cascada.pintar) {
			this.dibujarCascada();

			if (this.contadorCuadros % this.contadorLimiteCuadros == 0) {
				this.alternarFrame();
			}
		}
	}

	alternarFrame() {
		switch (this.cascada.frameActual) {
			case this.cascada.cascada_1:
				this.cascada.frameActual = this.cascada.cascada_2;
				break;
			case this.cascada.cascada_2:
				this.cascada.frameActual = this.cascada.cascada_3;
				break;
			case this.cascada.cascada_3:
				this.cascada.frameActual = this.cascada.cascada_4;
				break;
			case this.cascada.cascada_4:
				this.cascada.frameActual = this.cascada.cascada_5;
				break;
			case this.cascada.cascada_5:
				this.cascada.frameActual = this.cascada.cascada_1;
				break;
			default:
				break;
		}
	}

	dibujar() {
		// console.log(288 + this.imagenes.tileset.width/this.anchoPixel);

		// ctx.fillRect(this.posicion.x, this.posicion.y, this.width, this.height);

		// for (let j = 0; j < this.posicion.y / (this.altoPixel * this.escalaSprite); j++) {
		// 	ctx.fillRect(this.posicion.x, this.posicion.y + this.altoPixel * this.escalaSprite * j, this.width, this.height * this.escalaSprite);
		// }

		this.dibujarElementosPlataforma();
		this.dibujarPlataforma();
	}

	dibujarCascada() {
		ctx.drawImage(
			this.cascada.frameActual,
			0,
			0,
			this.cascada.frameActual.width,
			this.cascada.frameActual.height,
			this.tile.cascada.x,
			this.tile.cascada.y,
			this.cascada.frameActual.width * juego.proporciones.plataforma.cascada,
			this.cascada.frameActual.height * juego.proporciones.plataforma.cascada,
		);
	}

	dibujarArbol1() {
		ctx.drawImage(
			this.imagenes.tilesetArbol_1,
			0,
			0,
			this.imagenes.tilesetArbol_1.width,
			this.imagenes.tilesetArbol_1.height,
			this.tile.arbol.arbol_1.x,
			this.posicion.y - this.imagenes.tilesetArbol_1.height * juego.proporciones.plataforma.arbol_1,
			this.imagenes.tilesetArbol_1.width * juego.proporciones.plataforma.arbol_1,
			this.imagenes.tilesetArbol_1.height * juego.proporciones.plataforma.arbol_1,
		);
	}

	dibujarArbol2() {
		ctx.drawImage(
			this.imagenes.tilesetArbol_2,
			0,
			0,
			this.imagenes.tilesetArbol_2.width,
			this.imagenes.tilesetArbol_2.height,
			this.tile.arbol.arbol_2.x,
			this.posicion.y - this.imagenes.tilesetArbol_2.height * juego.proporciones.plataforma.arbol_2,
			this.imagenes.tilesetArbol_2.width * juego.proporciones.plataforma.arbol_2,
			this.imagenes.tilesetArbol_2.height * juego.proporciones.plataforma.arbol_2,
		);
	}

	dibujarArbusto1() {
		ctx.drawImage(
			this.imagenes.tilesetArbusto_1,
			0,
			0,
			this.imagenes.tilesetArbusto_1.width,
			this.imagenes.tilesetArbusto_1.height,
			this.tile.arbusto.arbusto_1.x,
			this.posicion.y - this.imagenes.tilesetArbusto_1.height * juego.proporciones.plataforma.arbusto_1 + this.tile.arbusto.arbusto_1.offset.y,
			this.imagenes.tilesetArbusto_1.width * juego.proporciones.plataforma.arbusto_1,
			this.imagenes.tilesetArbusto_1.height * juego.proporciones.plataforma.arbusto_1,
		);
	}

	dibujarArbusto2() {
		ctx.drawImage(
			this.imagenes.tilesetArbusto_2,
			0,
			0,
			this.imagenes.tilesetArbusto_2.width,
			this.imagenes.tilesetArbusto_2.height,
			this.tile.arbusto.arbusto_2.x,
			this.posicion.y - this.imagenes.tilesetArbusto_2.height * juego.proporciones.plataforma.arbusto_2 + this.tile.arbusto.arbusto_2.offset.y,
			this.imagenes.tilesetArbusto_2.width * juego.proporciones.plataforma.arbusto_2,
			this.imagenes.tilesetArbusto_2.height * juego.proporciones.plataforma.arbusto_2,
		);
	}

	dibujarPlataforma() {
		let columnas = Math.ceil(this.width / (this.anchoPixel * juego.proporciones.plataforma.suelo));

		let filas = Math.ceil((canvas.height - this.posicion.y) / (this.altoPixel * juego.proporciones.plataforma.suelo)) + 1;

		let mapa = [
			[
				this.imagenes.tilesetSuelo.suelo_0_0,
				this.imagenes.tilesetSuelo.suelo_0_1,
				this.imagenes.tilesetSuelo.suelo_0_2,
				this.imagenes.tilesetSuelo.suelo_0_3,
				this.imagenes.tilesetSuelo.suelo_0_4,
			],
			[
				this.imagenes.tilesetSuelo.suelo_1_0,
				this.imagenes.tilesetSuelo.suelo_1_1,
				this.imagenes.tilesetSuelo.suelo_1_2,
				this.imagenes.tilesetSuelo.suelo_1_3,
				this.imagenes.tilesetSuelo.suelo_1_4,
			],
			[
				this.imagenes.tilesetSuelo.suelo_2_0,
				this.imagenes.tilesetSuelo.suelo_2_1,
				this.imagenes.tilesetSuelo.suelo_2_2,
				this.imagenes.tilesetSuelo.suelo_2_3,
				this.imagenes.tilesetSuelo.suelo_2_4,
			],
			[
				this.imagenes.tilesetSuelo.suelo_3_0,
				this.imagenes.tilesetSuelo.suelo_3_1,
				this.imagenes.tilesetSuelo.suelo_3_2,
				this.imagenes.tilesetSuelo.suelo_3_3,
				this.imagenes.tilesetSuelo.suelo_3_4,
			],
		];

		let filasMapa = mapa.length;
		let columnasMapa = mapa[0].length;

		if (columnas > mapa[0].length) {
			let dif = Math.ceil((columnas - mapa[0].length) / 3);

			for (let i = 0; i < filasMapa; i++) {
				for (let k = 0; k < dif; k++) {
					mapa[i].splice(-1, 0, mapa[i][1]);
					mapa[i].splice(-1, 0, mapa[i][2]);
					mapa[i].splice(-1, 0, mapa[i][3]);
				}
			}

			columnasMapa = mapa[0].length;
		}

		if (filas > mapa.length) {
			let dif = filas - mapa.length;

			for (let k = 0; k < dif; k++) {
				mapa.splice(-1, 0, mapa[mapa.length - 2]);
			}

			filasMapa = mapa.length;
		}

		for (let i = 0; i < filasMapa; i++) {
			for (let j = 0; j < columnasMapa; j++) {
				// console.log(mapa[i][j]);

				ctx.drawImage(
					mapa[i][j],
					0,
					0,
					this.anchoPixel * 1,
					this.altoPixel,
					this.posicion.x + this.anchoPixel * j * juego.proporciones.plataforma.suelo - this.offset.x,
					this.posicion.y + this.anchoPixel * i * juego.proporciones.plataforma.suelo - this.offset.y * juego.proporciones.plataforma.suelo,
					this.anchoPixel * this.escalaSprite,
					this.altoPixel * this.escalaSprite,
				);
			}
		}

		let anchoPlataforma = mapa[0].reduce((acc, imgActual) => acc + imgActual.width * juego.proporciones.plataforma.suelo, 0);

		if (this.width < anchoPlataforma) {
			this.width = anchoPlataforma - this.offset.x - 16;
		}

		// ctx.fillStyle = 'rgba(255,0,0,.2)';

		// for (let j = 0; j < this.posicion.y / (this.altoPixel * this.escalaSprite); j++) {
		// 	ctx.fillRect(this.posicion.x, this.posicion.y + this.altoPixel * this.escalaSprite * j, this.width, this.height * this.escalaSprite);
		// }
	}

	moverPlataforma() {
		// if (juego.controles['ArrowRight'].presionada && juego.personaje.posicion.x + juego.personaje.width + 800 >= this.posicion.x) {
		// 	// this.velocidad.x = 2;
		// 	return 1;
		// } else if (juego.controles['ArrowLeft'].presionada && juego.personaje.posicion.x < 100) {
		// 	return 0;
		// } else if (juego.controles['ArrowLeft'].presionada && juego.personaje.posicion.x <= this.posicion.x + this.width + 800) {
		// 	// this.velocidad.x = -2;
		// 	return -1;
		// } else {
		// 	// this.velocidad.x = 0;
		// 	return 0;
		// }

		if (
			(juego.controles['ArrowRight'].presionada && juego.personaje.posicion.x > canvas.width * 0.5) ||
			(juego.controles['ArrowLeft'].presionada && juego.personaje.posicion.x < 200)
		) {
			juego.personaje.velocidad.x = 0;
			
			juego.personaje.ataques.forEach(ataque => {
				if(ataque.velocidad.x > 0) {
					ataque.velocidad.x = 2
				}else{
					ataque.velocidad.x = -2

				}
			})


			if (juego.controles['ArrowRight'].presionada) {
				this.posicion.x += -5;
				this.tile.arbol.arbol_1.x -= 5;
				this.tile.arbol.arbol_2.x -= 5;
				this.tile.arbusto.arbusto_1.x -= 5;
				this.tile.arbusto.arbusto_2.x -= 5;
				this.tile.cascada.x -= 5;
			}
			if (juego.controles['ArrowLeft'].presionada) {
				this.posicion.x += 5;
				this.tile.arbol.arbol_1.x += 5;
				this.tile.arbol.arbol_2.x += 5;
				this.tile.arbusto.arbusto_1.x += 5;
				this.tile.arbusto.arbusto_2.x += 5;
				this.tile.cascada.x += 5;
			}
		}else {
			juego.personaje.ataques.forEach(ataque => {
				if(ataque.velocidad.x > 0) {
					ataque.velocidad.x = 7
				}else{
					ataque.velocidad.x = -7

				}
			})
		}
	}

	detectarColisionPersonaje() {
		if (
			juego.personaje.posicion.y + juego.personaje.height <= this.posicion.y &&
			juego.personaje.posicion.y + juego.personaje.height + juego.personaje.velocidad.y >= this.posicion.y &&
			juego.personaje.posicion.x + juego.personaje.width - juego.personaje.offset.x * juego.proporciones.personaje >= this.posicion.x &&
			juego.personaje.posicion.x <= this.posicion.x + this.width
		) {
			juego.personaje.velocidad.y = 0;
		}
	}

	actualizarSprite() {
		this.detectarColisionPersonaje();

		this.dibujar();

		// this.posicion.x -= this.velocidad.x;

		// if (juego.controles['ArrowRight'].presionada && juego.personaje.posicion.x + juego.personaje.width >= this.posicion.x  > 0) {
		// 	this.velocidad.x = 2;
		// } else if (juego.controles['ArrowLeft'].presionada && juego.personaje.posicion.x <= this.posicion.x + this.width &&  juego.personaje.posicion.x) {
		// 	this.velocidad.x = -2;
		// } else {
		// 	this.velocidad.x = 0;
		// }
	}
}
