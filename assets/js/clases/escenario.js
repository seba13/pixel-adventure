class Escenario extends Sprite {
	constructor({ posicion, velocidad, imagenes, escalaSprite, plataformas }) {
		super({ posicion, velocidad, imagenes, escalaSprite });
		this.plataformas = plataformas;
	}

	generarNuevaPlataforma() {
		let ultimaPlataforma = this.plataformas[this.plataformas.length - 1];

		if (ultimaPlataforma && ultimaPlataforma.posicion.x < canvas.width) {
			let random = Math.round(Math.random());

			random = random == 1 ? 1 : -1;

			console.log("caso 0");
			let posicionY = Math.floor(ultimaPlataforma.posicion.y) + (Math.floor(Math.random() * 200) + 1) * random;

			if(posicionY  <=  canvas.height*.4) {
				console.log("caso 1");
				posicionY =   (Math.floor(Math.random() * 300) + 1) + (ultimaPlataforma.imagenes.tilesetArbol_1.height * juego.proporciones.plataforma.arbol_1) + 50
			}
			else
			if(posicionY >= canvas.height*.8) {
				console.log("caso 2");
				posicionY = (Math.floor(Math.random() * 300) + 1) + (ultimaPlataforma.imagenes.tilesetArbol_1.height * juego.proporciones.plataforma.arbol_1) + 50
			}

			this.plataformas.push(
				new Plataforma({
					posicion: {
						x: ultimaPlataforma.posicion.x + ultimaPlataforma.width + 300,
						// y: Math.floor((canvas.height - 535) / 32) * 32
						y: posicionY,
					},
					width: Math.floor(Math.random() * (1200 - 200 + 1)) + 200,
					imagenes: juego.tilesetEscenario,
					escalaSprite: 3,
					offset: {
						x: 16,
						y: 28,
					},
				}),
			);

			let plataforma = this.plataformas[this.plataformas.length - 1];

			this.generarElementosPlataforma(plataforma)
			
		}
	}

	// Genera elementos aleatorios en una plataforma tales como
	// arboles, arbustos, cascada
	generarElementosPlataforma(plataforma) {

		let probabilidad = Math.random() 

		if(probabilidad <= .1 ) {
			plataforma.tile.arbol.arbol_1.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbol_1.width * juego.proporciones.plataforma.arbol_1))) + plataforma.posicion.x;
			plataforma.tile.arbol.arbol_1.pintar = true;


			plataforma.tile.arbol.arbol_2.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbol_2.width * juego.proporciones.plataforma.arbol_2))) + plataforma.posicion.x;
			plataforma.tile.arbol.arbol_2.pintar = true;

			plataforma.tile.arbusto.arbusto_1.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbusto_1.width * juego.proporciones.plataforma.arbusto_1))) + plataforma.posicion.x;
			plataforma.tile.arbusto.arbusto_1.pintar = true;

			plataforma.tile.arbusto.arbusto_2.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbusto_2.width * juego.proporciones.plataforma.arbusto_2))) + plataforma.posicion.x;
			plataforma.tile.arbusto.arbusto_2.pintar = true;


		}else
		if(probabilidad > .2 && probabilidad <.3) {
			plataforma.tile.arbol.arbol_1.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbol_1.width * juego.proporciones.plataforma.arbol_1))) + plataforma.posicion.x;
			plataforma.tile.arbol.arbol_1.pintar = true;


			plataforma.tile.arbol.arbol_2.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbol_2.width * juego.proporciones.plataforma.arbol_2))) + plataforma.posicion.x;
			plataforma.tile.arbol.arbol_2.pintar = true;

			plataforma.tile.arbusto.arbusto_1.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbusto_1.width * juego.proporciones.plataforma.arbusto_1))) + plataforma.posicion.x;
			plataforma.tile.arbusto.arbusto_1.pintar = true;
			
		}else
		if(probabilidad > .3  && probabilidad < .5) {
			plataforma.tile.arbol.arbol_1.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbol_1.width * juego.proporciones.plataforma.arbol_1))) + plataforma.posicion.x;
			plataforma.tile.arbol.arbol_1.pintar = true;


			plataforma.tile.arbusto.arbusto_1.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbusto_1.width * juego.proporciones.plataforma.arbusto_1))) + plataforma.posicion.x;
			plataforma.tile.arbusto.arbusto_1.pintar = true;
			
		}else
		if(probabilidad < .7) {
			plataforma.tile.arbol.arbol_2.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbol_2.width * juego.proporciones.plataforma.arbol_2))) + plataforma.posicion.x;
			plataforma.tile.arbol.arbol_2.pintar = true;
		}else
		if(probabilidad > .8 && probabilidad <.9) {

			plataforma.tile.arbusto.arbusto_2.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbusto_1.width * juego.proporciones.plataforma.arbusto_2))) + plataforma.posicion.x;
			plataforma.tile.arbusto.arbusto_2.pintar = true;

			plataforma.tile.cascada.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetCascada.cascada_1.width * juego.proporciones.plataforma.cascada))) + plataforma.posicion.x;
			
			plataforma.tile.cascada.y = plataforma.posicion.y 
			plataforma.tile.cascada.pintar = true;
		}

	}


	// Esta escena no cambia
	pintarPrimerEscena() {
		let plataforma = this.plataformas[0];
		plataforma.tile.arbol.arbol_1.x = plataforma.posicion.x + plataforma.width * 0.2;

		plataforma.tile.arbol.arbol_2.x = plataforma.posicion.x + plataforma.width * 0.8;

		plataforma.tile.arbusto.arbusto_1.x = plataforma.posicion.x;

		plataforma.tile.arbusto.arbusto_2.x =
			plataforma.posicion.x + plataforma.width - plataforma.imagenes.tilesetArbusto_2.width * juego.proporciones.plataforma.arbusto_2;

		plataforma.tile.cascada.x = plataforma.posicion.x + plataforma.width * .09
		plataforma.tile.cascada.y = plataforma.posicion.y 


		plataforma.tile.arbol.arbol_1.pintar = true;
		plataforma.tile.arbol.arbol_2.pintar = true;
		plataforma.tile.arbusto.arbusto_1.pintar = true;
		plataforma.tile.arbusto.arbusto_2.pintar = true;
		plataforma.tile.cascada.pintar = true
	}

	actualizarSprite() {
		this.generarNuevaPlataforma();
		this.pintarPrimerEscena();
		this.plataformas.forEach((plataforma) => plataforma.moverPlataforma());
		this.plataformas.forEach((plataforma) => plataforma.actualizarSprite());
	}
}
