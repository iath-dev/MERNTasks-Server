const Project = require('../models/projects');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createProject = async (req, res) => {

    // Revisar si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }


    try {
        // Revisar si ya existe el usuario o no.
        let project = new Project(req.body);

        // Guardar el creador via JWT
        project.uid = req.user.id;

        // Guardar usuario;
        await project.save();

        res.json(project);

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: 'Hubo un error',
        });
        process.exit(1);
    }
}
