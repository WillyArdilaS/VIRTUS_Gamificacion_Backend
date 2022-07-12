const { Router } = require("express");
const { check } = require("express-validator");
const { userGET, userPUT, userPOST, userDELETE } = require("../controllers/userController");
const { RolValidator, ExisteEmailValidator, ExisteID_BD } = require("../helpers/db-validator");
const { validarUsuario } = require("../middlewares/validarUsuarios");


const router = Router();

//PETICIONES
//GET
router.get('/', userGET);

//PUT
router.put('/:id',[
    check('id','No es un ID de Mongo valido').isMongoId(),
    check('id', 'No existe una coincidencia para ese ID').custom(ExisteID_BD),
    check('rol', 'El rol no es valido').custom(RolValidator),


    validarUsuario
], userPUT);

//POST
router.post('/', [
    check('nombre', 'El nombre no puede estar vacio').notEmpty(),
    check('apellido', 'El apellido no puede estar vacio').notEmpty(),
    check('rol', 'El rol no es valido').custom(RolValidator),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo', 'Este correo ya existe en la BD').custom(ExisteEmailValidator),
    check('password', 'El password debe tener más de 6 caracteres').isLength({ min: 6 }),
    check('fechaNacimiento', 'La fecha de nacimiento no puede estar vacia').notEmpty(),

    validarUsuario
], userPOST); 

//DELETE
router.delete('/:id', [
    check('id','No es un ID de Mongo valido').isMongoId(),
    check('id', 'No existe una coincidencia para ese ID').custom(ExisteID_BD),

    validarUsuario
], userDELETE);


module.exports = router;