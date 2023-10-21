const { response, request } = require('express');
const Actividad = require('../models/Actividad');


const actividadGET = async (req = request, res = response) => {
    const query = { estado: true }

    const [contarActividades, actividadesBD] = await Promise.all([
        Actividad.countDocuments(query),
        Actividad.find(query)]);


    res.status(200).json({
        msg: 'Get API',
        contarActividades,
        actividadesBD
    })
} 

const actividadPOST = async (req = request, res = response) => {
    const {fechaVencimiento, recompensa, castigo, descripcion, dificultad, disponible, claseFK} = req.body;

    const actividad = new Actividad({fechaVencimiento, recompensa, castigo, descripcion, dificultad, disponible, claseFK});

    usuarioAutenticado = req.usuario;

    //Guardamos en BD
    await actividad.save();

    res.status(201).json({
        msg: 'Post API',
        actividad,
        usuarioAutenticado
    })
}

module.exports = {
    actividadPOST,
    actividadGET
}