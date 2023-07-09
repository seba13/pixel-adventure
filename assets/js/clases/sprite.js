class Sprite {
	constructor({ posicion = { x: 0, y: 0 }, velocidad = { x: 0, y: 0 }, imagenes, offset = { x: 0, y: 0 } }) {
		this.offset = offset;
		this.posicion = posicion;
		this.velocidad = velocidad;
		this.imagenes = imagenes;
	}

	dibujar() {}
}
