const { response, request } = require('express');
const Actividad = require('../models/Actividad');


const actividadGET = async (req = request, res = response) => {
    const query = { estado: true }

    const [contarActividades, actividadesBD] = await Promise.all([
        Actividad.countDocuments(query),
        Actividad.find(query)]);

    await actualizarDisponibilidadActividades(actividadesBD);

    res.status(200).json({
        msg: 'Get API',
        contarActividades,
        actividadesBD
    })
} 

const actividadPOST = async (req = request, res = response) => {
    const {fechaVencimiento, recompensa, castigo, descripcion, dificultad, claseFK} = req.body;

    const actividad = new Actividad({fechaVencimiento, recompensa, castigo, descripcion, dificultad, claseFK});
    console.log(actividad)
    usuarioAutenticado = req.usuario;

    //Guardamos en BD
    await actividad.save();

    res.status(201).json({
        msg: 'Post API',
        actividad,
        usuarioAutenticado
    })
}

const actualizarDisponibilidadActividades = async (actividades) => {
    for (const actividad of actividades) {
        if (actividad.disponible && new Date(actividad.fechaVencimiento) <= new Date()) {
            await Actividad.findByIdAndUpdate(actividad._id, { disponible: false });
        }
    }
};

module.exports = {
    actividadPOST,
    actividadGET
}