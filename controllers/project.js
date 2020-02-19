const Project = require('../models/projects');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {

    // Revisar si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(500).json({
            status: false,
            errors: errors.array()
        })
    }


    try {
        // Crear el documento
        let project = new Project(req.body);

        // Guardar el creador via JWT
        project.uid = req.user.id;

        // Guardar usuario;
        await project.save();

        res.json(project);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'Hubo un error',
        });
        process.exit(1);
    }
}

// Obtiene todos los proyectos
exports.getProjects = async (req, res) => {
    // Revisar si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(500).json({
            errors: errors.array()
        })
    }

    try {
        const { user } = req;
        const projects = await Project.find({ uid: user.id });
        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'Hubo un error'
        })
    }
}

exports.updateProject = async (req, res) => {
    // Revisar si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(500).json({
            errors: errors.array()
        })
    }

    const { title } = req.body;
    const update = {}

    if (title) {
        update.title = title;
    }

    try {
        // Revisar el ID
        const { id } = req.params;
        let project = await Project.findById(id);


        // Ver si el proyecto existe o no
        if(!project) {
            return res.status(500).json({
                status: false,
                msg: 'Documento no encontrado'
            })
        }

        // Verificar el creador
        
        if(project.uid.toString() !== req.user.id) {
            res.status(500).json({
                status: false,
                msg: 'Acceso denegado'
            })
        }
        
        // Actualizar
        project = await Project.findByIdAndUpdate({ _id: id }, { $set: update }, { new: true });
        res.status(200).json({
            status: true,
            data: project,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'Hubo un error'
        })
    }
}

exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        let project = await Project.findById(id);

        // Ver si el proyecto existe o no
        if(!project) {
            return res.status(500).json({
                status: false,
                msg: 'Documento no encontrado'
            })
        }

        // Verificar el creador
        
        if(project.uid.toString() !== req.user.id) {
            res.status(500).json({
                status: false,
                msg: 'Acceso denegado'
            })
        }

        // Eliminar al proyecto
        await Project.findOneAndRemove({ _id: id });

        res.status(200).json({
            status: true,
            msg: 'Documento eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'Hubo un error'
        })
    }
}
