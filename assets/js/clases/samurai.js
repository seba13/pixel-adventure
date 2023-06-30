class Samurai extends Enemigo {
	constructor({ posicion = { x: 0, y: 0 }, velocidad = { x: 0, y: 0 }, imagenes, offset = { x: 0, y: 0 }, proporcion, vida, defensa, armadura, plataforma, puntaje }) {
		super({ posicion, velocidad, imagenes });
		
		this.puntaje = puntaje
		this.dañoAtaque = 1
		this.centrando = false
		this.liberar = false
        this.plataforma = plataforma;
        this.alcance = 100  //perimetro donde realiza guardia
        this.alcancePersecucion = 800  // perimetro de persecucion
        this.alcanceAtaque = 70   //distancia donde realiza y puede acertar un golpe
		this.rectangulocolisionAtaque = {
			ancho: this.alcanceAtaque + 10,
			alto: 20
		}
		this.tiempoRecarga = 200
		this.tiempoVolverAtacar = 200
		this.cuadroActual = 0;
		this.atacando = false
		this.muriendo = false
		this.contadorLimiteCuadros = 12;
		this.cicloAnimacion = 0;
		this.contadorCuadros = 0;
        this.vida = vida;
		this.defensa = defensa
		this.armadura = armadura
		this.totalArmadura = this.armadura
		this.totalVida = this.vida
		this.proporcion = proporcion;
        this.tiempo = 0;
        this.posicionInicial = this.posicion.x
        this.tiempoIzquierda = 4000
        this.tiempoInactivo = 2000
        this.tiempoCentrarIzquierda = 8000
        this.tiempoCentrarDerecha = 16000
        this.tiempoDerecha = 12000

        // MEDIDA QUE SE LE RESTA AL ANCHO/ALTO Y POSICION DE LA IMAGEN
        this.offset = offset;
        this.offset.x = offset.x;
        // this.offset.y = offset.y * juego.proporciones.enemigos[this.proporcion];

        // MEDIDA DE CADA FOTOGRAMA DENTRO DE LA IMAGEN 
		this.anchoSprite = this.imagenes.enemigo.width/8 ; //(ESTA IMAGEN TIENE 8 FOTOGRAMAS POR LO QUE SE DIVIDE EN 8)
		this.altoSprite = this.imagenes.enemigo.height / 3;


		this.anchoSpriteHumo = 64
		this.altoSpriteHumo = 64

		this.anchoHumoEscalado = this.anchoSpriteHumo * juego.proporciones.enemigos.humo
		this.altoHumoEscalado = this.altoSpriteHumo * juego.proporciones.enemigos.humo


        // MEDIDA DE ENEMIGO ESCALADO
		this.ancho = this.anchoSprite * juego.proporciones.enemigos[this.proporcion];
		this.alto = this.altoSprite * juego.proporciones.enemigos[this.proporcion];

        // ANCHO DE ENEMIGO RESTANDOLE EL OFFSET PARA OBTENER UNA COLISIÓN MAS PRECISA
        this.anchoColision = this.ancho - this.offset.x
		this.altoColision = this.alto - this.offset.y
       
		this.ultimaDireccion = 'derecha';
		this.estado = 'inactivo';
		this.mapa = {
			caminar: {
				x: 0,
				y: 0,
				frames: 8,
				contadorLimiteCuadros : 12
			},
			inactivo: {
				x: 0,
				y: 48,
				frames: 5,
				contadorLimiteCuadros: 12
			},
			daño: {
				x: 64 * 5,
				y: 48,
				frames: 3,
				contadorLimiteCuadros: 62
			},
			atacar: {
				x: 0,
				y: 48*2,
				frames: 8,
				contadorLimiteCuadros: 12
			},
			muerte: {
				x: 0,
				y: 64 * 8,
				frames: 11,
				contadorLimiteCuadros: 12
			},
		};

		this.mapaPuntaje = {
			opacidad : 1,
			tamañoFuente: 12,
			colorPuntaje: "#fb8500",
			contadorCuadros: 0,
			cuadroActual : 0,
			frames: 30, //ultimos 10 frames de opacidad
			contadorLimiteCuadros: 2
		}
	}
}
