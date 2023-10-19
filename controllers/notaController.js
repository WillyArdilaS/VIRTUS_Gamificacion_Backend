const { response, request } = require('express');
const Nota = require('../models/Nota');


const obtenerNotasPorUsuarioYActividad = async (req = request, res = response) => {
    try {
        const { idUsuario, idActividad } = req.params;

        const notas = await Nota.find({
            usuarioEstudianteFK: idUsuario,
            actividadFK: idActividad
        });

        res.status(200).json({
            msg: 'Notas obtenidas correctamente',
            notas
        });
    } catch (error) {
        console.error('Error al obtener las notas:', error);
        res.status(500).json({
            msg: 'Error al obtener las notas',
            error: error.message
        });
    }
};

const obtenerNotasPorActividad = async (req = request, res = response) => {
    try {
        const { idActividad } = req.params;

        const notas = await Nota.find({
            actividadFK: idActividad
        });

        res.status(200).json({
            msg: 'Notas obtenidas correctamente',
            notas
        });
    } catch (error) {
        console.error('Error al obtener las notas:', error);
        res.status(500).json({
            msg: 'Error al obtener las notas',
            error: error.message
        });
    }
};

const guardarNota = async (req = request, res = response) => {
    try {
        const { valor, usuarioEstudianteFK, claseFK } = req.body;

        const nota = new Nota({ valor, usuarioEstudianteFK, claseFK });

        await nota.save();

        res.status(201).json({
            msg: 'Nota guardada correctamente',
            nota
        });
    } catch (error) {
        console.error('Error al guardar la nota:', error);
        res.status(500).json({
            msg: 'Error al guardar la nota',
            error: error.message
        });
    }
};

module.exports = {
    obtenerNotasPorUsuarioYActividad,
    obtenerNotasPorActividad,
    guardarNota
};


module.exports = {
    notaIdGET,
    notaPOST
}