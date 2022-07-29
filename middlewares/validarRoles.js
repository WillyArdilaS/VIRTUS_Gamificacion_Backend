const { request, response } = require("express")


const esProfesorRol = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'No hay token validado para el rol',
        })
    }


    const { rol, nombre, apellido } = req.usuario;

    if (rol !== 'maestro') {
        return res.status(401).json({
            msg: 'El usuario que solicita la petición no es maestro',
        })
    }

    next();
}

module.exports = {
    esProfesorRol,
}