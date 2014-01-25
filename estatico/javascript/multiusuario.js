var socket = io.connect("http://localhost:5000");

Q.component("controlRemoto", {
	added : function() {
		//obtenemos las propiedades del sprite
		var p = this.entity.p;

		socket.on("movimiento_remoto", function(datos) {
			
			p.x = datos.x;
			p.y = datos.y;

		});
	}
});

Q.component("informarMovimiento", {
	added : function() {

		this.entity.on("step", this, "controles");
	},
	controles : function() {

		//obtenemos las propiedades del sprite
		var p = this.entity.p;

		socket.emit("informar_movimiento", {
			x : p.x,
			y : p.y
		});
	}
});

function iniciarJuego() {

	Q.stageScene("nivel1", {
		sort:true
	});
	//obtenemos a los sprites del pacman y el fantasma
	var pacman = Q("Pacman").first();
	var fantasma = Q("Fantasma").first();
	
	//segun lo que haya decidido ser el jugador
	//agregamos componentes
	if (TIPO_JUGADOR === "pacman") {
		pacman.add("controlLocal, informarMovimiento");
		fantasma.add("controlRemoto");
	} else {
		fantasma.add("controlLocal, informarMovimiento");
		pacman.add("controlRemoto");
	}
}

socket.on("juego_listo", iniciarJuego);












