const { Schema, model } = require('mongoose')

const SchemaActividad = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la actividad es obligatorio']
    },
    fechaVencimiento: {
        type: Date,
        required: [true, 'La fecha de vencimiento es obligatorio']
    },
    recompensa: {
        type: Number,
        required: [true, 'La experiencia por completar la actividad es obligatoria']
    },
    castigo: {
        type: Number,
        required: [true, 'El castigo por incumplir la actividad es obligatoria']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción de la clase es obligatoria']
    },
    dificultad: {
        type: String,
        required: [true, 'La dificultad de la clase es obligatoria']
    },
    disponible: {
        type: Boolean,
        default: true
    },
    //FK de la clase
    claseFK: {
        type: Schema.Types.ObjectId,
        ref: 'Clases',
        required: true
    },
    // otros campos de Actividad
    juegoFK: {
        type: Schema.Types.ObjectId,
        ref: 'Juegos',
        required: true
    }
})

module.exports = model('Actividades', SchemaActividad);
