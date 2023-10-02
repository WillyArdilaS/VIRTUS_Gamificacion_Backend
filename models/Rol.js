const { Schema, model } = require('mongoose')

const SchemaUsuario = Schema({
    roles:{
        type: String,
        required: [true, 'El rol es obligatorio']
    }
})


module.exports = model ('Roles', SchemaUsuario);
