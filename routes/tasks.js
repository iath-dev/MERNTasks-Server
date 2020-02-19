// Rutas para tareas
const express = require('express');
const router = express.Router();
const TasksController = require('../controllers/tasks');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// Crear una Tarea
// /api/tasks
router.post('/',
    auth,
    [
        check('name', "El nombre de la tarea es obligatorio").not().isEmpty()
    ],
    TasksController.createTask
);

router.get('/',
    auth,
    TasksController.getTasks
);

// Actualizar la tarea
router.put('/:id',
    auth,
    TasksController.updateTask
);

// Eliminar la tarea
router.delete('/:id',
    auth,
    TasksController.deleteTasks
);

module.exports = router;
