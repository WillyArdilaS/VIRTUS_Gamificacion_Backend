const { response, request } = require("express")

const ClaseEstudiante = require('../models/Usuario_Clase');

const claseEstudiantePOST = async (req = request, res = response) => {
    const {usuarioEstudianteFK, claseFK } = req.body;

    const claseEstudiante = new ClaseEstudiante({usuarioEstudianteFK, claseFK });

    //Guardamos en BD
    await claseEstudiante.save();

    res.status(201).json({
        msg: 'Post API - Se unió a una clase',
        claseEstudiante,
    })
}

module.exports = {
    claseEstudiantePOST,
}