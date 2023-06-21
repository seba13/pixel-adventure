class Escenario extends Sprite {
	constructor({ posicion, velocidad, imagenes, escalaSprite, plataformas }) {
		super({ posicion, velocidad, imagenes, escalaSprite });
		this.plataformas = plataformas;
	}

	nuevaPlataforma() {
		let ultimaPlataforma = this.plataformas[this.plataformas.length - 1];

		if (ultimaPlataforma && ultimaPlataforma.posicion.x < canvas.width) {
			let random = Math.round(Math.random());

			random = random == 1 ? 1 : -1;

			let posicionY = Math.floor(ultimaPlataforma.posicion.y) + (Math.floor(Math.random() * 200) + 1) * random;

			if (posicionY + 32 * ultimaPlataforma.escalaSprite * 4 + 80 > canvas.height) {
				posicionY = Math.floor(ultimaPlataforma.posicion.y) + (Math.floor(Math.random() * 200) - 80) * -1;
			} else if (posicionY < canvas.height*.6) {
				posicionY = Math.floor(ultimaPlataforma.posicion.y) + (Math.floor(Math.random() * 200) + 60);
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

			// plataforma.tile.arbol.arbol_1.x = Math.floor(Math.random() * (plataforma.posicion.x + plataforma.width + 1) + plataforma.posicion.x)

			let probabilidad = Math.random() 

			if(probabilidad <= .1 ) {
                plataforma.tile.arbol.arbol_1.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbol_1.width * plataforma.escalaSprite))) + plataforma.posicion.x;
			    plataforma.tile.arbol.arbol_1.pintar = true;


				plataforma.tile.arbol.arbol_2.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbol_2.width * plataforma.escalaSprite))) + plataforma.posicion.x;
			    plataforma.tile.arbol.arbol_2.pintar = true;

				plataforma.tile.arbusto.arbusto_1.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbusto_1.width * plataforma.escalaSprite))) + plataforma.posicion.x;
			    plataforma.tile.arbusto.arbusto_1.pintar = true;

				plataforma.tile.arbusto.arbusto_2.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbusto_2.width * plataforma.escalaSprite))) + plataforma.posicion.x;
			    plataforma.tile.arbusto.arbusto_2.pintar = true;


            }else
			if(probabilidad > .2 && probabilidad <.3) {
				plataforma.tile.arbol.arbol_1.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbol_1.width * plataforma.escalaSprite))) + plataforma.posicion.x;
			    plataforma.tile.arbol.arbol_1.pintar = true;


				plataforma.tile.arbol.arbol_2.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x)) + plataforma.posicion.x;
			    plataforma.tile.arbol.arbol_2.pintar = true;

				plataforma.tile.arbusto.arbusto_1.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbusto_1.width * plataforma.escalaSprite))) + plataforma.posicion.x;
			    plataforma.tile.arbusto.arbusto_1.pintar = true;
				
			}else
			if(probabilidad > .3  && probabilidad < .5) {
				plataforma.tile.arbol.arbol_1.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbol_1.width * plataforma.escalaSprite))) + plataforma.posicion.x;
			    plataforma.tile.arbol.arbol_1.pintar = true;


				plataforma.tile.arbusto.arbusto_1.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbusto_1.width * plataforma.escalaSprite))) + plataforma.posicion.x;
			    plataforma.tile.arbusto.arbusto_1.pintar = true;
				
			}else
			if(probabilidad < .7) {
				plataforma.tile.arbol.arbol_2.x = Math.round(Math.random() * (plataforma.posicion.x + plataforma.width - plataforma.posicion.x - (plataforma.imagenes.tilesetArbol_2.width * plataforma.escalaSprite))) + plataforma.posicion.x;
			    plataforma.tile.arbol.arbol_2.pintar = true;
			}
		
		
		}

		// if (this.plataformas[this.plataformas.length - 1].posicion.x < canvas.width) {
		// 	this.plataformas.push(
		// 		new Plataforma({
		//             posicion: {
		//                 x: this.plataformas[this.plataformas.length - 1].posicion.x ,
		//                 // y: Math.floor((canvas.height - 535) / 32) * 32
		//                 y: Math.floor(canvas.height - 300),
		//             },
		//             width: 384 * 4,
		//             imagenes: juego.tilesetEscenario,
		//             escalaSprite: 3,
		//             offset: {
		//                 x: 16,
		//                 y: 28,
		//             },
		//         })
		// 	);
		// }
	}

	pintarPrimerEscena() {
		let plataforma = this.plataformas[0];
		plataforma.tile.arbol.arbol_1.x = plataforma.posicion.x + plataforma.width * 0.2;

		plataforma.tile.arbol.arbol_2.x = plataforma.posicion.x + plataforma.width * 0.8;

		plataforma.tile.arbusto.arbusto_1.x = plataforma.posicion.x;

		plataforma.tile.arbusto.arbusto_2.x =
			plataforma.posicion.x + plataforma.width - plataforma.imagenes.tilesetArbusto_2.width * plataforma.escalaSprite;

		plataforma.tile.arbol.arbol_1.pintar = true;
		plataforma.tile.arbol.arbol_2.pintar = true;
		plataforma.tile.arbusto.arbusto_1.pintar = true;
		plataforma.tile.arbusto.arbusto_2.pintar = true;
	}

	actualizarSprite() {
		this.nuevaPlataforma();
		this.pintarPrimerEscena();
		this.plataformas.forEach((plataforma) => plataforma.moverPlataforma());
		this.plataformas.forEach((plataforma) => plataforma.actualizarSprite());
	}
}
