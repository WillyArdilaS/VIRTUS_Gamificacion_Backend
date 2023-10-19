const { response, request } = require('express');
const Actividad = require('../models/Nota');


const notaGET = async (req = request, res = response) => {
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
    const {nombre, fechaVencimiento, recompensa, castigo, descripcion, dificultad, claseFK} = req.body;

    const actividad = new Actividad({nombre, fechaVencimiento, recompensa, castigo, descripcion, dificultad, claseFK});
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
    for (const actividad of actividades) {
        if (actividad.disponible && new Date(actividad.fechaVencimiento) < fechaActual) {
            await Actividad.findByIdAndUpdate(actividad._id, { disponible: false });
        }
    }
};

module.exports = {
    notaGET,
    actividadGET
}