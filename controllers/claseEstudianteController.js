const { response, request } = require("express")

const ClaseEstudiante = require('../models/Usuario_Clase');
const Clase = require('../models/Clase'); //Este modelo lo necesito para filtrar las clases por ID de estudiante

const claseEstudiantePOST = async (req = request, res = response) => {
    const { usuarioEstudianteFK, claseFK } = req.body;

    const claseEstudiante = new ClaseEstudiante({ usuarioEstudianteFK, claseFK });

    //Guardamos en BD
    await claseEstudiante.save();

    res.status(201).json({
        msg: 'Post API - Se unió a una clase',
        claseEstudiante,
    })
}

const claseEstudianteGET = async (req = request, res = response) => {
    const { idEstudiante } = req.body;

    //Obtenemos los registros filtrados de la tabla de rompimiento
    const [contarClases, clasesBD] = await Promise.all([
        ClaseEstudiante.countDocuments(idEstudiante),
        ClaseEstudiante.find({ "usuarioEstudianteFK": idEstudiante })
    ])

    //Filtramos todos los códigos de las clases a los que pertenece el estudiante
    const IDClase = [];
    for (let i = 0; i < clasesBD.length; i++) {

        let aux = JSON.stringify(clasesBD[i].claseFK) //Pasamos a string
        aux = aux.replace(/["']/g, ""); //Le quitamos los ""
        IDClase.push(aux);

    }
    // console.log("ID de las clases",IDClase);
    
    // const uniqueIDClase = [ ... new Set(IDClase)];
    // console.log(uniqueIDClase);

    // Traemos toda la info de estas clases
    const [contarInfoClases, infoClasesBD] = await Promise.all([
        Clase.countDocuments(IDClase),
        Clase.find({ "_id": IDClase })
    ]);
    // console.log("INFO de las clases", infoClasesBD);



    res.status(200).json({
        msg: 'Get API',
        contarClases,
        infoClasesBD,
        clasesBD
    })
}


module.exports = {
    claseEstudiantePOST,
    claseEstudianteGET
}