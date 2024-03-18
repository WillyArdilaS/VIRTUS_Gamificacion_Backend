const { Schema, model } = require('mongoose');

const SchemaJuego = Schema({
  titulo: {
    type: String,
    required: [true, 'El título del juego es obligatorio']
  },
  tipo: {
    type: String,
    required: [true, 'El tipo de juego es obligatorio']
  },
  datos: Schema.Types.Mixed
});

module.exports = model('Juegos', SchemaJuego);
