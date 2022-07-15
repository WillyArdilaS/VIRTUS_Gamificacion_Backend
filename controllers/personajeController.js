const { response, request } = require('express');
var bcrypt = require('bcryptjs');

const Personaje = require('../models/Personaje')

const personajeGET = () => {

}
const personajePUT = async (req = request, res = response) => {
    res.status(200).json({
        mensaje: 'PUT',
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