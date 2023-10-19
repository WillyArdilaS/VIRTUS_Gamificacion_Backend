const { Schema, model } = require('mongoose')

const SchemaNota = Schema({
    valor: {
        type: Number,
        default: 0
    },
    //FK del estudiante
    usuarioEstudianteFK: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    //FK de la actividad
    actividadFK: {
        type: Schema.Types.ObjectId,
        ref: 'Actividades',
        required: true
    }

})

module.exports = model('Notas', SchemaNota);
