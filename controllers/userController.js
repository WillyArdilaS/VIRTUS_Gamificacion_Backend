const { response, request } = require('express');
var bcrypt = require('bcryptjs');
//Importacion modelo de usuarios (BD)
const Usuario = require('../models/Usuario');


const userGET = async (req = request, res = response) => {

    // const { limiteSuperior = 10, limiteInferior = 0 } = req.query;
    const query = { estado: true }



    // const [contarUsuarios, usuariosBD] = await Promise.all([
    //     Usuario.countDocuments(query),
    //     Usuario.find(query).skip(limiteInferior).limit(limiteSuperior)]);

    const [contarUsuarios, usuariosBD] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)]);


    res.status(200).json({
        msg: 'Get API',
        contarUsuarios,
        usuariosBD
    })
}

const userPUT = async (req = request, res = response) => {

    const { id } = req.params
    const { _id, password, correo, ...resto } = req.body;

    if (password) {
        //Encriptación contraseña
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }

    const updateUsuarioBD = await Usuario.findByIdAndUpdate(id, resto);

    res.status(201).json({
        msg: 'Put API',
        updateUsuarioBD
    })
}

const userPOST = async (req = request, res = response) => {

    const { nombre, apellido, rol, correo, password, fechaNacimiento, estado } = req.body;

    //Instancia modelo usuario BD
    const usuario = new Usuario({ nombre, apellido, rol, correo, password, fechaNacimiento, estado });


    //Encriptación contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(usuario.password, salt);


    //Guardamos la instancia en mongo
    await usuario.save();


    res.status(201).json({
        msg: 'Post API',
        usuario
    })
}

const userDELETE = async (req = request, res = response) => {
    const { id } = req.params;


    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        msg: 'Delete API',
        usuario
    })
}

module.exports = {
    userGET,
    userPUT,
    userPOST,
    userDELETE
}