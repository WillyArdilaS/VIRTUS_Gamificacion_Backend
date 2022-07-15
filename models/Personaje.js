const { Schema, model } = require('mongoose')

const SchemaPersonaje = Schema({
    clase: {
        type: String,
        required: [true, 'La clase del personaje es obligatoria']
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
    //FK de usuario
    usuarioFK: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    }

})




module.exports = model('Personajes', SchemaPersonaje);
