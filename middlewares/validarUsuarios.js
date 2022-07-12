const { validationResult } = require('express-validator');

const validarUsuario = (req, res, next) => {
    
    const errorsValidator = validationResult(req);
    if (!errorsValidator.isEmpty()) {
        return res.status(400).json(errorsValidator);
    }

    next();
}

module.exports = {
    validarUsuario
}