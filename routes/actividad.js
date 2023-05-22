const { Router } = require("express");
const { check } = require("express-validator");
const { actividadPOST, actividadGET } = require("../controllers/actividadController");
const { ExisteID_Clase } = require("../helpers/db-validator");
const { validarJWT } = require("../middlewares/validarJWT");
const { esProfesorRol } = require("../middlewares/validarRoles");

const { validarUsuario } = require("../middlewares/validarUsuarios");
const router = Router();

//GET
router.get('/', actividadGET);

//POST
router.post('/', [
    validarJWT,
    esProfesorRol,
    check('fechaVencimiento', 'La fecha de nacimiento es obligatoria').notEmpty(),
    check('recompensa', 'El valor de la recompensa es obligatorio').notEmpty(),
    check('castigo', 'El valor del castigo es obligatorio').notEmpty(),
    check('descripcion', 'La descripción es obligatoria').notEmpty(),
    check('dificultad', 'La dificultad de la clase es obligatoria').notEmpty(),
    check('claseFK', 'La llave foranea de la clase es obligatoria').notEmpty(),
    check('claseFK', 'La llave foranea de la clase no es una key valida de mongo').isMongoId(),
    check('claseFK', 'La llave foranea de la clase no existe').custom(ExisteID_Clase),

    validarUsuario
],actividadPOST);




module.exports = router;