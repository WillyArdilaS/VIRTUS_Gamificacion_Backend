const { Router } = require("express");
const { check } = require("express-validator");
const { clasePOST } = require("../controllers/claseController");
const { ExisteID_BD } = require("../helpers/db-validator");
const { validarJWT } = require("../middlewares/validarJWT");

const { validarUsuario } = require("../middlewares/validarUsuarios");
const router = Router();

//POST
router.post('/', [
    //Validación del rol que quiere acceder a la ruta
    validarJWT,


    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('descripcion', 'La descripción es obligatorio').notEmpty(),
    check('usuarioProfesorFK', 'La llave foranea es obligatoria').notEmpty(),
    check('usuarioProfesorFK', 'La llave foranea del usuario profesor no es una key de mongo valida').isMongoId(),
    check('usuarioProfesorFK', 'La llave foranea').custom(ExisteID_BD),

    validarUsuario
], clasePOST);




module.exports = router;