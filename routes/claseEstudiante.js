const { Router } = require("express");
const { check } = require("express-validator");
const { claseEstudiantePOST, claseEstudianteGET } = require("../controllers/claseEstudianteController");
const { ExisteID_BD, ExisteID_Clase } = require("../helpers/db-validator");

const { validarUsuario } = require("../middlewares/validarUsuarios");

const router = Router();

router.post('/',[
    check('usuarioEstudianteFK', 'La llave foranea del estudiante es obligatoria').notEmpty(),
    check('usuarioEstudianteFK', 'La llave foranea del estudiante no es una key valida de Mongo').isMongoId(),
    check('usuarioEstudianteFK', 'La llave foranea del estudiante no se encuentra en la BD').custom(ExisteID_BD),
    check('claseFK', 'La llave foranea de la clase es obligatoria').notEmpty(),
    check('claseFK', 'La llave foranea de la clase no es una key valida de Mongo').isMongoId(),
    check('claseFK', 'La llave foranea de la clase no se encuentra en la BD').custom(ExisteID_Clase),

    validarUsuario

] ,claseEstudiantePOST);

router.post('/claseEstudianteGET',[
    check('idEstudiante','El ID del estudiante es obligatorio').notEmpty(),
    check('idEstudiante','El ID del estudiante no es una key valida de mongo').isMongoId(),    

    validarUsuario
], claseEstudianteGET);


module.exports = router;