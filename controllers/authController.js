const { response, request } = require('express');
const Usuario = require('../models/Usuario');
var bcrypt = require('bcryptjs');

const loginPOST = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        //Verificamos si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El correo no existe en la BD',
            });
        }

        //Verificamos la contraseña
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if(!validarPassword){
            return res.status(400).json({
                msg: 'La contraseña es incorrecta',
            });
        }

        //Generamos JWT



        res.status(201).json({
            msg: 'LOGIN',
        })
    } catch (error) {
        console.log(error);
    }


}


module.exports = {
    loginPOST,
}