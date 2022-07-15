const { response, request } = require('express');
const Actividad = require('../models/Actividad');


const actividadPOST = async (req = request, res = response) => {
    const {fechaVencimiento, recompensa, castigo, descripcion, claseFK} = req.body;

    const actividad = new Actividad({fechaVencimiento, recompensa, castigo, descripcion, claseFK});

    //Guardamos en BD
    await actividad.save();

    res.status(201).json({
        msg: 'Post API',
        actividad
    })
}

module.exports = {
    actividadPOST,
}