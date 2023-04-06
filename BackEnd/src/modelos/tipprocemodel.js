//Se crecibe la conexión
var connection = require('../conexion');

//creamos un objeto para ir almacenandotodo lo que necesitemos
var TipProceModel = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de proceso
TipProceModel.crulMostrarTipProces = function (callback)
{
    if (connection)
    {
        var sql = "SELECT `id_tipo_proceso`, `tipo_proceso`, "+
                  "`inicial_tipo_proc` "+
                  "FROM `tipo_procesos` "+
                  "ORDER BY `tipo_proceso`;";
        
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
//obtenemos un tipo proce por su id
TipProceModel.crulMostrarTipProce = function (filtro, callback)
{
    if (connection)
    {
        var sql = "SELECT `id_tipo_proceso`, `tipo_proceso`, "+
                  "`inicial_tipo_proc` "+ 
                  "FROM `tipo_procesos` "+
                  "WHERE `id_tipo_proceso` = "+ connection.escape(filtro) + ";";
 
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
//añadir un nuevo tipo de proceso
TipProceModel.crulCrearTipProce = function (TipProceData, callback)
{
    if (connection)
    {

        var sql = "INSERT INTO tipo_procesos SET ?";

        connection.query(sql, TipProceData, function (error, result)
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
//actualizar un tipo de proceso
TipProceModel.crulModificarTipProce = function (TipProceData, callback)
{
    if (connection)
    {
        var sql = "UPDATE tipo_procesos SET tipo_proceso = " + connection.escape(TipProceData.tipo_proceso)
                    + ", inicial_tipo_proc = " + connection.escape(TipProceData.inicial_tipo_proc)
                    + " WHERE id_tipo_proceso = " + connection.escape(TipProceData.id_tipo_proceso) + ";";
        
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
module.exports = TipProceModel;