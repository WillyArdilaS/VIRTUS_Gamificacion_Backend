const { Schema, model } = require('mongoose')

const SchemaClase = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la clase es obligatoria']
    },    
    codigoGrupo: {
        type: String,
        required: [true, 'El codigo del grupo es obligatorio']
    }, 
    descripcion: {
        type: String,
        required: [true, 'La descripción de la clase es obligatoria']
    },
    dificultad: {
        type: String,
        required: [true, 'La dificultad de la clase es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    },
    //FK del profesor que creo la clase
    usuarioProfesorFK: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    }

})




module.exports = model('Clases', SchemaClase);
