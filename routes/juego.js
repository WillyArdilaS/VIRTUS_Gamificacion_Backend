const { Router } = require("express");
const { check } = require("express-validator");
const {
  juegoGET,
  juegoPOST,
  juegoIdGET,
  juegoPUT,
  juegoDELETE,
} = require("../controllers/juegoController");
const { validarJWT } = require("../middlewares/validarJWT");
const { esProfesorRol } = require("../middlewares/validarRoles");
const router = Router();

// GET /juego
router.get("/", juegoGET);

// POST /juego
router.post(
  "/",
  [
    validarJWT,
    esProfesorRol,
    check("titulo", "El título del juego es obligatorio").notEmpty(),
    check("tipo", "El tipo de juego es obligatorio").notEmpty(),
    check("datos", "Los datos del juego son obligatorios").notEmpty(),
  ],
  juegoPOST
);

// GET /juego/:id
router.get("/:id", juegoIdGET);

// PUT /juego/:id
router.put(
  "/:id",
  [
    validarJWT,
    esProfesorRol,
    check("titulo", "El título del juego es obligatorio").notEmpty(),
    check("tipo", "El tipo de juego es obligatorio").notEmpty(),
    check("datos", "Los datos del juego son obligatorios").notEmpty(),
  ],
  juegoPUT
);

// DELETE /juego/:id
router.delete("/:id", [validarJWT, esProfesorRol], juegoDELETE);

module.exports = router;
