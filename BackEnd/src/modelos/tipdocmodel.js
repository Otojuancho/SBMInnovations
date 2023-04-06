//Se crecibe la conexión
var connection = require('../conexion');

//creamos un objeto para ir almacenandotodo lo que necesitemos
var TipDocModel = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de documento
TipDocModel.crulMostrarTipDocs = function (callback)
{
    if (connection)
    {
        var sql = "SELECT `id_tip_doc`, `tipo_documento`, "+
                  "`inicial_tipo_doc` "+
                  "FROM `tipos_documentos` "+
                  "ORDER BY `tipo_documento`;";
        
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
//obtenemos un tipo doc por su id
TipDocModel.crulMostrarTipDoc = function (filtro, callback)
{
    if (connection)
    {
        var sql = "SELECT `id_tip_doc`, `tipo_documento`, "+
                  "`inicial_tipo_doc` "+
                  "FROM `tipos_documentos` "+
                  "WHERE `id_tip_doc` = " + connection.escape(filtro) + ";";

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
//añadir un nuevo tipo de documento
TipDocModel.crulCrearTipDoc = function (TipDocData, callback)
{
    if (connection)
    {

        var sql = "INSERT INTO tipos_documentos SET ?";

        connection.query(sql, TipDocData, function (error, result)
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
//actualizar un tipo de documento
TipDocModel.crulModificarTipDoc = function (TipDocData, callback)
{
    if (connection)
    {
        var sql = "UPDATE tipos_documentos SET tipo_documento = "+ connection.escape(TipDocData.tipo_documento)
                    + ", inicial_tipo_doc = "+ connection.escape(TipDocData.inicial_tipo_doc)
                    + " WHERE id_tip_doc = "+ connection.escape(TipDocData.id_tip_doc) + ";";

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
module.exports = TipDocModel;