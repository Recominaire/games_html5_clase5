Q.scene("nivel1", function(stage) {

	var mapa = stage.collisionLayer(new Q.Mapa());
	mapa.configurar();
	
	//Q.state.reset({puntaje : 0});
	Q.state.set("puntaje", 0);

	stage.insert(new Q.UI.Text({
		label : "Puntaje",
		x : 500,
		y : 30,
		size : 20,
		color : "red",
		family : "Fascinate Inline"
	}));
	
	stage.insert(new Q.EtiquetaPuntos({
		x : 500,
		y: 70,
		size: 20,
	}));
	
	/*stage.insert(new Q.EtiquetaPuntaje({
		x: 500,
		y: 70
	}));*/

});

Q.scene("perdiste", function(stage) {
	
/*	var ventana = stage.insert(new Q.UI.Container({

		x : Q.width / 2,
		y : Q.height / 2,
		fill : "rgba(255, 255, 255, 0.7)"
	}));
*/

	var ventana = stage.insert(new Q.UI.Container({
		x : Q.width / 2,
		y : Q.height /2,
		fill : "rgba(255, 255, 255, 0.7)"
	}));

	var boton = ventana.insert(new Q.UI.Button({
		x : 0,
		y : 0,
		shadow: true,
		shadowColor: "red",
		/*x: 0,
		y: 0,*/
		fill : "red",
		fill : "#CCCCCC",
		fontColor : "white",
		label : "Volver a Jugar"
		//asset : "mosaicos.png"
	}));

	ventana.insert(new Q.UI.Text({
		x : 0,
		y : -70,
	/*	x: 0,
		y: -70,*/
		size : 60,
		color : "#FFEE00",
		label : "Game Over",
		family : "Fascinate Inline"
	}));
	
	ventana.fit(30);

	//ventana.fit(30);
	
	boton.on("click", function() {

		Q.clearStages();
		iniciarJuego();
	});

});

//solucion ejercicio
Q.scene("intro", function(stage) {

	stage.insert(new Q.Sprite({
		x : 300,
		y : 100,
		asset : "pacman_titulo.png"
	}));

	var boton = stage.insert(new Q.UI.Button({
		x : 300,
		y : 200,
		fill : "#F9A11C",
		size : 40,
		fontColor : "white",
		label : "Comenzar a Jugar"
	}));

	boton.on("click", function() {

		Q.clearStages();
		Q.stageScene("nivel1", {
			sort : true
		});
	});

});