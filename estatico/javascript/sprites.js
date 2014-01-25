Q.animations("mosaicos_anim", {
	brillar : {
		frames : [27, 28],
		rate : 1 / 2
	},
	pacman : {
		frames : [70, 71],
		rate : 1 / 3
	}
});

//------------- PARA UI -----------//
Q.Sprite.extend("Punto", {
	init : function(p) {

		this._super(p, {
			sheet : "mosaicos",
			sensor : true,
			type : PUNTO
		});

		this.on("sensor", function() {
			Q.state.inc("puntaje", 1);
			/*var puntos = Q.state.get("puntaje");
			Q.state.set("puntaje",puntos + 1);*/
			this.destroy();
		});
	}
});

Q.Sprite.extend("Alimento", {
	init : function(p) {
		this._super(p, {
			sheet : "mosaicos",
			sensor : true,
			type : ALIMENTO
		});

		this.on("sensor", function() {
			this.destroy();
		});
	}
});

//SOLUCIONES EJERCICIO
Q.Sprite.extend("Poder", {
	init : function(p) {
		this._super(p, {
			sheet : "mosaicos",
			sprite : "mosaicos_anim",
			type : PODER,
			sensor : true
		});

		this.on("sensor", function() {
			this.destroy();
		});

		this.add("animation");
		this.play("brillar");
	}
});

Q.Sprite.extend("Fantasma", {
	init : function(p) {
		this._super(p, {
			sheet : "mosaicos",
			type : ENEMIGO,
			z : 10,
			collisionMask : PACMAN | MAPA
		});

		this.add("2d");
	}
});

Q.Sprite.extend("Pacman", {
	init : function(p) {

		this._super(p, {
			sheet : "mosaicos",
			sprite : "mosaicos_anim",
			tileW : 18,
			tileH : 18,
			type : PACMAN,
			z : 20,
			velocidad : 100, //le pasamos directamente la velocidad
			collisionMask : ENEMIGO | ALIMENTO | PUNTO | PODER | MAPA
		});

		this.add("2d, animation");
		this.play("pacman");

		this.on("hit", function(colision) {

			//si es un fantasma
			//mostramos la pantalla de perdiste
			if (colision.obj.isA("Fantasma")) {

				//Q.clearStages();
				Q.stage(0).pause();
				Q.stageScene("perdiste",1,{
					sort : true
				});
				//Q.stage(0).pause();
			}

		});
	}
});

Q.TileLayer.extend("Mapa", {
	init : function(p) {

		this._super({
			dataAsset : "mapa.tmx",
			sheet : "mosaicos",
			tileW : 20,
			tileH : 20,
			type : MAPA
		});

	},
	configurar : function() {
		//obtenemos la matriz de mosaicos
		var matrizMosaicos = this.p.tiles;
		//iteramos sobre todos los renglones
		for (var renglon = 0; renglon < matrizMosaicos.length; renglon++) {

			//obtenemos un renglon en cada iteracion
			var renglonMosaicos = matrizMosaicos[renglon];
			//por cada renglon, iteramos todas sus columnas
			for (var columna = 0; columna < renglonMosaicos.length; columna++) {
				//obtenemos el numero del mosaico
				var numeroMosaico = renglonMosaicos[columna];

				//calculamos la posicion de este mosaico
				var posX = columna * 20 + 10;
				var posY = renglon * 20 + 10;
				var nombreClase = null;
				//si el mosaico esta vacio, insertamos un punto

				switch(numeroMosaico) {
					//ALIMENTOS
					case 90:
					case 91:
					case 92:
					case 93:

						nombreClase = "Alimento";
						break;
					case -1:
						nombreClase = "Punto";
						numeroMosaico = 29;
						break;
					case 70:
						nombreClase = "Pacman";
						break;
					//SOLUCIONES EJERCICIOS
					case 27:
						nombreClase = "Poder";
						break;
					//FANTASMAS
					//rojo
					case 30:
					//rosa
					case 40:
					//verde
					case 50:
					//naranja
					case 60:
						nombreClase = "Fantasma";
						break;
				}

				if (nombreClase != null) {

					//remplazamos el mosaico por un sprite
					var personaje = this.stage.insert(new Q[nombreClase]({
						x : posX,
						y : posY,
						sheet : "mosaicos",
						frame : numeroMosaico
					}));

					//de la matriz de colisiones borramos el mosaico original
					renglonMosaicos[columna] = -1;
				}
			}
		}
	}
});

Q.UI.Text.extend("EtiquetaPuntos",{
	init : function(p){
		this._super(p,{
			label : "0", //MUY IMPORTANTE PONER ENTRE COMILLAS
			color: "white"
		});
		
		Q.state.on("change.puntaje", this, "actualizaPuntaje");
	},
	
	actualizaPuntaje : function(puntaje){
		this.p.label = "" + puntaje; //AGREGAR COMILLAS MUY IMPORTANTE :s
	}
});

//ETIQUETA DE PUNTAJE
/*Q.UI.Text.extend("EtiquetaPuntaje",{
	init : function(p) {
		this._super(p,{
			label: "0",
			color: "white"
		});
		
		Q.state.on("change.puntaje", this, "actualizaPuntaje");
	}, 
	
	actualizaPuntaje : function(puntaje){
		
		this.p.label = "" + puntaje;
	}
});*/
