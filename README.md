<p align="center" style="padding: 20px; background: #252832">
    <img src="
https://github.com/SebastianWilches/VIRTUS_Gamificacion_Backend/blob/master/Documentacion/Banner.png" alt="Banner VirtusBack">
</p>

# Objetivo
Crear un prototipo inicial del aplicativo web, con la finalidad de integrar el proceso de aprendizaje en los estudiantes junto al ambiente cotidiano, el cual se refiere al juego. Ofreciendo una herramienta de gamificación que permita incidir tanto en la motivación como en la inmersión en procesos académicos. 

# Instalación
Descargue el repositorio del proyecto en su directorio local:
```
git clone https://github.com/SebastianWilches/VIRTUS_Gamificacion_Backend.git
```
Abra su terminal en proyecto local, y ejecute:
```
npm i
```
Modifique el archivo `.env` el cual contiene las variables de entorno
```
PORT = 8080
Conexion_MONGODB_ATLAS = "mongodb+srv://USER:PASSWORD@virtus-gamificacion-bd.gorch.mongodb.net/VirtusBD"
FIRMAJWT = GRUPOVIRTUS2022
```
Para abrir el proyecto en modo de desarrollo, ejecute en la terminal:
```
nodemon index.js
```
El servidor se recargará cuando se efectuen cambios.\

#### Nota
Toda los servicios que estan disponibles con este servidor se podran consumir desde el Frontend que lo encuentra [aquí](https://github.com/SebastianWilches/VIRTUS_Gamificacion_Frontend)

# Documentación

#### Servicios REST
Todos los servicios de esta REST API los encontrará en la documentación generada por Postman, que la puede encontrar [aquí](https://documenter.getpostman.com/view/20804832/Uze1x5Ae)

#### Tecnologías Backend
- Node
- Postman
- MongoDB
#### Dependencias
- bcryptjs
- cors
- dotenv
- express
- express-validator
- jsonwebtoken
- mongoose
