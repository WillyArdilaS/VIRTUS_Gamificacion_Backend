const { response, request } = require('express');

const Clase = require('../models/Clase');

const claseGET = async (req = request, res = response) => {
    const query = { estado: true };

    const [contarClases, clasesBD] = await Promise.all([
        Clase.countDocuments(query),
        Clase.find(query)]);


    res.status(200).json({
        msg: 'Get API',
        contarClases,
        clasesBD
    })
}

const clasePOST = async (req = request, res = response) => {
    const {nombre, codigoGrupo, descripcion, dificultad, usuarioProfesorFK} = req.body;

    const clase = new Clase({nombre, codigoGrupo, descripcion, dificultad, usuarioProfesorFK});

    usuarioAutenticado = req.usuario;

    //Guardamos en BD
    await clase.save();

    res.status(201).json({
        msg: 'Post API',
        clase,
        usuarioAutenticado
    })
}

module.exports = {
    clasePOST,
    claseGET
}