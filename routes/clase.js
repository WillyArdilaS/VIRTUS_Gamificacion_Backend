const { Router } = require("express");
const { check } = require("express-validator");
const { clasePOST, claseGET } = require("../controllers/claseController");
const { ExisteID_BD } = require("../helpers/db-validator");
const { validarJWT } = require("../middlewares/validarJWT");
const { esProfesorRol } = require("../middlewares/validarRoles");

const { validarUsuario } = require("../middlewares/validarUsuarios");
const router = Router();

//GET
router.get('/', claseGET);

//POST
router.post('/', [
    //Validación del JWT que quiere acceder a la ruta
    validarJWT,
    //Validación del rol que quiere acceder a la ruta
    esProfesorRol,

    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('codigoGrupo', 'El codigo del grupo es obligatorio').notEmpty(),
    check('descripcion', 'La descripción es obligatorio').notEmpty(),
    check('dificultad', 'La dificultad de la clase es obligatoria').notEmpty(),
    check('usuarioProfesorFK', 'La llave foranea es obligatoria').notEmpty(),
    check('usuarioProfesorFK', 'La llave foranea del usuario profesor no es una key de mongo valida').isMongoId(),
    check('usuarioProfesorFK', 'La llave foranea').custom(ExisteID_BD),

    validarUsuario
], clasePOST);




module.exports = router;