

class Sprite {

    constructor({posicion = {x: 0, y: 0}, velocidad = {x: 0, y: 0}, imagenes, escalaSprite, offset}) {

        this.offset = offset;
        this.posicion = posicion;
        this.velocidad = velocidad;
        this.imagenes = imagenes;
        this.escalaSprite = escalaSprite;   

    }

}