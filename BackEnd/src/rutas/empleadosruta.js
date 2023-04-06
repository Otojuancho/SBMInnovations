//Optenemos las librerias
var express = require('express');
var router = express.Router();

//obtenemos el modelo EmpleadosModel con toda la funcionalidad
var EmpleadosModel = require('../modelos/empleadosmodel');

//creamos el ruteo de la clase
module.exports = function ()
{

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todos los empleados
    router.get("/", function (req, res)
    {
        EmpleadosModel.crulMostrarEmpleadoss(function (error, data)
        {
            res.status(200).json(data);
        });
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra el empleado solicitado
    router.get("/:Id", function (req, res)
    {
        var filtro = req.params.Id;

        //solo actualizamos si la id es un número
        if (!isNaN(filtro))
        {
            EmpleadosModel.crulMostrarEmpleados(filtro, function (error, data)
            {
                //si el tipo de documento existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0)
                {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else
                {
                    res.json(404, 
                    { 
                        "msg": "Registro no Existe." 
                    });
                }
            });
        }
        else //si hay algún error
        {
            res.status(500).json({ "msg": "Error, debe digitar un número." });
        }
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res)
    {
        //creamos un objeto Json con los datos del empleado
        var EmpleadosData =
            {
                id_empleado: null,
                num_doc_empleado: req.body.num_doc_empleado,
                nombre1_empleado: req.body.nombre1_empleado,
                nombre2_empleado: req.body.nombre2_empleado,
                apellido1_empleado: req.body.apellido1_empleado,
                apellido2_empleado: req.body.apellido2_empleado,
                fecha_naci_empleado: req.body.fecha_naci_empleado,
                sexo_empleado: req.body.sexo_empleado,
                vigencia_empleado: req.body.vigencia_empleado,
                rol_empleado: req.body.rol_empleado,
                id_tip_doc: req.body.id_tip_doc,
            };

        //usamos la funcion para insertar
        EmpleadosModel.crulCrearEmpleados(EmpleadosData, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send({ error: "Error en registro." });
            }
        });
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    router.put("/", function (req, res)
    {
        //almacenamos los datos de la petición en un objeto
        var EmpleadosData =
            {
                id_empleado: req.body.id_empleado,
                num_doc_empleado: req.body.num_doc_empleado,
                nombre1_empleado: req.body.nombre1_empleado,
                nombre2_empleado: req.body.nombre2_empleado,
                apellido1_empleado: req.body.apellido1_empleado,
                apellido2_empleado: req.body.apellido2_empleado,
                fecha_naci_empleado: req.body.fecha_naci_empleado,
                sexo_empleado: req.body.sexo_empleado,
                vigencia_empleado: req.body.vigencia_empleado,
                rol_empleado: req.body.rol_empleado,
                id_tip_doc: req.body.id_tip_doc,
            };

        //usamos la funcion para actualizar
        EmpleadosModel.crulModificarEmpleados(EmpleadosData, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data && data.msg)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send(
                { 
                    error: "Error en actualizacion." 
                });
            }
        });
    });

    //exportamos el objeto para tenerlo disponible en EL APP
    return router;
}