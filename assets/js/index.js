const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const juego = new Juego();

(async () => {
	let cargado = await juego.cargarAssets();

	if (cargado) {
		juego.iniciar();
	}
})();
