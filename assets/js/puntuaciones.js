async function cargarPuntuaciones() {
	try {
		let res = await fetch('/scores');
		let json = (await res.json()).puntuaciones;
		let fragment = document.createDocumentFragment();
		let arrayPuntuaciones = Object.values(json);

		while (listaPuntuaciones.firstChild) {
			listaPuntuaciones.removeChild(listaPuntuaciones.firstChild);
		}

		arrayPuntuaciones.sort((a, b) => b.puntuacion - a.puntuacion);

		for (index in arrayPuntuaciones) {
			let liJugador = document.createElement('li');
			liJugador.classList.add('item__lista__puntuaciones');

			let numeroJugador = document.createElement('p');
			numeroJugador.textContent = `#${arrayPuntuaciones[index].id}`;

			let fechaJugador = document.createElement('p');
			const fecha = new Date(arrayPuntuaciones[index].fecha);

			const anio = fecha.getFullYear();
			const mes = fecha.getMonth() < 10 ? '0' + (+fecha.getMonth() + 1) : +fecha.getMonth() + 1;
			const dia = fecha.getDay() < 10 ? '0' + fecha.getDay() : fecha.getDay();

			const horas = fecha.getHours() < 10 ? '0' + fecha.getHours() : fecha.getHours();
			const minutos = fecha.getMinutes() < 10 ? '0' + fecha.getMinutes() : fecha.getMinutes();
			const segundos = fecha.getSeconds() < 10 ? '0' + fecha.getSeconds() : fecha.getSeconds();

			fechaJugador.textContent = `${anio}/${mes}/${dia} ${horas}:${minutos}:${segundos}`;

			let nombreJugador = document.createElement('p');
			nombreJugador.textContent = arrayPuntuaciones[index].nombre;

			let puntuacionJugador = document.createElement('p');
			puntuacionJugador.textContent = arrayPuntuaciones[index].puntuacion;

			await liJugador.append(numeroJugador);
			await liJugador.append(nombreJugador);
			await liJugador.append(fechaJugador);
			await liJugador.append(puntuacionJugador);

			await fragment.append(liJugador);
		}
		await listaPuntuaciones.append(fragment);

		return true;
	} catch (err) {
		return err;
	}
}

async function guardarPuntuacion(datosJugador) {
	const datos = {
		nombre: datosJugador.nombre,
		puntuacion: datosJugador.puntuacion,
		fecha: new Date(),
	};

	const res = await fetch('/new-score', {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(datos),
		method: 'PUT',
	});

	json = await res.json();

	if (json.success) {
		return true;
	}
	return false;
}
