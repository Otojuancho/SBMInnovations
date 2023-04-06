//Se crecibe la conexión
var connection = require('../conexion');

//creamos un objeto para ir almacenandotodo lo que necesitemos
var RolesModel = {};

//---------------------------------------------------------------
//obtenemos todos los roles
RolesModel.crulMostrarRoless = function (callback)
{
    if (connection)
    {
        var sql = "SELECT `id_rol`, `nombre_rol`, "+
                 "`vigencia_rol` "+
                 "FROM `roles` "+
                 "ORDER BY `id_rol`;";
        
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
//obtenemos un rol por su id
RolesModel.crulMostrarRoles = function (filtro, callback)
{
    if (connection)
    {
        var sql = "SELECT `id_rol`, `nombre_rol`, "+
                  "`vigencia_rol` "+
                  "FROM `roles` "+
                  "WHERE `id_rol` = " + connection.escape(filtro) + ";";

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
//añadir un nuevo rol
RolesModel.crulCrearRoles = function (RolesData, callback)
{
    if (connection)
    {

        var sql = "INSERT INTO roles SET ?";

        connection.query(sql, RolesData, function (error, result)
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
//actualizar un rol
RolesModel.crulModificarRoles = function (RolesData, callback)
{
    if (connection)
    {
        var sql = "UPDATE roles SET nombre_rol = " + connection.escape(RolesData.nombre_rol)
                    + ", vigencia_rol = " + connection.escape(RolesData.vigencia_rol)
                    + " WHERE id_rol = " + connection.escape(RolesData.id_rol) + ";";

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
module.exports = RolesModel;