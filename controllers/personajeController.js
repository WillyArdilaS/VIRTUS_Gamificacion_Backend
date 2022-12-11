const { response, request } = require('express');
var bcrypt = require('bcryptjs');

const Personaje = require('../models/Personaje')

const personajeGET = async (req = request, res = response) => {

    const query = { estado: true }

    const [contarPersonajes, personajesBD] = await Promise.all([
        Personaje.countDocuments(query),
        Personaje.find(query)]);

    res.status(200).json({
        msg: 'Get API',
        contarPersonajes,
        personajesBD
    })

}
const personajePUT = async (req = request, res = response) => {

    const {_id, ...resto} = req.body;

    const updatePersonajeBD = await Personaje.findByIdAndUpdate(_id, resto);

    res.status(200).json({
        mensaje: 'PUT',
        updatePersonajeBD
    })

}
const personajePOST = async (req = request, res = response) => {

    const clase = req.body.clase.toUpperCase();
    const usuarioFK = req.body.usuarioFK;

    //Data
    const data = {
        clase,
        usuarioFK
    }

    //Instancia del esquema
    const personaje = new Personaje(data)

    //Guaradamos en BD
    await personaje.save();


    res.status(200).json({
        msg: 'POST',
        personaje
    })
}
const personajeDELETE = () => {

}

module.exports = {
    personajeGET,
    personajePUT,
    personajePOST,
    personajeDELETE
}