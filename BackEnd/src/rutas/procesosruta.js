//Optenemos las librerias
var express = require('express');
var router = express.Router();

//obtenemos el modelo ProcesosModel con toda la funcionalidad
var ProcesosModel = require('../modelos/procesosmodel');

//creamos el ruteo de la clase
module.exports = function ()
{

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todos los procesos
    router.get("/", function (req, res)
    {
        ProcesosModel.crulMostrarProcesoss(function (error, data)
        {
            res.status(200).json(data);
        });
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra el proceso solicitado
    router.get("/:Id", function (req, res)
    {
        var filtro = req.params.Id;

        //solo actualizamos si la id es un número
        if (!isNaN(filtro))
        {
            ProcesosModel.crulMostrarProcesos(filtro, function (error, data)
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
        //creamos un objeto Json con los datos del proceso
        var ProcesosData =
            {
                id_proceso: null,
                nombre_proceso: req.body.nombre_proceso,
                descripcion_proceso: req.body.descripcion_proceso,
                id_tipo_proceso: req.body.id_tipo_proceso,
                id_producto: req.body.id_producto,
            };

        //usamos la funcion para insertar
        ProcesosModel.crulCrearProcesos(ProcesosData, function (error, data)
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
        var ProcesosData =
            {
                id_proceso: req.body.id_proceso,
                nombre_proceso: req.body.nombre_proceso,
                descripcion_proceso: req.body.descripcion_proceso,
                id_tipo_proceso: req.body.id_tipo_proceso,
                id_producto: req.body.id_producto,
            };


        //usamos la funcion para actualizar
        ProcesosModel.crulModificarProcesos(ProcesosData, function (error, data)
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