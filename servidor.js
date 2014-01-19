//console.log("hola mundo node.js");

var socketio = require("socket.io"); //librerias externas
var http = require("http"); //libreria nativa de node.js
var express = require("express"); //libreria externa
var ejs = require("ejs");

//creamos una carcasa para una aplicacion web
var app = express();
//creamos un servidor http con la carcasa de express
var servidor = http.createServer(app);
//agregamos web sockets
var io = socketio.listen(servidor);
//levantamos el servidor en el puerto 5000

var PUERTO = process.env.PORT || 5000;//VER EJEMPLO OPERADOR AND VARIABLES


servidor.listen(PUERTO);

//proceess.env es del lado del serviror ya que no exste "document."


//---- CONFIGURACION DE EXPRESS ------
//PRIMER NOMBRE ES UN NOMBRE LOGICO
//EL SEGUNDO NOMBRE ES UN NOMBRE FISICO (el nombre de la carpeta real)
app.use("/estatico", express.static(__dirname + "/estatico"));
//configurar nuestra vista
app.set("views", __dirname + "/views");
//configurar el sistema de templates
app.engine(".html",ejs.__express);
//le dice al render cual es la extension por default
//de las vistas
app.set("view engine", "html");

app.get("/",function(req, res){	
	res.send("hola!");	
});

app.get("/acerca", function(req, res){
	res.send("Estas en la seccion 'ACERCA'");
});

app.get("/pacman",function(req, res){
	//render despliega vistas
	//res.render("index.html"); //SOLO si no se usa view engine
	res.render("index",{
		jugador:"pacman"
	});
});

app.get("/fantasma",function(req, res){
	
	res.render("index",{
		jugador:"fantasma"
	});
});

/* 
 [     0          1        cuando indexOf no encuentra regresa -1
  0 [jugador1, jugador2], //ESTE ES UN JUEGO
  1 [jugador1, jugador2], //ESTE ES OTRO JUEGO
  2 [jugaor1]  //un juego que le falta un jugador
  3 [socket]
 ]
 */

var juegos = [];
function asignaJuego(socket){	
	var juego = null;
	
	for(var numJuego=0; numJuego < juegos.length; numJuego++){
		
		var salaJuego = juegos[numJuego];
		if(salaJuego.length < 2){
			salaJuego.push(socket);
			juego = numJuego;
		}		
	}
	//si no hay sala de juegos creamos una nueva
	if(juego === null){
		
		juegos.push([socket]);
		juego = juegos.length - 1;
	}
	
	//si ya hay 2 jugadores en la sala
	if(juegos[juego].length === 2){
		
		var salaJuegos = juegos[juego];
		jugador1 = salaJuegos[0];
		jugador2 = salaJuegos[1];
		
		jugador1.contrincante = jugador2;
		jugador2.contrincante = jugador1;
		
		jugador1.emit("juego_listo");
		jugador2.emit("juego_listo");
		
	}
	
	//regresamos el numero de la sala de juego
	//que le asignamos al usuario
	socket.juego = juego;
	
	return juego;
}

io.sockets.on("connection", function(socket){
	//socket representa al usuario que se conecto
	console.log("se conecto un usuario");
	
	var juego = asignaJuego(socket);
	
	socket.on("informar_movimiento", function(datos){
		//datos del cliente
		var contrincante = socket.contrincante;		
		contrincante.emit("movimiento_remoto", datos);
		
	});
	
	socket.on("disconnect", function(){
		
		var salaJuego = juegos[socket.juego];
		//en esta sala de juego, buscamos al indice jugador(socket)
		var indiceJugador = salaJuego.indexOf(socket);
		
		if(indiceJugador != -1){
			//remueve al jugador que se desconecto
			//de la sala de juegos
			salaJuego.splice(indiceJugador, 1);
		}
		
		console.log("usuario se desconecto");
	});
	
});











