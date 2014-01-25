//NOTE QUE SE HAN CAMBIADO LAS RUTAS
//QUE USA QUINTUS PARA BUSCAR POR CONVENCION
var Q = Quintus({
	development : true,
	imagePath : "estatico/images/",
	audioPath : "estatico/audio/",
	dataPath : "estatico/data/",
});

Q.include("Sprites, Scenes, Input, 2D, Touch, Audio,Anim,UI");
Q.setup("juego");
Q.enableSound();
Q.controls();
Q.touch();

Q.gravityX = 0;
Q.gravityY = 0;

var PACMAN = 1;
var MAPA = 2;
var ENEMIGO = 4;
var PUNTO = 8;
var ALIMENTO = 16;
var PODER = 32;

//ESTO SE AGREGO CON RESPECTO A LA CLASE ANTERIOR
var RECURSOS_LISTOS = false;

Q.load("mapa.tmx, mosaicos.png, pacman_titulo.png", function() {

	Q.sheet("mosaicos", "mosaicos.png", {
		tileW : 20,
		tileH : 20
	});
	//CUANDO TENGAMOS LOS RECURSOS LISTOS
	//PONEMOS ESTA BANDERA A TRUE
	RECURSOS_LISTOS = true;

});
