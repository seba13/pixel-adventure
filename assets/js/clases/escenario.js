class Escenario extends Sprite {
	constructor({ posicion, velocidad, imagenes, plataformas }) {
		super({ posicion, velocidad, imagenes });
		this.plataformas = plataformas;
	}

	generarNuevaPlataforma() {
		let ultimaPlataforma = this.plataformas[this.plataformas.length - 1];

		if (ultimaPlataforma && ultimaPlataforma.posicion.x < canvas.width) {
			let random = Math.round(Math.random());

			random = random == 1 ? 1 : -1;

			// let posicionY = Math.floor(ultimaPlataforma.posicion.y) + (Math.floor(Math.random() * 200) + 1) * random;


			let canvasHeight = canvas.height;

			

			let minY = ultimaPlataforma.imagenes.tilesetArbol_1.height * juego.proporciones.plataforma.arbol_1 + 50; 
			var maxY = canvasHeight * 0.9; // 70% del alto del canvas

			// Generar aleatoriamente la posición Y dentro de los límites
			let posicionY = Math.round(Math.random() * (maxY - minY) + minY);
			

			
			// if (posicionY <= canvas.height * 0.4 ) {
				
			// 	posicionY = Math.floor(Math.random() * canvas.height*.5) + 1 + ultimaPlataforma.imagenes.tilesetArbol_1.height * juego.proporciones.plataforma.arbol_1 + 50;
			// } else if (posicionY >= canvas.height * 0.8 || canvas.height - posicionY < canvas.height * 0.4) {
				
			// 	posicionY = Math.floor(Math.random() * (canvas.height - posicionY)) + 1 - (ultimaPlataforma.imagenes.tilesetArbol_1.height * juego.proporciones.plataforma.arbol_1) - 50;
			// }


			let distanciaPlataforma = Math.round(Math.random()* (canvas.width*.15 -250) + 250)

			if(distanciaPlataforma > 300) {
				distanciaPlataforma = 300
			}



			this.plataformas.push(
				new Plataforma({
					posicion: {
						x: ultimaPlataforma.posicion.x + ultimaPlataforma.width + distanciaPlataforma,
						// y: Math.floor((canvas.height - 535) / 32) * 32
						y: posicionY,
					},
					width: Math.floor(Math.random() * (1200 - 200 + 1)) + 200,
					imagenes: juego.tilesetEscenario,
					offset: {
						x: 16,
						y: 28,
					},
				}),
			);

			let plataforma = this.plataformas[this.plataformas.length - 1];

			this.generarElementosPlataforma(plataforma);

			if (Math.random() < 0.8) {
				this.generarEnemigoPlataforma(plataforma);
			}
		}
	}

	generarEnemigoPlataforma(plataforma) {
		if (!plataforma.enemigoCreado) {
			plataforma.crearEnemigo();
			plataforma.enemigoCreado = true;
		}
	}

	// Genera elementos aleatorios en una plataforma tales como
	// arboles, arbustos, cascada
	generarElementosPlataforma(plataforma) {
		let probabilidad = Math.random();

		if (probabilidad <= 0.1) {
			plataforma.tile.arbol.arbol_1.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - plataforma.imagenes.tilesetArbol_1.width * juego.proporciones.plataforma.arbol_1)) + plataforma.posicion.x;
			plataforma.tile.arbol.arbol_1.pintar = true;

			plataforma.tile.arbol.arbol_2.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - plataforma.imagenes.tilesetArbol_2.width * juego.proporciones.plataforma.arbol_2)) + plataforma.posicion.x;
			plataforma.tile.arbol.arbol_2.pintar = true;

			plataforma.tile.arbusto.arbusto_1.x =
				Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - plataforma.imagenes.tilesetArbusto_1.width * juego.proporciones.plataforma.arbusto_1)) + plataforma.posicion.x + plataforma.offset.x;
			plataforma.tile.arbusto.arbusto_1.pintar = true;

			plataforma.tile.arbusto.arbusto_2.x =
				Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - plataforma.imagenes.tilesetArbusto_2.width * juego.proporciones.plataforma.arbusto_2)) + plataforma.posicion.x + plataforma.offset.x;
			plataforma.tile.arbusto.arbusto_2.pintar = true;
		} else if (probabilidad > 0.2 && probabilidad < 0.3) {
			plataforma.tile.arbol.arbol_1.x =
				Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - plataforma.imagenes.tilesetArbol_1.width * juego.proporciones.plataforma.arbol_1)) + plataforma.posicion.x + plataforma.offset.x;
			plataforma.tile.arbol.arbol_1.pintar = true;

			plataforma.tile.arbol.arbol_2.x =
				Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - plataforma.imagenes.tilesetArbol_2.width * juego.proporciones.plataforma.arbol_2)) + plataforma.posicion.x + plataforma.offset.x;
			plataforma.tile.arbol.arbol_2.pintar = true;

			plataforma.tile.arbusto.arbusto_1.x =
				Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - plataforma.imagenes.tilesetArbusto_1.width * juego.proporciones.plataforma.arbusto_1)) + plataforma.posicion.x + plataforma.offset.x;
			plataforma.tile.arbusto.arbusto_1.pintar = true;
		} else if (probabilidad > 0.3 && probabilidad < 0.5) {
			plataforma.tile.arbol.arbol_1.x =
				Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - plataforma.imagenes.tilesetArbol_1.width * juego.proporciones.plataforma.arbol_1)) + plataforma.posicion.x + plataforma.offset.x;
			plataforma.tile.arbol.arbol_1.pintar = true;

			plataforma.tile.arbusto.arbusto_1.x =
				Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - plataforma.imagenes.tilesetArbusto_1.width * juego.proporciones.plataforma.arbusto_1)) + plataforma.posicion.x + plataforma.offset.x;
			plataforma.tile.arbusto.arbusto_1.pintar = true;
		} else if (probabilidad < 0.7) {
			plataforma.tile.arbol.arbol_2.x =
				Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - plataforma.imagenes.tilesetArbol_2.width * juego.proporciones.plataforma.arbol_2)) + plataforma.posicion.x + plataforma.offset.x;
			plataforma.tile.arbol.arbol_2.pintar = true;
		} else if (probabilidad > 0.8 && probabilidad < 0.9) {
			plataforma.tile.arbusto.arbusto_2.x =
				Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - plataforma.imagenes.tilesetArbusto_2.width * juego.proporciones.plataforma.arbusto_2)) + plataforma.posicion.x + plataforma.offset.x;
			plataforma.tile.arbusto.arbusto_2.pintar = true;

			plataforma.tile.cascada.x =
				Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - plataforma.imagenes.tilesetCascada.cascada_1.width * juego.proporciones.plataforma.cascada)) + plataforma.posicion.x + plataforma.offset.x;

			plataforma.tile.cascada.y = plataforma.posicion.y + 25;
			plataforma.tile.cascada.y = plataforma.posicion.y + 25 * juego.proporcionResolucion;

			plataforma.tile.cascada.pintar = true;
		}
	}

	// Esta escena no cambia
	pintarPrimerEscena() {
		let plataforma = this.plataformas[0];
		plataforma.tile.arbol.arbol_1.x = plataforma.posicion.x + plataforma.width * 0.2;

		plataforma.tile.arbol.arbol_2.x = plataforma.posicion.x + plataforma.width * 0.8;

		plataforma.tile.arbusto.arbusto_1.x = plataforma.posicion.x + plataforma.width * 0.05;

		plataforma.tile.arbusto.arbusto_2.x = plataforma.posicion.x + plataforma.width - plataforma.imagenes.tilesetArbusto_2.width * juego.proporciones.plataforma.arbusto_2;

		plataforma.tile.cascada.x = plataforma.posicion.x + plataforma.width * 0.09;

		plataforma.tile.cascada.y = plataforma.posicion.y + 25;
		plataforma.tile.cascada.y = plataforma.posicion.y + 25 * juego.proporcionResolucion;

		plataforma.tile.arbol.arbol_1.pintar = true;
		plataforma.tile.arbol.arbol_2.pintar = true;
		plataforma.tile.arbusto.arbusto_1.pintar = true;
		plataforma.tile.arbusto.arbusto_2.pintar = true;
		plataforma.tile.cascada.pintar = true;

		// if(!plataforma.enemigoCreado && juego.gameStart) {
		// 	plataforma.crearEnemigo()
		// 	plataforma.enemigoCreado = true
		// }
	}

	actualizarSprite() {
		this.generarNuevaPlataforma();
		this.pintarPrimerEscena();
		this.plataformas.forEach((plataforma) => plataforma.moverPlataforma());

		this.plataformas.forEach((plataforma) => {
			if (plataforma.posicion.x + plataforma.width > 0 && this.posicion.x < canvas.width) {
				plataforma.actualizarSprite();
			}
		});
	}
}
