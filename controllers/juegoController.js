const { response, request } = require("express");
const { Juego, Crucigrama, Trivia, SopaLetras } = require("../models/Juego");
const { generar } = require("../models/SopaLetras");

const juegoGET = async (req = request, res = response) => {
  try {
    const juegos = await Juego.find();
    res.status(200).json({
      juegos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los juegos" });
  }
};

const juegoIdGET = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const juego = await Juego.findById(id);
    if (!juego) {
      return res.status(400).json({
        msg: "El juego no existe en la BD",
      });
    }
    res.status(200).json({
      juego,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el juego" });
  }
};

const juegoPOST = async (req = request, res = response) => {
  const { tipo } = req.body;
  try {
    let juego;
    switch (tipo) {
      case "crucigrama":
        const palabras = extraerPalabras(req.body.matriz);
        req.body.palabras = palabras;
        juego = new Crucigrama(req.body);
        break;
      case "preguntas":
        juego = new Trivia(req.body);
        break;
      case "sopa-letras":
        juego = new SopaLetras(req.body);
        break;
      default:
        return res.status(400).json({ error: "Tipo de juego no soportado" });
    }
    await juego.save();
    res.status(201).json({
      juego,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el juego" });
  }
};

const juegoPUT = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const juego = await Juego.findByIdAndUpdate(id, req.body, { new: true });
    if (!juego) {
      return res.status(400).json({
        msg: "El juego no existe en la BD",
      });
    }
    res.status(200).json({
      juego,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el juego" });
  }
};

const juegoDELETE = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const juego = await Juego.findByIdAndDelete(id);
    if (!juego) {
      return res.status(400).json({
        msg: "El juego no existe en la BD",
      });
    }
    res.status(200).json({
      msg: "Juego eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el juego" });
  }
};

const generarSopaDeLetras = async (req, res) => {
  const { id } = req.params;
  try {
    const juego = await SopaLetras.findById(id);
    if (!juego) {
      return res.status(404).json({ msg: "Juego no encontrado" });
    }

    const { filas, columnas, palabras } = juego;
    const words = palabras.map((p) => p.palabra);
    const sopaDeLetras = generar(filas, columnas, words);

    res.status(200).json(JSON.parse(sopaDeLetras));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Error interno del servidor al generar la sopa de letras" });
  }
};

const generarSopaDeLetrasLatest = async (req, res) => {
  try {
    const ultimoJuego = await SopaLetras.findOne().sort({ updatedAt: -1 });
    if (!ultimoJuego) {
      return res.status(404).json({ msg: "No se encontró ninguna sopa de letras" });
    }

    console.log("ESTE ES:", ultimoJuego)

    const { filas, columnas, palabras } = ultimoJuego;
    const words = palabras.map((p) => p.palabra);
    const sopaDeLetras = generar(filas, columnas, words);


    res.status(200).json(JSON.parse(sopaDeLetras));
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno del servidor al generar la sopa de letras" });
  }
};

function extraerPalabras(matriz) {
  const palabras = [];
  const filas = matriz.length;
  const columnas = matriz[0].length;

  // Extraer palabras horizontalmente
  for (let i = 0; i < filas; i++) {
    let palabra = '';
    for (let j = 0; j < columnas; j++) {
      if (matriz[i][j] !== '') {
        palabra += matriz[i][j];
      } else {
        if (palabra.length > 1) palabras.push(palabra);
        palabra = '';
      }
    }
    if (palabra.length > 1) palabras.push(palabra);
  }

  // Extraer palabras verticalmente
  for (let j = 0; j < columnas; j++) {
    let palabra = '';
    for (let i = 0; i < filas; i++) {
      if (matriz[i][j] !== '') {
        palabra += matriz[i][j];
      } else {
        if (palabra.length > 1) palabras.push(palabra);
        palabra = '';
      }
    }
    if (palabra.length > 1) palabras.push(palabra); 
  }

  return palabras;
}


module.exports = {
  juegoGET,
  juegoIdGET,
  juegoPOST,
  juegoPUT,
  juegoDELETE,
  generarSopaDeLetras,
  generarSopaDeLetrasLatest,
};
