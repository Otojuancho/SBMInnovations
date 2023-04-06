//Se crecibe la conexión
var connection = require('../conexion');

//creamos un objeto para ir almacenandotodo lo que necesitemos
var ProduccionesModel = {};

//---------------------------------------------------------------
//obtenemos todas las producciones
ProduccionesModel.crulMostrarProduccioness = function (callback)
{
    if (connection)
    {
        var sql = "SELECT `id_produccion`, `producto_produccion`, "+
                  "`fecha_registro`, `id_empleado` "+
                  "FROM `producciones` "+
                  "ORDER BY `id_produccion`;";
        
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
//obtenemos una produccion por su id
ProduccionesModel.crulMostrarProducciones = function (filtro, callback)
{
    if (connection)
    {
        var sql = "SELECT `id_produccion`, `producto_produccion`, "+
                  "`fecha_registro`, `id_empleado` "+
                  "FROM `producciones` "+
                  "WHERE `id_produccion` = " + connection.escape(filtro) + ";";

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
//añadir una nueva produccion
ProduccionesModel.crulCrearProducciones = function (ProduccionesData, callback)
{
    if (connection)
    {

        var sql = "INSERT INTO producciones SET ?";

        connection.query(sql, ProduccionesData, function (error, result)
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
//actualizar una produccion
ProduccionesModel.crulModificarProducciones = function (ProduccionesData, callback)
{
    if (connection)
    {
        var sql = "UPDATE producciones SET producto_produccion = " + connection.escape(ProduccionesData.producto_produccion)
                    + ", fecha_registro = " + connection.escape(ProduccionesData.fecha_registro)
                    + ", id_empleado = " + connection.escape(ProduccionesData.id_empleado)
                    + " WHERE id_produccion = " + connection.escape(ProduccionesData.id_produccion) + ";";

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

//informe de produccion por empleado durante periodo de tiempo, ordenado por fecha del produccion
ProduccionesModel.crulinforme = function (ProduccionesData, callback)
{
    if(connection)
    {
        var sql = "SELECT p.id_produccion, "+
		          "p.fecha_registro, "+
		          "p.id_empleado, "+
		          "CONCAT(pr.nombre_producto,', Tipo: ', "+
                         "f.tipo_producto) AS producto, "+
                  "CONCAT(d.inicial_tipo_doc,' - ', "+
                         "e.num_doc_empleado) AS documento, "+
		          "CONCAT(e.num_doc_empleado, ' - ', "+
				         "e.nombre1_empleado, ' ', "+
				         "e.nombre2_empleado, ' ', "+
				         "e.apellido1_empleado, ' ', "+
                         "e.apellido2_empleado) AS empleado, "+
                  "e.vigencia_empleado "+     
                  "FROM producciones p "+
	                  "INNER JOIN empleados e on (e.id_empleado = p.id_empleado) "+
                      "INNER JOIN productos pr on (pr.id_producto = p.producto_produccion) "+
                      "INNER JOIN tipos_documentos d on (d.id_tip_doc = e.id_tip_doc) "+
                      "INNER JOIN tipo_productos f on (f.id_tipo_producto = pr.id_tipo_producto) "+
                  "WHERE e.num_doc_empleado = " + connection.escape(ProduccionesData.num_doc_empleado) +
                  "AND p.fecha_registro > " + connection.escape(ProduccionesData.FIni) +
                  "AND p.fecha_registro < " + connection.escape(ProduccionesData.FFin) +
                  "ORDER BY p.fecha_registro; ";
                  
                  connection.query(sql, ProduccionesData, function (error, rows)
                  {
                      //se muestra el mensaje correspondiente
                      if(error)
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

//informe de produccion por periodo de tiempo, ordenado por fecha del produccion
ProduccionesModel.crulinforme2 = function (ProduccionesData, callback)
{
    if(connection)
    {
        var sql = "SELECT p.id_produccion, "+
                  "p.fecha_registro, "+
                  "p.id_empleado, "+
                  "CONCAT(pr.nombre_producto,', Tipo: ', "+
                         "t.tipo_producto) AS producto "+
                  "FROM producciones p "+
                      "INNER JOIN productos pr on (pr.id_producto = p.producto_produccion) "+
                       "INNER JOIN tipo_productos t on (t.id_tipo_producto = pr.id_tipo_producto) "+
                  "WHERE p.fecha_registro > " + connection.escape(ProduccionesData.FIni) +
                  "AND p.fecha_registro < " + connection.escape(ProduccionesData.FFin) +
                  "ORDER BY p.fecha_registro; ";
                  
                  connection.query(sql, ProduccionesData, function (error, rows)
                  {
                      //se muestra el mensaje correspondiente
                      if(error)
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
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = ProduccionesModel;