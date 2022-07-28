const { Router } = require("express");
const { check } = require("express-validator");
const { loginPOST } = require("../controllers/authController");
const { validarUsuario } = require("../middlewares/validarUsuarios");

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').notEmpty(),
    check('correo', 'Debe ser un correo valido').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),

    validarUsuario
], loginPOST);

module.exports = router;