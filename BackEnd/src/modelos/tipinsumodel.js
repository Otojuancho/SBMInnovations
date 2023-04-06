//Se crecibe la conexión
var connection = require('../conexion');

//creamos un objeto para ir almacenandotodo lo que necesitemos
var TipInsuModel = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de insumo
TipInsuModel.crulMostrarTipInsus = function (callback)
{
    if (connection)
    {
        var sql = "SELECT `id_tipo_insumo`, `tipo_insumo`, "+
                  "`inicial_tipo_insumo` "+
                  "FROM `tipo_insumos` "+
                  "ORDER BY `tipo_insumo`;";
        
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
//obtenemos un tipo insu por su id
TipInsuModel.crulMostrarTipInsu = function (filtro, callback)
{
    if (connection)
    {
        var sql = "SELECT `id_tipo_insumo`, `tipo_insumo`, "+
                  "`inicial_tipo_insumo` "+
                  "FROM `tipo_insumos` "+
                  "WHERE `id_tipo_insumo` = "+ connection.escape(filtro) + ";";
 
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
//añadir un nuevo tipo de insumo
TipInsuModel.crulCrearTipInsu = function (TipInsuData, callback)
{
    if (connection)
    {

        var sql = "INSERT INTO tipo_insumos SET ?";

        connection.query(sql, TipInsuData, function (error, result)
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
//actualizar un tipo de insumo
TipInsuModel.crulModificarTipInsu = function (TipInsuData, callback)
{
    if (connection)
    {
        var sql = "UPDATE tipo_insumos SET tipo_insumo = " + connection.escape(TipInsuData.tipo_insumo)
                    + ", inicial_tipo_insumo = " + connection.escape(TipInsuData.inicial_tipo_insumo)
                    + " WHERE id_tipo_insumo = " + connection.escape(TipInsuData.id_tipo_insumo) + ";";
        
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
module.exports = TipInsuModel;