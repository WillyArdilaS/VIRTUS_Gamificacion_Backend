//HTTP
const cors = require('cors')
const express = require('express');
const { DBConnection } = require('../database/configDB');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // Rutas
        this.authRoute = '/api/auth';
        this.userRoute = '/api/users';
        this.personajeRoute = '/api/personajes';
        this.claseRoute = '/api/clases';
        this.claseEstudianteRoute = '/api/clasesEstudiante';
        this.actividadRoute = '/api/actividad';
        this.notaRoute = '/api/nota';

        //Conexion base de datos
        this.conectarBD();

        //Funcionalidad del WebServer
        this.middlewares();

        //Rutas
        this.routes();
    }

    async conectarBD() {
        await DBConnection();
    }

    middlewares() {
        //Middleware para CORS
        this.app.use(cors())

        //Lectura del body
        this.app.use(express.json());


        
        this.app.use(express.static('public'));
    }


    routes() {
        //Middleware para rutas
        this.app.use(this.authRoute, require('../routes/auth'));
        this.app.use(this.userRoute, require('../routes/user'));
        this.app.use(this.personajeRoute, require('../routes/personaje'));
        this.app.use(this.claseRoute, require('../routes/clase'));
        this.app.use(this.claseEstudianteRoute, require('../routes/claseEstudiante'));
        this.app.use(this.actividadRoute, require('../routes/actividad'));
        this.app.use(this.notaRoute, require('../routes/nota'));
    }

    start() {
        this.app.listen(this.port, () => console.log(`Server corriendo en el puerto ${this.port}`));
    }
}

module.exports = {
    Server
}