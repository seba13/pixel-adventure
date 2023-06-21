class Jugador extends Sprite {
	constructor({ posicion = { x: 0, y: 0 }, velocidad = { x: 0, y: 0 }, imagenes, escalaSprite, offset = {x:0, y:0} }) {
		super({ posicion, velocidad, imagenes, escalaSprite });

        
		this.offset = offset;
		this.width = 32 * this.escalaSprite - (this.offset.x*this.escalaSprite);
		this.height = 32 * this.escalaSprite;
		this.estado = 'inactivo'
		this.ultimaDireccion = 'derecha'
		this.cuadroActual = 0;
		this.cicloAnimacion = 0 //cuenta cuando se ha completado un ciclo de animacion
		this.contadorCuadros = 0;
		//numero de frames
		this.mapa = {
			inactivo: {
				x:0,
				y:0,
				frames: 2,
			},
			parpadear: {
				x: 0,
				y: 32,
				frames: 2
			},
			caminando: {
				x: 0,
				y: 64,
				frames: 4,
			},
			corriendo: {
				x: 0,
				y: 96,
				frames: 8,
			},
			saltando: {
				x:0,
				y: 160,
				frames: 4
			},
			caida: {
				x: 128,
				y: 160,
				frames: 4
			}
		}

		// definir cada cuantas iteraciones se cambia el fotograma
		this.mapa.inactivo.contadorLimiteCuadros = 90 / this.mapa.inactivo.frames
		this.mapa.parpadear.contadorLimiteCuadros = 60 / this.mapa.parpadear.frames
		this.mapa.caminando.contadorLimiteCuadros = 60 / this.mapa.caminando.frames
		this.mapa.corriendo.contadorLimiteCuadros = 15 / this.mapa.corriendo.frames
		this.mapa.saltando.contadorLimiteCuadros = 60 / this.mapa.saltando.frames
		this.mapa.saltando.caida = 60 / this.mapa.caida.frames

	
	}

	dibujar() {
		

		let flip = 0
		if(this.ultimaDireccion === 'izquierda') {
			ctx.save()
			ctx.scale(-1, 1);
			flip = -1
		}else{
			ctx.save()
			ctx.scale(1, 1);
			flip = 1
		}

		ctx.drawImage(
			this.imagenes.tileset,
			this.mapa[this.estado].x + (32 * this.cuadroActual),
			this.mapa[this.estado].y,
			32,
			32,
			(this.posicion.x - this.offset.x*this.escalaSprite) * flip ,
			this.posicion.y,
			32 * this.escalaSprite * flip,
			32 * this.escalaSprite
		)
		
		ctx.restore();

		// ctx.fillStyle = 'rgba(255,0,0,.2)';
		// ctx.fillRect(this.posicion.x - (this.offset.x * this.escalaSprite)/2, this.posicion.y, this.width, this.height);

	}

	animarSprite() {

		this.contadorCuadros ++
		if(this.contadorCuadros % this.mapa[this.estado].contadorLimiteCuadros == 0) {
			if(this.cuadroActual < this.mapa[this.estado].frames - 1) {
				this.cuadroActual++
			}else {
				this.cuadroActual = 0
				this.cicloAnimacion++ // propiedad para cambiar animacion de estado inactivo a parpadear (function cambiarEstado())
			}
		}



	}


	detectarColisionPlataforma() {
		
        juego.fondo.escenario.plataformas.forEach(plataforma => {
            if (this.posicion.y + this.height <= plataforma.posicion.y && this.posicion.y + this.height + this.velocidad.y >= plataforma.posicion.y && this.posicion.x + this.width >= plataforma.posicion.x && this.posicion.x <= plataforma.posicion.x + plataforma.width) {
                this.velocidad.y = 0;
            }
        })

	}








	// cambia la velocidad para mover el personaje e indica la direccion (derecha o izquierda)
	cambiarVelocidad() {
		// personaje moviendose a la derecha
		if (juego.controles['ArrowRight'].presionada) {
			this.ultimaDireccion = 'derecha'
			this.velocidad.x = 5;
		}
		// personaje moviendo a la izquierda 
		else 
		if (juego.controles['ArrowLeft'].presionada) {
			this.ultimaDireccion = 'izquierda'
			this.velocidad.x = -5;
		} 
		// movimiento en el eje Y se ve desde la clase juego
		// debido a que es donde se activa el evento keydown

		// personaje estático
		else {
			this.velocidad.x = 0;
		}
	}


	// Cambia el estado que referencia al sprite de animacion
	cambiarEstado() {

		if (juego.controles['ArrowRight'].presionada || juego.controles['ArrowLeft'].presionada) {

			if(juego.controles["ArrowRight"].presionada) {
				this.ultimaDireccion = 'derecha'
			}else 
			if(juego.controles['ArrowLeft'].presionada)
			{
				this.ultimaDireccion = 'izquierda'
			}

			if(this.velocidad.y < 0){
				if(this.estado != 'saltando') {
					this.estado = 'saltando'
					this.cuadroActual = 0
				}
			}else
			// cuando se está presionando el boton saltar y está cayendo por la gravedad
			if(this.velocidad.y > juego.gravedad) {
				if(this.estado != 'caida') {
					this.estado = 'caida'
					this.cuadroActual = 0
				}
			}else{
				if(this.estado != 'corriendo') {
					this.estado = 'corriendo'
					this.cuadroActual = 0
				}
			}


			// siempre comenzara por la animacion inactiva
			this.cicloAnimacion = 0
		}
		else 
		if(juego.controles['ArrowUp'].presionada){
			// cuando se está presionando el boton saltar y se está elevenado
			if(this.velocidad.y < 0){
				if(this.estado != 'saltando') {
					this.estado = 'saltando'
					this.cuadroActual = 0
				}
			}else
			// cuando se está presionando el boton saltar y está cayendo por la gravedad
			if(this.velocidad.y > juego.gravedad) {
				if(this.estado != 'caida') {
					this.estado = 'caida'
					this.cuadroActual = 0
				}
			}
			// cuando se está presionando el boton saltar pero ya caido al suelo
			else{
				if(this.estado != 'inactivo') {
					this.estado = 'inactivo'
					this.cuadroActual = 0
				}
				
			}
			

			// siempre comenzara por la animacion inactiva
			this.cicloAnimacion = 0
		}
		// cuando se deja de pulsar cualquier boton
		else {
			// cuanto está cayendo por gravedad
			if(this.velocidad.y > juego.gravedad) {
				if(this.estado != 'caida') {
					this.estado = 'caida'
					this.cuadroActual = 0
				}
			}
			// cuando ya ha caido al suelo o no se ha realizado alguna acción
			else
			if(this.estado != 'inactivo') {
				if(this.cicloAnimacion < 2) {
					this.estado = 'inactivo'
					this.cuadroActual = 0
				}else {

					// si cicloAnimacion > 2 cambiar a la animacion inactiva
					if(this.cicloAnimacion > 2) {
						this.cicloAnimacion = 0
					}
				}
				// this.cicloAnimacion = 0
			}else {

				// si cicloAnimacion es 2 cambiar a la animacion pestañear
				if(this.cicloAnimacion == 2 ) {

					if(this.estado != 'parpadear') {
						this.estado = 'parpadear'
						this.cuadroActual = 0
					}
				}
			}
		}
	}

	


	actualizarSprite() {
		this.dibujar();

		this.animarSprite();

		this.posicion.y += this.velocidad.y;
		this.posicion.x += this.velocidad.x;

		if (this.posicion.y + this.velocidad.y < canvas.height - this.height) {
			this.velocidad.y += juego.gravedad;
		} else {
			this.velocidad.y = 0;
		}


		// cambia la velocidad para mover el personaje e indica la direccion (derecha o izquierda)
		this.cambiarVelocidad()

		// Cambia el estado que referencia al sprite de animacion
		this.cambiarEstado()


	}
}
