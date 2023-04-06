//Se crecibe la conexión
var connection = require('../conexion');

//creamos un objeto para ir almacenandotodo lo que necesitemos
var TelefonosModel = {};

//---------------------------------------------------------------
//obtenemos todos los telefonos
TelefonosModel.crulMostrarTelefonoss = function (callback)
{
    if (connection)
    {
        var sql = "SELECT `id_telefono`, `id_empleado`, "+
                  "`telefono` "+
                  "FROM `telefonos` "+
                  "ORDER BY `id_telefono`;";
        
        connection.query(sql, function (error, rows) 
        {
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        });

    }
}

//---------------------------------------------------------------
//obtenemos un telefono por su id
TelefonosModel.crulMostrarTelefonos = function (filtro, callback)
{
    if (connection)
    {
        var sql = "SELECT `id_telefono`, `id_empleado`, "+
                  "`telefono` "+
                  "FROM `telefonos` "+
                  "WHERE `id_telefono` = " + connection.escape(filtro) + ";";

        connection.query(sql, function (error, row)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, row);
            }
        });
    }
}

//---------------------------------------------------------------
//añadir un nuevo telefono
TelefonosModel.crulCrearTelefonos = function (TelefonosData, callback)
{
    if (connection)
    {

        var sql = "INSERT INTO telefonos SET ?";

        connection.query(sql, TelefonosData, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg": "Registro Insertado."});
            }
        });
    }
}

//---------------------------------------------------------------
//actualizar un telefono
TelefonosModel.crulModificarTelefonos = function (TelefonosData, callback)
{
    if (connection)
    {
        var sql = "UPDATE telefonos SET id_empleado = " + connection.escape(TelefonosData.id_empleado)
                    + ", telefono = " + connection.escape(TelefonosData.telefono)
                    + " WHERE id_telefono = " + connection.escape(TelefonosData.id_telefono) + ";";

        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "Registro Actualizado."});
            }
        });
    }
}

//---------------------------------------------------------------
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = TelefonosModel;