var uglify = require("uglify-js");
//libreria externa
var fs = require("fs");
//libreria interna file system = fs permite guardar archivos y leer arhcivos en uestra compu
var CleanCSS = require("clean-css");
//la C es porque necesita ser instanciado con New
var cleancss = new CleanCSS();
//requerido para esta libreria

var archivos = ["estatico/javascript/inicializar.js", "estatico/javascript/sprites.js", "estatico/javascript/componentes.js", "estatico/javascript/escenas.js", "estatico/javascript/unusuario.js"];

//se guarda el objeto en una variable
var codigoComprimido = uglify.minify(archivos);

//console.log(codigoComprimido.code);

fs.writeFile("estatico/javascript/juego.min.js", codigoComprimido.code, function(error) {
	//se ejcuta cuando termina de guardar el archivo

	if (error) {
		console.log("ocurrio un error: " + error);
	} else {
		console.log("todo salio bien!");
	}
});

fs.readFile("estatico/estilos.css", "utf-8", function(error, datos) {
	if (error) {
		console.log("error al comprimir css");
	} else {
		var cssComprimido = cleancss.minify(datos);
		fs.writeFile("estatico/estilos.min.css", cssComprimido);
	}
});
