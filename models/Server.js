//HTTP
const cors = require('cors')
const express = require('express');
const { DBConnection } = require('../database/configDB');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userRoute = '/api/users';

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
        this.app.use(this.userRoute, require('../routes/user'));
    }

    start() {
        this.app.listen(this.port, () => console.log(`Server corriendo en el puerto ${this.port}`));
    }
}

module.exports = {
    Server
}