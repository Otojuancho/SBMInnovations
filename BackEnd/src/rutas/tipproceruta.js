//Optenemos las librerias
var express = require('express');
var router = express.Router();

//obtenemos el modelo TipProceModel con toda la funcionalidad
var TipProceModel = require('../modelos/tipprocemodel');

//creamos el ruteo de la clase
module.exports = function ()
{

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todos los tipos de procesos
    router.get("/", function (req, res)
    {
        TipProceModel.crulMostrarTipProces(function (error, data)
        {
            res.status(200).json(data);
        });
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra el tipo de proceso solicitado
    router.get("/:Id", function (req, res)
    {
        var filtro = req.params.Id;

        //solo actualizamos si la id es un número
        if (!isNaN(filtro))
        {
            TipProceModel.crulMostrarTipProce(filtro, function (error, data)
            {
                //si el tipo de producto existe lo mostramos en formato json
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
        //creamos un objeto Json con los datos del tipo de proceso
        var TipProceData = 
            {
                id_tipo_proceso: null,
                tipo_proceso: req.body.tipo_proceso,
                inicial_tipo_proc: req.body.inicial_tipo_proc,
            };

        //usamos la funcion para insertar
        TipProceModel.crulCrearTipProce(TipProceData, function (error, data)
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
        var TipProcData =
            {
                id_tipo_proceso: req.body.id_tipo_proceso,
                tipo_proceso: req.body.tipo_proceso,
                inicial_tipo_proc: req.body.inicial_tipo_proc,
            };

        //usamos la funcion para actualizar
        TipProceModel.crulModificarTipProce(TipProcData, function (error, data)
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