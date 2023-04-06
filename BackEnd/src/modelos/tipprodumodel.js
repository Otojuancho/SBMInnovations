//Se crecibe la conexión
var connection = require('../conexion');

//creamos un objeto para ir almacenandotodo lo que necesitemos
var TipProduModel = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de producto
TipProduModel.crulMostrarTipProdus = function (callback)
{
    if (connection)
    {
        var sql = "SELECT `id_tipo_producto`, `tipo_producto`, "+ 
                  "`inicial_tipo_prod` "+
                  "FROM `tipo_productos` "+
                  "ORDER BY `tipo_producto`;";
        
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
//obtenemos un tipo produ por su id
TipProduModel.crulMostrarTipProdu = function (filtro, callback)
{
    if (connection)
    {
        var sql = "SELECT `id_tipo_producto`, `tipo_producto`, "+
                  "`inicial_tipo_prod` "+
                  "FROM `tipo_productos` "+
                  "WHERE `id_tipo_producto` = " + connection.escape(filtro) + ";";
 
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
//añadir un nuevo tipo de producto
TipProduModel.crulCrearTipProdu = function (TipProduData, callback)
{
    if (connection)
    {

        var sql = "INSERT INTO tipo_productos SET ?";

        connection.query(sql, TipProduData, function (error, result)
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
//actualizar un tipo de producto
TipProduModel.crulModificarTipProdu = function (TipProduData, callback)
{
    if (connection)
    {
        var sql = "UPDATE tipo_productos SET tipo_producto = " + connection.escape(TipProduData.tipo_producto)
                    + ", inicial_tipo_prod = " + connection.escape(TipProduData.inicial_tipo_prod)
                    + " WHERE id_tipo_producto = " + connection.escape(TipProduData.id_tipo_producto) + ";";
        
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
module.exports = TipProduModel;