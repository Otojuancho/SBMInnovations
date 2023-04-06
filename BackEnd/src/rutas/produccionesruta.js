//Optenemos las librerias
var express = require('express');
var router = express.Router();

//obtenemos el modelo ProduccionesModel con toda la funcionalidad
var ProduccionesModel = require('../modelos/produccionesmodel');

//creamos el ruteo de la clase
module.exports = function ()
{

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todas las producciones
    router.get("/", function (req, res)
    {
        ProduccionesModel.crulMostrarProduccioness(function (error, data)
        {
            res.status(200).json(data);
        });
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra la produccion solicitada
    router.get("/:Id", function (req, res)
    {
        var filtro = req.params.Id;

        //solo actualizamos si la id es un número
        if (!isNaN(filtro))
        {
            ProduccionesModel.crulMostrarProducciones(filtro, function (error, data)
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
        //creamos un objeto Json con los datos de la produccion
        var ProduccionesData =
            {
                id_produccion: null,
                producto_produccion: req.body.producto_produccion,
                fecha_registro: req.body.fecha_registro,
                id_empleado: req.body.id_empleado,
            };

        //usamos la funcion para insertar
        ProduccionesModel.crulCrearProducciones(ProduccionesData, function (error, data)
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
        var ProduccionesData =
            {
                id_produccion: req.body.id_produccion,
                producto_produccion: req.body.producto_produccion,
                fecha_registro: req.body.fecha_registro,
                id_empleado: req.body.id_empleado,
            };

        //usamos la funcion para actualizar
        ProduccionesModel.crulModificarProducciones(ProduccionesData, function (error, data)
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

    //informe de produccion por empleado durante periodo de tiempo, ordenado por fecha del produccion
    router.post("/informe1", function(req,res)
    {
        //creamos un objeto json con los datos del informe
        var ProduccionesData =
        {
            num_doc_empleado: req.body.num_doc_empleado,
            FIni: req.body.FIni,
            FFin: req.body.FFin,
        };

        //usamos la funcion para insertar
        ProduccionesModel.crulinforme(ProduccionesData, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send(
                    {
                        error: "Error."
                    });
            }
        });
    });

    //informe de produccion por periodo de tiempo, ordenado por fecha del produccion
    router.post("/informe2", function(req,res)
    {
        //creamos un objeto json con los datos del informe
        var ProduccionesData =
        {
            FIni: req.body.FIni,
            FFin: req.body.FFin,
        };

        //usamos la funcion para insertar
        ProduccionesModel.crulinforme2(ProduccionesData, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send(
                    {
                        error: "Error."
                    });
            }
        });
    });

    //exportamos el objeto para tenerlo disponible en EL APP
    return router;
}