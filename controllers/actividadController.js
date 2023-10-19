const { response, request } = require('express');
const Actividad = require('../models/Actividad');


const actividadGET = async (req = request, res = response) => {
    const query = { estado: true }

    const [contarActividades, actividadesBD] = await Promise.all([
        Actividad.countDocuments(query),
        Actividad.find(query)]);

    // Verificar y actualizar la disponibilidad
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
    const fechaActual = new Date();

    // Iterar sobre las actividades y actualizar la disponibilidad según la fecha de vencimiento
    for (const actividad of actividades) {
        if (actividad.disponible && actividad.fechaVencimiento <= fechaActual) {
            // La fecha de vencimiento ha pasado, actualizar la disponibilidad a false
            await Actividad.findByIdAndUpdate(actividad._id, { disponible: false });
        }
    }
};

module.exports = {
    actividadPOST,
    actividadGET
}