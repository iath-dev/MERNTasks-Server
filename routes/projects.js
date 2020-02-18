// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/project');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// Crear un proyecto
// /api/projects
router.post('/',
    auth,
    [
        check('title', "El nombre del proyecto es obligatorio").not().isEmpty()
    ],
    ProjectController.createProject
);

router.get('/',
    auth,
    [
        check('title', "El nombre del proyecto es obligatorio").not().isEmpty()
    ],
    ProjectController.createProject
);

module.exports = router;
