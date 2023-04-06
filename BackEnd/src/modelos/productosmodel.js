//Se crecibe la conexión
var connection = require('../conexion');

//creamos un objeto para ir almacenandotodo lo que necesitemos
var ProductosModel = {};

//---------------------------------------------------------------
//obtenemos todos los productos
ProductosModel.crulMostrarProductoss = function (callback)
{
    if (connection)
    {
        var sql = "SELECT `id_producto`, `nombre_producto`, "+
                  "`id_tipo_producto` "+
                  "FROM `productos` "+
                  "ORDER BY `id_producto`;";
        
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
//obtenemos un producto por su id
ProductosModel.crulMostrarProductos = function (filtro, callback)
{
    if (connection)
    {
        var sql = "SELECT `id_producto`, `nombre_producto`, "+
                  "`id_tipo_producto` "+
                  "FROM `productos` "+
                  "WHERE `id_producto` = " + connection.escape(filtro) + ";";

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
//añadir un nuevo producto
ProductosModel.crulCrearProductos = function (ProductosData, callback)
{
    if (connection)
    {

        var sql = "INSERT INTO productos SET ?";

        connection.query(sql, ProductosData, function (error, result)
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
//actualizar un producto
ProductosModel.crulModificarProductos = function (ProductosData, callback)
{
    if (connection)
    {
        var sql = "UPDATE productos SET nombre_producto = " + connection.escape(ProductosData.nombre_producto)
                    + ", id_tipo_producto = " + connection.escape(ProductosData.id_tipo_producto)
                    + " WHERE id_producto = " + connection.escape(ProductosData.id_producto) + ";";

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
module.exports = ProductosModel;