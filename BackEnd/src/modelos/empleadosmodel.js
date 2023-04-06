//Se crecibe la conexión
var connection = require('../conexion');

//creamos un objeto para ir almacenandotodo lo que necesitemos
var EmpleadosModel = {};

//---------------------------------------------------------------
//obtenemos todos los emplados
EmpleadosModel.crulMostrarEmpleadoss = function (callback)
{
    if (connection)
    {
        var sql = "SELECT `id_empleado`, `num_doc_empleado`, `nombre1_empleado`, `nombre2_empleado`, "+
                  "`apellido1_empleado`, `apellido2_empleado`, `fecha_naci_empleado`, "+
                  "`sexo_empleado`, `vigencia_empleado`, `rol_empleado`, `id_tip_doc` "+
                  "FROM `empleados` ORDER BY `id_empleado`;";
        
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
//obtenemos un empleado por su id
EmpleadosModel.crulMostrarEmpleados = function (filtro, callback)
{
    if (connection)
    {
        var sql = "SELECT `id_empleado`, `num_doc_empleado`, `nombre1_empleado`, `nombre2_empleado`, "+
                  "`apellido1_empleado`, `apellido2_empleado`, `fecha_naci_empleado`, `sexo_empleado`, "+
                  "`vigencia_empleado`, `rol_empleado`, `id_tip_doc` "+
                  "FROM `empleados` WHERE `id_empleado` = " + connection.escape(filtro) + ";";

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
//añadir un nuevo empleado
EmpleadosModel.crulCrearEmpleados = function (EmpleadosData, callback)
{
    if (connection)
    {

        var sql = "INSERT INTO empleados SET ?";

        connection.query(sql, EmpleadosData, function (error, result)
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
//actualizar un empleado
EmpleadosModel.crulModificarEmpleados = function (EmpleadosData, callback)
{
    if (connection)
    {
        var sql = "UPDATE empleados SET num_doc_empleado = " + connection.escape(EmpleadosData.num_doc_empleado)
                    + ", nombre1_empleado = " + connection.escape(EmpleadosData.nombre1_empleado)
                    + ", nombre2_empleado = " + connection.escape(EmpleadosData.nombre2_empleado)
                    + ", apellido1_empleado = " + connection.escape(EmpleadosData.apellido1_empleado)
                    + ", apellido2_empleado = " + connection.escape(EmpleadosData.apellido2_empleado)
                    + ", fecha_naci_empleado = " + connection.escape(EmpleadosData.fecha_naci_empleado)
                    + ", sexo_empleado = " + connection.escape(EmpleadosData.sexo_empleado)
                    + ", vigencia_empleado = " + connection.escape(EmpleadosData.vigencia_empleado)
                    + ", rol_empleado = " + connection.escape(EmpleadosData.rol_empleado)
                    + ", id_tip_doc = " + connection.escape(EmpleadosData.id_tip_doc)
                    + " WHERE id_empleado = " + connection.escape(EmpleadosData.id_empleado) + ";";

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
module.exports = EmpleadosModel;