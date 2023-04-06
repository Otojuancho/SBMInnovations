//Se crecibe la conexión
var connection = require('../conexion');

//creamos un objeto para ir almacenandotodo lo que necesitemos
var InsumosModel = {};

//---------------------------------------------------------------
//obtenemos todos los insumos
InsumosModel.crulMostrarInsumoss = function (callback)
{
    if (connection)
    {
        var sql = "SELECT `id_insumo`, `nombre_insumo`, `descripcion_insumo`, "+
                  "`id_tipo_insumo`, `id_producto` "+
                  "FROM `insumos` "+
                  "ORDER BY`id_insumo`;";
        
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
//obtenemos un insumo por su id
InsumosModel.crulMostrarInsumos = function (filtro, callback)
{
    if (connection)
    {
        var sql = "SELECT `id_insumo`, `nombre_insumo`, `descripcion_insumo`, "+
                  "`id_tipo_insumo`, `id_producto` "+
                  "FROM `insumos` "+
                  "WHERE `id_insumo` = " + connection.escape(filtro) + ";";

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
//añadir un nuevo insumo
InsumosModel.crulCrearInsumos = function (InsumosData, callback)
{
    if (connection)
    {

        var sql = "INSERT INTO insumos SET ?";

        connection.query(sql, InsumosData, function (error, result)
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
//actualizar un insumo
InsumosModel.crulModificarInsumos = function (InsumosData, callback)
{
    if (connection)
    {
        var sql = "UPDATE insumos SET nombre_insumo = " + connection.escape(InsumosData.nombre_insumo)
                    + ", descripcion_insumo = " + connection.escape(InsumosData.descripcion_insumo)
                    + ", id_tipo_insumo = " + connection.escape(InsumosData.id_tipo_insumo)
                    + ", id_producto = " + connection.escape(InsumosData.id_producto)
                    + " WHERE id_insumo = " + connection.escape(InsumosData.id_insumo) + ";";

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
module.exports = InsumosModel;