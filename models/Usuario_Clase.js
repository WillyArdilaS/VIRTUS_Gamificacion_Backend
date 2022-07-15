const { Schema, model } = require('mongoose')

const SchemaUsuario_Clase = Schema({
    //FK del usuario - estudiante
    usuarioEstudianteFK: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    //FK de la clase
    claseFK: {
        type: Schema.Types.ObjectId,
        ref: 'Clases',
        required: true
    }

})




module.exports = model('Usuarios_Clases', SchemaUsuario_Clase);
