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


const actividadIdGET = async (req = request, res = response) => {
    const { id } = req.body

    const actividad = await Actividad.findOne({ id });
    if (!actividad) {
        return res.status(400).json({
            msg: 'La actividad no existe en la BD',
        });
    }

    res.status(200).json({
        actividad
    })
} 

const actividadClaseGET = async (req, res) => {
    const { claseFK } = req.body;

    try {
        // Obtenemos los registros filtrados por el ID de la clase y disponible=true
        const [contarActividades, actividadesBD] = await Promise.all([
            Actividad.countDocuments({ claseFK: claseFK, disponible: true }),
            Actividad.find({ claseFK: claseFK, disponible: true })
        ]);

        // Traemos solo los campos 'nombre', 'recompensa', 'castigo' y 'fechaVencimiento' de estas actividades
        const infoActividadesBD = actividadesBD.map((actividad) => ({
            nombre: actividad.nombre,
            recompensa: actividad.recompensa,
            castigo: actividad.castigo,
            fechaVencimiento: actividad.fechaVencimiento
        }));

        res.status(200).json({
            msg: 'Get API',
            contarActividades,
            infoActividadesBD
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las actividades' });
    }
};


const actividadPOST = async (req = request, res = response) => {
    const {nombre, fechaVencimiento, recompensa, castigo, descripcion, dificultad, claseFK, juegoFK} = req.body;

    const actividad = new Actividad({nombre, fechaVencimiento, recompensa, castigo, descripcion, dificultad, claseFK, juegoFK});
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
    actividadPOST,
    actividadIdGET,
    actividadGET,
    actividadClaseGET
}