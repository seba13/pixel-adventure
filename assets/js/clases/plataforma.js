class Plataforma extends Sprite {
	constructor({ posicion = { x: 0, y: 0 }, velocidad = { x: 0, y: 0 }, imagenes, width, offset }) {
		super({ posicion, velocidad, imagenes, offset });

		// OFFSET ignorar espacio transparente de imagenes
		this.width = width;
		this.height = 32;

		this.anchoPixel = 32;
		this.altoPixel = 32;
		this.enemigoCreado = false;
		this.enemigos = [];
		this.items = [];
		this.listaEnemigos = ['jabali', 'samurai', 'caballeroOscuro'];
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
				y: 0,
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
		if (this.tile.cascada.pintar) {
			this.dibujarCascada();

			if (this.contadorCuadros % (this.contadorLimiteCuadros / juego.proporcionesFPS.proporcionLimiteCuadros) == 0) {
				this.alternarFrame();
			}
		}
		this.dibujarEnemigosPlataforma();
		this.dibujarItemsPlataforma();
	}

	dibujarItemsPlataforma() {
		this.items = this.items.filter((item) => !item.liberar);

		this.items.forEach((item) => {
			if (item instanceof PocionVida) {
				item.actualizarSprite();
			}
		});
	}

	agregarEnemigos() {
		if (parseInt(juego.personaje.puntuacion) < 1000) {
			this.enemigos.push(this.crearEnemigoJabali());
		} else if (parseInt(juego.personaje.puntuacion) < 2000) {
			let numeroEnemigos = Math.random();

			if (numeroEnemigos < 0.2) {
				this.enemigos.push(this.crearEnemigoJabali());
				this.enemigos.push(this.crearEnemigoSamurai());
			} else {
				let enemigo = Math.round(Math.random() * this.listaEnemigos.length);

				if (enemigo == 0) {
					this.enemigos.push(this.crearEnemigoJabali());
				} else {
					this.enemigos.push(this.crearEnemigoSamurai());
				}
			}
		} else if (parseInt(juego.personaje.puntuacion) < 3000) {
			let numeroEnemigos = Math.random();

			if (numeroEnemigos < 0.1) {
				this.enemigos.push(this.crearEnemigoCaballeroOscuro());
				this.enemigos.push(this.crearEnemigoSamurai());
			} else if (numeroEnemigos < 0.2) {
				this.enemigos.push(this.crearEnemigoJabali());
				this.enemigos.push(this.crearEnemigoSamurai());
			} else {
				let enemigo = Math.round(Math.random() * this.listaEnemigos.length);

				if (enemigo == 0) {
					this.enemigos.push(this.crearEnemigoJabali());
				} else if (enemigo == 1) {
					this.enemigos.push(this.crearEnemigoSamurai());
				} else {
					this.enemigos.push(this.crearEnemigoCaballeroOscuro());
				}
			}
		} else {
			let numeroEnemigos = Math.random();

			if (numeroEnemigos < 0.1) {
				this.enemigos.push(this.crearEnemigoCaballeroOscuro());
				this.enemigos.push(this.crearEnemigoSamurai());
			} else if (numeroEnemigos < 0.2) {
				this.enemigos.push(this.crearEnemigoJabali());
				this.enemigos.push(this.crearEnemigoSamurai());
			}
			if (numeroEnemigos < 0.5) {
				let enemigo = Math.round(Math.random() * this.listaEnemigos.length);

				if (enemigo == 0) {
					this.enemigos.push(this.crearEnemigoJabali());
				} else if (enemigo == 1) {
					this.enemigos.push(this.crearEnemigoSamurai());
				} else {
					this.enemigos.push(this.crearEnemigoCaballeroOscuro());
				}
			} else {
				this.enemigos.push(this.crearEnemigoMinotauro());
			}
		}

		// this.enemigos.push(this.crearEnemigoMinotauro())
	}

	crearEnemigoMinotauro() {
		let drop = {
			pocion: false,
		};

		if (Math.random() < 0.2) {
			drop.pocion = true;
		}

		return new Minotauro({
			posicion: {
				x:
					this.posicion.x +
					this.offset.x +
					(this.width * 0.4 * Math.random() - juego.proporciones.enemigos.minotauro.alcanceVigilar * 2 - (juego.imagenesEnemigos.minotauro.width / 8) * juego.proporciones.enemigos.minotauro.proporcion) +
					juego.proporciones.enemigos.minotauro.alcanceVigilar * 3 +
					(juego.imagenesEnemigos.minotauro.width / 8) * juego.proporciones.enemigos.minotauro.proporcion,

				y: this.posicion.y - (juego.imagenesEnemigos.minotauro.height / 10) * juego.proporciones.enemigos.minotauro.proporcion,
			},
			velocidad: {
				x: 0,
				y: 0,
			},
			imagenes: {
				enemigo: juego.imagenesEnemigos.minotauro,
				muerte: juego.imagenesEnemigos.muerte,
			},
			offset: {
				x: 72 * juego.proporciones.enemigos.minotauro.proporcion,
				y: 54 * juego.proporciones.enemigos.minotauro.proporcion,
			},
			puntaje: 500,
			proporcion: 'minotauro',
			vida: 300,
			defensa: 10,
			armadura: 100,
			plataforma: this,
			drop,
		});
	}

	crearEnemigoCaballeroOscuro() {
		let drop = {
			pocion: false,
		};

		if (Math.random() < 0.2) {
			drop.pocion = true;
		}

		return new CaballeroOscuro({
			posicion: {
				x:
					this.posicion.x +
					this.offset.x +
					(this.width * 0.4 * Math.random() - juego.proporciones.enemigos.caballeroOscuro.alcanceVigilar * 2 - (juego.imagenesEnemigos.caballeroOscuro.width / 8) * juego.proporciones.enemigos.caballeroOscuro.proporcion) +
					juego.proporciones.enemigos.caballeroOscuro.alcanceVigilar * 3 +
					(juego.imagenesEnemigos.caballeroOscuro.width / 8) * juego.proporciones.enemigos.caballeroOscuro.proporcion,

				y: this.posicion.y - (juego.imagenesEnemigos.caballeroOscuro.height / 3) * juego.proporciones.enemigos.caballeroOscuro.proporcion,
			},
			velocidad: {
				x: 0,
				y: 0,
			},
			imagenes: {
				enemigo: juego.imagenesEnemigos.caballeroOscuro,
				muerte: juego.imagenesEnemigos.muerte,
			},
			offset: {
				x: 48 * juego.proporciones.enemigos.caballeroOscuro.proporcion,
				y: 20 * juego.proporciones.enemigos.caballeroOscuro.proporcion,
			},
			puntaje: 300,
			proporcion: 'caballeroOscuro',
			vida: 50,
			defensa: 10,
			armadura: 300,
			plataforma: this,
			drop,
		});
	}

	crearEnemigoSamurai() {
		let drop = {
			pocion: false,
		};

		if (Math.random() < 0.2) {
			drop.pocion = true;
		}

		return new Samurai({
			posicion: {
				x:
					this.posicion.x +
					this.offset.x +
					(this.width * 0.4 * Math.random() - juego.proporciones.enemigos.samurai.alcanceVigilar * 2 - (juego.imagenesEnemigos.samurai.width / 8) * juego.proporciones.enemigos.samurai.proporcion) +
					juego.proporciones.enemigos.samurai.alcanceVigilar * 3 +
					(juego.imagenesEnemigos.samurai.width / 8) * juego.proporciones.enemigos.samurai.proporcion,

				y: this.posicion.y - (juego.imagenesEnemigos.samurai.height / 3) * juego.proporciones.enemigos.samurai.proporcion,
			},
			velocidad: {
				x: 0,
				y: 0,
			},
			imagenes: {
				enemigo: juego.imagenesEnemigos.samurai,
				muerte: juego.imagenesEnemigos.muerte,
			},
			offset: {
				x: 48 * juego.proporciones.enemigos.samurai.proporcion,
				y: 20 * juego.proporciones.enemigos.samurai.proporcion,
			},
			puntaje: 200,
			proporcion: 'samurai',
			vida: 100,
			defensa: 5,
			armadura: 50,
			plataforma: this,
			drop,
		});
	}

	crearEnemigoJabali() {
		let drop = {
			pocion: false,
		};

		if (Math.random() < 0.2) {
			drop.pocion = true;
		}

		return new Jabali({
			posicion: {
				x:
					this.posicion.x +
					this.offset.x +
					(this.width * 0.4 * Math.random() - juego.proporciones.enemigos.jabali.alcanceVigilar * 2 - (juego.imagenesEnemigos.jabali.width / 8) * juego.proporciones.enemigos.jabali.proporcion) +
					juego.proporciones.enemigos.jabali.alcanceVigilar * 3 +
					(juego.imagenesEnemigos.jabali.width / 8) * juego.proporciones.enemigos.jabali.proporcion,

				y: this.posicion.y - (juego.imagenesEnemigos.jabali.height / 3) * juego.proporciones.enemigos.jabali.proporcion,
			},
			velocidad: {
				x: 0,
				y: 0,
			},
			imagenes: {
				enemigo: juego.imagenesEnemigos.jabali,
				muerte: juego.imagenesEnemigos.muerte,
			},
			offset: {
				x: 48 * juego.proporciones.enemigos.jabali.proporcion,
				y: 20 * juego.proporciones.enemigos.jabali.proporcion,
			},
			puntaje: 100,
			proporcion: 'jabali',
			vida: 50,
			defensa: 2,
			armadura: 20,
			plataforma: this,
			drop,
		});
	}

	dibujarEnemigosPlataforma() {
		this.enemigos = this.enemigos.filter((enemigo) => !enemigo.liberar);

		if (this.enemigos.length > 0) {
			this.enemigos.forEach((enemigo) => enemigo.actualizar());
		}
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
			[this.imagenes.tilesetSuelo.suelo_0_0, this.imagenes.tilesetSuelo.suelo_0_1, this.imagenes.tilesetSuelo.suelo_0_2, this.imagenes.tilesetSuelo.suelo_0_3, this.imagenes.tilesetSuelo.suelo_0_4],
			[this.imagenes.tilesetSuelo.suelo_1_0, this.imagenes.tilesetSuelo.suelo_1_1, this.imagenes.tilesetSuelo.suelo_1_2, this.imagenes.tilesetSuelo.suelo_1_3, this.imagenes.tilesetSuelo.suelo_1_4],
			[this.imagenes.tilesetSuelo.suelo_2_0, this.imagenes.tilesetSuelo.suelo_2_1, this.imagenes.tilesetSuelo.suelo_2_2, this.imagenes.tilesetSuelo.suelo_2_3, this.imagenes.tilesetSuelo.suelo_2_4],
			[this.imagenes.tilesetSuelo.suelo_3_0, this.imagenes.tilesetSuelo.suelo_3_1, this.imagenes.tilesetSuelo.suelo_3_2, this.imagenes.tilesetSuelo.suelo_3_3, this.imagenes.tilesetSuelo.suelo_3_4],
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
					this.posicion.x + this.anchoPixel * j * juego.proporciones.plataforma.suelo,
					this.posicion.y + this.anchoPixel * i * juego.proporciones.plataforma.suelo - this.offset.y * juego.proporciones.plataforma.suelo,
					this.anchoPixel * juego.proporciones.plataforma.suelo,
					this.altoPixel * juego.proporciones.plataforma.suelo,
				);
			}
		}

		let anchoPlataforma = mapa[0].reduce((acc, imgActual) => acc + imgActual.width * juego.proporciones.plataforma.suelo, 0);

		if (this.width < anchoPlataforma) {
			this.width = anchoPlataforma - this.offset.x - 16;
		}

		// ctx.fillStyle = 'rgba(0,0,255,.2)';

		// for (let j = 0; j < this.posicion.y / (this.altoPixel * juego.proporciones.plataforma.suelo); j++) {
		// 	ctx.fillRect(this.posicion.x + this.offset.x, this.posicion.y + this.altoPixel * juego.proporciones.plataforma.suelo * j,this.width - this.offset.x, this.altoPixel * juego.proporciones.plataforma.suelo);
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
			((juego.controles['ArrowRight'].presionada || juego.controles['d'].presionada) && juego.personaje.posicion.x > canvas.width * 0.6) ||
			((juego.controles['ArrowLeft'].presionada || juego.controles['a'].presionada) && juego.personaje.posicion.x < canvas.width * 0.4)
		) {
			juego.personaje.ataques.forEach((ataque) => {
				if (ataque.velocidad.x > 0) {
					if (juego.controles['ArrowRight'].presionada) {
						ataque.velocidad.x = juego.proporcionesFPS.proporcionMovimiento * 5 - juego.proporcionesFPS.proporcionMovimiento * 2;
					} else if (juego.controles['ArrowLeft'].presionada) {
						ataque.velocidad.x = juego.proporcionesFPS.proporcionMovimiento * 5 + juego.proporcionesFPS.proporcionMovimiento * 2;
					}
				} else {
					if (juego.controles['ArrowRight'].presionada) {
						ataque.velocidad.x = -(juego.proporcionesFPS.proporcionMovimiento * 5) - juego.proporcionesFPS.proporcionMovimiento * 2;
					} else if (juego.controles['ArrowRight'].presionada) {
						ataque.velocidad.x = -(juego.proporcionesFPS.proporcionMovimiento * 5) + juego.proporcionesFPS.proporcionMovimiento * 2;
					}
				}
			});

			juego.personaje.velocidad.x = 0;

			if (juego.controles['ArrowRight'].presionada || juego.controles['d'].presionada) {
				this.enemigos.forEach((enemigo) => {
					enemigo.posicion.x += -Math.round(juego.proporcionesFPS.proporcionMovimiento * 5);
					enemigo.posicionInicial += -Math.round(juego.proporcionesFPS.proporcionMovimiento * 5);
				});

				this.items.forEach((item) => {
					item.posicion.x += -Math.round(juego.proporcionesFPS.proporcionMovimiento * 5);
				});

				this.posicion.x += -Math.round(juego.proporcionesFPS.proporcionMovimiento * 5);
				this.tile.arbol.arbol_1.x -= Math.round(juego.proporcionesFPS.proporcionMovimiento * 5);
				this.tile.arbol.arbol_2.x -= Math.round(juego.proporcionesFPS.proporcionMovimiento * 5);
				this.tile.arbusto.arbusto_1.x -= Math.round(juego.proporcionesFPS.proporcionMovimiento * 5);
				this.tile.arbusto.arbusto_2.x -= Math.round(juego.proporcionesFPS.proporcionMovimiento * 5);
				this.tile.cascada.x -= Math.round(juego.proporcionesFPS.proporcionMovimiento * 5);
			}
			if (juego.controles['ArrowLeft'].presionada || juego.controles['a'].presionada) {
				this.enemigos.forEach((enemigo) => {
					enemigo.posicion.x += Math.round(juego.proporcionesFPS.proporcionMovimiento * 5);
					enemigo.posicionInicial += Math.round(juego.proporcionesFPS.proporcionMovimiento * 5);
				});

				this.items.forEach((item) => {
					item.posicion.x += Math.round(juego.proporcionesFPS.proporcionMovimiento * 5);
				});

				this.posicion.x += Math.round(juego.proporcionesFPS.proporcionMovimiento * 5);
				this.tile.arbol.arbol_1.x += Math.round(juego.proporcionesFPS.proporcionMovimiento * 5);
				this.tile.arbol.arbol_2.x += Math.round(juego.proporcionesFPS.proporcionMovimiento * 5);
				this.tile.arbusto.arbusto_1.x += Math.round(juego.proporcionesFPS.proporcionMovimiento * 5);
				this.tile.arbusto.arbusto_2.x += Math.round(juego.proporcionesFPS.proporcionMovimiento * 5);
				this.tile.cascada.x += Math.round(juego.proporcionesFPS.proporcionMovimiento * 5);
			}
		} else {
			juego.personaje.ataques.forEach((ataque) => {
				if (ataque.velocidad.x > 0) {
					ataque.velocidad.x = juego.proporcionesFPS.proporcionMovimiento * 5 + juego.proporcionesFPS.proporcionMovimiento * 2;
				} else {
					ataque.velocidad.x = -(juego.proporcionesFPS.proporcionMovimiento * 5) - juego.proporcionesFPS.proporcionMovimiento * 2;
				}
			});
		}
	}

	detectarColisionPersonaje() {
		// if (
		// 	juego.personaje.posicion.y + juego.personaje.height <= this.posicion.y &&
		// 	juego.personaje.posicion.y + juego.personaje.height + juego.personaje.velocidad.y >= this.posicion.y &&
		// 	juego.personaje.posicionXColision + juego.personaje.anchoColision>= this.posicion.x &&
		// 	juego.personaje.posicion.x <= this.posicion.x + this.width
		// ) {
		// 	juego.personaje.velocidad.y = 0;
		// }

		if (
			juego.personaje.posicion.y + juego.personaje.height <= this.posicion.y &&
			juego.personaje.posicion.y + juego.personaje.height + juego.personaje.velocidad.y >= this.posicion.y &&
			juego.personaje.posicion.x + juego.personaje.width - juego.personaje.offset.x >= this.posicion.x &&
			juego.personaje.posicion.x <= this.posicion.x + this.width - this.offset.x * juego.proporciones.plataforma.suelo
		) {
			juego.personaje.velocidad.y = 0;
			juego.personaje.saltando = false;
			juego.personaje.dobleSalto = false;
		}
	}

	detectarColisionEnemigo() {
		if (!juego.personaje.invulnerable) {
			this.enemigos.forEach((enemigo) => {
				if (
					juego.personaje.posicion.x + juego.personaje.offset.x / 2 + juego.personaje.anchoColision > enemigo.posicion.x + enemigo.offset.x / 2 &&
					juego.personaje.posicion.x + juego.personaje.offset.x / 2 < enemigo.posicion.x + enemigo.offset.x / 2 + enemigo.anchoColision &&
					juego.personaje.posicion.y + juego.personaje.height > enemigo.posicion.y + enemigo.offset.y &&
					juego.personaje.posicion.y < enemigo.posicion.y + enemigo.offset.y + enemigo.altoColision
				) {
					if (enemigo.vida > 0) {
						juego.personaje.recibirDaño(enemigo.dañoAtaque);
					}
				}
			});
		}
	}

	detectarColisionItem() {
		this.items.forEach((item) => {
			if (
				juego.personaje.posicion.x + juego.personaje.offset.x / 2 + juego.personaje.anchoColision > item.posicion.x + item.offset.x / 2 &&
				juego.personaje.posicion.x + juego.personaje.offset.x / 2 < item.posicion.x + item.offset.x / 2 + item.anchoColision &&
				juego.personaje.posicion.y + juego.personaje.height > item.posicion.y + item.offset.y &&
				juego.personaje.posicion.y < item.posicion.y + item.offset.y + item.altoColision
			) {
				if (item instanceof PocionVida) {
					if (juego.personaje.vida < 4) {
						item.consumir = true;
						if (!item.consumido) {
							item.consumido = true;
							juego.personaje.vida += 1;
						}
					}
				}
			}
		});
	}

	actualizarSprite() {
		this.detectarColisionPersonaje();
		this.detectarColisionEnemigo();
		this.detectarColisionItem();
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
