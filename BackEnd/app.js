var express = require('express');//guarda express que nosotros intalamos
var bodyParser = require('body-parser'), port = 3000;//rmanejo de cuerpo de la "pagina" y puerto
var http = require('http');//protocolo de intercambio de archivos
var path = require('path');//direccion

var conectado = require('./src/conexion/index');
var empleados = require('./src/Rutas/empleadosruta');//ruta
var insumos = require('./src/Rutas/insumosruta');//ruta
var procesos = require('./src/Rutas/procesosruta');//ruta
var producciones = require('./src/Rutas/produccionesruta');//ruta
var productos = require('./src/Rutas/productosruta');//ruta
var roles = require('./src/Rutas/rolesruta');//ruta
var telefonos = require('./src/Rutas/telefonosruta');//ruta
var tipdoc = require('./src/Rutas/tipdocruta');//ruta
var tipinsu = require('./src/Rutas/tipinsuruta');//ruta
var tipproce = require('./src/Rutas/tipproceruta');//ruta
var tipprodu = require('./src/Rutas/tipproduruta');//ruta

var app = express();//recibe un constructor

// todos los entornos
app.set('port', process.env.PORT || port);//metodo para recibir puerto y proceso
app.use(bodyParser.json({type: 'application/json', limit: '10mb'}));//recibe un cuerpo y un objeto json
app.use(bodyParser.urlencoded({extended: false}));//recibe url codificada
app.use(express.static(path.join(__dirname, 'public')));//recibe direccion

//================================================================

app.use(function (req, res, next)
{

    // Stio web al que desea permitir que se conecte
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // A que métodos que desea dar permisos
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // A que  encabezados se les va a dar permiso
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //Establezca en verdadero si necesita que el sitio web incluya cookies en las solicitudes enviadas
    //a la API (por ejemplo, en caso de que use sesiones)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pase a la siguiente capa de middleware
    next();
  });

  //============================================================

  app.use('/empleados', empleados());//ruta para el servicio
  app.use('/insumos', insumos());//ruta para el servicio
  app.use('/procesos', procesos());//ruta para el servicio
  app.use('/producciones', producciones());//ruta para el servicio
  app.use('/productos', productos());//ruta para el servicio
  app.use('/roles', roles());//ruta para el servicio
  app.use('/telefonos', telefonos());//ruta para el servicio
  app.use('/tipdoc', tipdoc());//ruta para el servicio
  app.use('/tipinsu', tipinsu());//ruta para el servicio
  app.use('/tipproce', tipproce());//ruta para el servicio
  app.use('/tipprodu', tipprodu());//ruta para el servicio

http.createServer(app).listen(app.get('port'), function ( )
{
    console.log('Servidor Express escuchando por el puerto ' + app.get('port'));
});

module.exports = app;