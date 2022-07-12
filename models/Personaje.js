const { Schema, model } = require('mongoose')

const SchemaUsuario = Schema({
    clase: {
        type: String,
        required: [true, 'La clase es obligatoria']
    },
    experiencia: {
        type: Number,
        default: 0
    },
    vida: {
        type: Number,
        default: 100
    },
    habilidad: {
        type: String,        
    },
    estado: {
        type: Boolean,
        default: true
    },

    //DESPUES SE METE LA FK

})




module.exports = model('Personajes', SchemaUsuario);
