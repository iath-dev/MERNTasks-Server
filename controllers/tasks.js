const Task = require('../models/tasks');
const Project = require('../models/projects');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res) => {

    // Revisar si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(500).json({
            status: false,
            errors: errors.array()
        })
    }

    // Extraer y verificar si existe el proyecto

    const { pid } = req.body;

    try {

        const project = await Project.findById(pid);

        if(!project) {
            return res.status(404).json({
                state: false,
                msg: 'No se a encontrado el proyecto'
            });
        }

        // Verificar el creador
        
        if(project.uid.toString() !== req.user.id) {
            res.status(500).json({
                status: false,
                msg: 'Acceso denegado'
            });
        }

        // Creando la tarea
        const task = new Task(req.body);

        task.uid = req.user.id;
        await task.save();
        res.status(200).json({
            status: true,
            task,
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            state: false,
            msg: 'Hubo un error',
        })
    }
}

// Obtener tareas
exports.getTasks = async (req, res) => {
    try {
        const { pid } = req.body;

        const project = await Project.findById(pid);

        if(!project) {
            return res.status(404).json({
                state: false,
                msg: 'No se a encontrado el proyecto'
            });
        }

        // Verificar el creador
        
        if(project.uid.toString() !== req.user.id) {
            res.status(500).json({
                status: false,
                msg: 'Acceso denegado'
            });
        }

        const tasks = await Task.find({ pid: pid })
        res.status(200).json({
            tasks
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            state: false,
            msg: 'Hubo un error',
        })
    }
}

exports.updateTask = async (req, res) => {
    
}
