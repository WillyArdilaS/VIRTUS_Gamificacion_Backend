const { response, request } = require('express');
const Juego = require('../models/Juego');

const juegoGET = async (req = request, res = response) => {
  try {
    const juegos = await Juego.find();
    res.status(200).json({
      juegos
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los juegos' });
  }
};

const juegoIdGET = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const juego = await Juego.findById(id);
    if (!juego) {
      return res.status(400).json({
        msg: 'El juego no existe en la BD',
      });
    }
    res.status(200).json({
      juego
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el juego' });
  }
};

const juegoPOST = async (req = request, res = response) => {
  try {
    const juego = new Juego(req.body);
    await juego.save();
    res.status(201).json({
      juego
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el juego' });
  }
};

const juegoPUT = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const juego = await Juego.findByIdAndUpdate(id, req.body, { new: true });
    if (!juego) {
      return res.status(400).json({
        msg: 'El juego no existe en la BD',
      });
    }
    res.status(200).json({
      juego
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el juego' });
  }
};

const juegoDELETE = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const juego = await Juego.findByIdAndDelete(id);
    if (!juego) {
      return res.status(400).json({
        msg: 'El juego no existe en la BD',
      });
    }
    res.status(200).json({
      msg: 'Juego eliminado correctamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el juego' });
  }
};

module.exports = {
  juegoGET,
  juegoIdGET,
  juegoPOST,
  juegoPUT,
  juegoDELETE
};
