//funcion global auxiliar que sirve para inicar el juego de pacman
function iniciarJuego() {

	//si los recursos (imagenes y mapas) estan listos
	if (RECURSOS_LISTOS) {		

		//pintamos la escena 1 (el pacman, fantasmas y mapa)
		Q.stageScene("nivel1", {
			sort : true
		});

		//una vez pintada la escena 1
		//podemos acceder a los Sprites que pintamos con
		//el objeto Q y le pasamos el nombre de una clase
		var pacman = Q("Pacman").first();
		var fantasma = Q("Fantasma").first();

		//una vez que tenemos al pacman y al fantasma
		//agregamos los componentes que requieren:
		//controles para manejar al pacman
		pacman.add("controlLocal");
		//inteligencia para que el fantasma busque al pacman
		fantasma.add("aiEnemigo");

	} else {//si los recursos no han terminado de descargarse
		
		//calendarizamos la ejecucion de la funcion iniciarJuego
		//dentro de 500 milisegundos = 1/2 segundo
		setTimeout(iniciarJuego,500);
	}

};

//invocamos la funcion
iniciarJuego();
