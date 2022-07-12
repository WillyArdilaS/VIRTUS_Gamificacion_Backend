const { Schema, model } = require('mongoose')

const SchemaUsuario = Schema({
    nombre: { 
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'Los apellidos son obligatorio']
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    fechaNacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },

})


SchemaUsuario.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}




module.exports = model('Usuarios', SchemaUsuario);
