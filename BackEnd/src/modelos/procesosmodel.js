//Se crecibe la conexión
var connection = require('../conexion');

//creamos un objeto para ir almacenandotodo lo que necesitemos
var ProcesosModel = {};

//---------------------------------------------------------------
//obtenemos todos los procesos
ProcesosModel.crulMostrarProcesoss = function (callback)
{
    if (connection)
    {
        var sql = "SELECT `id_proceso`, `nombre_proceso`, `descripcion_proceso`, "+
                  "`id_tipo_proceso`, `id_producto` "+
                  "FROM `procesos` "+
                  "ORDER BY `id_proceso`;";
        
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
//obtenemos un proceso por su id
ProcesosModel.crulMostrarProcesos = function (filtro, callback)
{
    if (connection)
    {
        var sql = "SELECT `id_proceso`, `nombre_proceso`, `descripcion_proceso`,"+
                  "`id_tipo_proceso`, `id_producto` "+
                  "FROM `procesos` "+
                  "WHERE `id_proceso` = " + connection.escape(filtro) + ";";

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
//añadir un nuevo proceso
ProcesosModel.crulCrearProcesos = function (ProcesosData, callback)
{
    if (connection)
    {

        var sql = "INSERT INTO procesos SET ?";

        connection.query(sql, ProcesosData, function (error, result)
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
//actualizar un proceso
ProcesosModel.crulModificarProcesos = function (ProcesosData, callback)
{
    if (connection)
    {
        var sql = "UPDATE procesos SET nombre_proceso = " + connection.escape(ProcesosData.nombre_proceso)
                    + ", descripcion_proceso = " + connection.escape(ProcesosData.descripcion_proceso)
                    + ", id_tipo_proceso = " + connection.escape(ProcesosData.id_tipo_proceso)
                    + ", id_producto = " + connection.escape(ProcesosData.id_producto)
                    + " WHERE id_proceso = " + connection.escape(ProcesosData.id_proceso) + ";";

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
module.exports = ProcesosModel;