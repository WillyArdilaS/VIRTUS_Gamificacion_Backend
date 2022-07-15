const { Router } = require("express");
const { check } = require("express-validator");
const { personajePUT, personajePOST, personajeGET, personajeDELETE } = require("../controllers/personajeController");

const { validarUsuario } = require("../middlewares/validarUsuarios");


const router = Router();

//PETICIONES
//GET
router.get('/', personajeGET);

//PUT - Crear nuevo personaje
router.put('/:id', personajePUT);

//POST
router.post('/', [
    check('clase', 'La clase es obligatoria').notEmpty(),
    check('usuarioFK', 'La llave que relaciona al usuario es obligatoria').notEmpty(),

    validarUsuario
], personajePOST);

//DELETE
router.delete('/', personajeDELETE);



module.exports = router;