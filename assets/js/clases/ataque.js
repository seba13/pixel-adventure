



class Ataque extends Sprite {

    constructor({ posicion = { x: 0, y: 0 }, velocidad = { x: 0, y: 0 }, imagenes, escalaSprite, offset = { x: 0, y: 0 } }){
        super({ posicion, velocidad, imagenes, escalaSprite });


        // this.posicion.y = 
        this.mapaAtaque = {

            bolaFuego: {
                ataque: {
                    x: 0,
                    y: 0,
                    frames: 4,
                    contadorLimiteCuadros: 24
                },
                impacto: {
                    x: 48 * 5,
                    y: 0,
                    frames: 6,
                    contadorLimiteCuadros: 12
                },
                framesTotales: 11,
                estadoAtaque : 'ataque'
            },
            cuadroActual: 0,
            contadorCuados:0,
            contadorLimiteCuadros: 48
        }
        this.alcanceAtaque = {
            bolaFuego: {
                x: this.posicion.x,
                alcance: 600
            }
        }
        this.mapaAtaque.bolaFuego.width = this.imagenes.bolaFuego.width / this.mapaAtaque.bolaFuego.framesTotales
        this.liberar = false


    }


    dibujarAtaque() {
        ctx.drawImage(
            this.imagenes.bolaFuego,
            this.mapaAtaque.bolaFuego[this.mapaAtaque.bolaFuego.estadoAtaque].x + this.mapaAtaque.bolaFuego.width * this.mapaAtaque.cuadroActual,
            this.mapaAtaque.bolaFuego[this.mapaAtaque.bolaFuego.estadoAtaque].y,
            this.mapaAtaque.bolaFuego.width,
            this.imagenes.bolaFuego.height,
            this.posicion.x + this.velocidad.x,
            this.posicion.y,
            this.mapaAtaque.bolaFuego.width * juego.proporciones.bolaFuego,
            this.imagenes.bolaFuego.height * juego.proporciones.bolaFuego
        )
    }

    animarAtaque() {

        this.mapaAtaque.contadorCuados++

        if(this.mapaAtaque.contadorCuados % this.mapaAtaque.bolaFuego[this.mapaAtaque.bolaFuego.estadoAtaque].contadorLimiteCuadros == 0){
            if(this.mapaAtaque.cuadroActual < this.mapaAtaque.bolaFuego[this.mapaAtaque.bolaFuego.estadoAtaque].frames -1) {
                this.mapaAtaque.cuadroActual++
            }
            // else 
            // {
            //     this.mapaAtaque.cuadroActual = 0
            //     if(this.mapaAtaque.bolaFuego.estadoAtaque = 'impacto') {
            //         this.liberar = true
            //     }
            // }
        }


    }


   

    actualizarAtaque() {

        this.posicion.x += this.velocidad.x
        
        

        if(juego.personaje.ultimaDireccion === 'derecha'){
            if(this.posicion.x > this.alcanceAtaque.bolaFuego.x + this.alcanceAtaque.bolaFuego.alcance) {
                // this.velocidad.x = 0
                // this.mapaAtaque.bolaFuego.estadoAtaque = 'impacto'
            }
        }else 
        if(juego.personaje.ultimaDireccion === 'izquierda') {
            if(this.posicion.x < this.alcanceAtaque.bolaFuego.x - this.alcanceAtaque.bolaFuego.alcance) {
                // this.velocidad.x = 0
                // this.mapaAtaque.bolaFuego.estadoAtaque = 'impacto'
            }
        }
       

        this.dibujarAtaque()
        this.animarAtaque()

    }
}