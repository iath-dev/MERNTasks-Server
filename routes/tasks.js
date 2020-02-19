// Rutas para tareas
const express = require('express');
const router = express.Router();
const TasksController = require('../controllers/tasks');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// Crear una Tarea
// /api/projects
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

router.put('/',
    auth,
    TasksController.updateTask
);

module.exports = router;
