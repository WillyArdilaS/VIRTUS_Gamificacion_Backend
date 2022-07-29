const { response, request } = require('express');

const Clase = require('../models/Clase');

const clasePOST = async (req = request, res = response) => {
    const {nombre, descripcion, usuarioProfesorFK} = req.body;

    const clase = new Clase({nombre, descripcion, usuarioProfesorFK});

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
}