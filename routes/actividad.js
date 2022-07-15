const { Router } = require("express");
const { check } = require("express-validator");
const { actividadPOST } = require("../controllers/actividadController");
const { ExisteID_Clase } = require("../helpers/db-validator");

const { validarUsuario } = require("../middlewares/validarUsuarios");
const router = Router();

//POST
router.post('/', [
    check('fechaVencimiento', 'La fecha de nacimiento es obligatoria').notEmpty(),
    check('recompensa', 'El valor de la recompensa es obligatorio').notEmpty(),
    check('castigo', 'El valor del castigo es obligatorio').notEmpty(),
    check('descripcion', 'La descripción es obligatoria').notEmpty(),
    check('claseFK', 'La llave foranea de la clase es obligatoria').notEmpty(),
    check('claseFK', 'La llave foranea de la clase no es una key valida de mongo').isMongoId(),
    check('claseFK', 'La llave foranea de la clase no existe').custom(ExisteID_Clase),

    validarUsuario
],actividadPOST);




module.exports = router;