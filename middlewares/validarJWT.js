const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');


const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('TokenRol');

    if (!token) {
        return res.status(401).json({
            msg: 'No existe el token en la petición',
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.FIRMAJWT);
        
        //Traer la información del usuario autenticado
        const usuarioAutenticado = await Usuario.findById(uid);


        req.usuario = usuarioAutenticado;


    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'El token no es valido'
        })
    }


    next();
}

module.exports = {
    validarJWT,
}