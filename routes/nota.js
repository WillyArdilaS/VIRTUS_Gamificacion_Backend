const { Router } = require("express");
const { check } = require("express-validator");
const { obtenerNotaPorUsuarioYActividad, obtenerNotasPorActividad, guardarNota } = require("../controllers/notaController");

const { validarUsuario } = require("../middlewares/validarUsuarios");


const router = Router();

//PETICIONES
//GET
router.get('/obtenerNotaPorUsuarioYActividad', obtenerNotaPorUsuarioYActividad);

router.get('/obtenerNotasPorActividad', obtenerNotasPorActividad);


//POST
router.post('/', [
    check('valor', 'El valor de la nota es obligatorio').notEmpty(),
    check('usuarioEstudianteFK', 'La llave que relaciona al usuario es obligatoria').notEmpty(),
    check('actividadFK', 'La llave que relaciona la clase es obligatoria').notEmpty(),

    validarUsuario
], guardarNota);




module.exports = router;