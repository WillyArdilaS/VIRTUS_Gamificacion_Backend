const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.FIRMAJWT, {
            expiresIn: '20d', //Expirara en 20 dias
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo crear el JWT');
            }
            else {
                resolve(token);
            }
        })
    })

}

module.exports = {
    generarJWT
}