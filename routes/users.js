// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const { check } = require('express-validator');

// Crear un usuario
// /api/users
router.post('/',
    [
        check('name', "El usuario es obligatorio").not().isEmpty(),
        check('email', "Agrega un email valido").isEmail(),
        check('password', "El password debe de ser mínimo de 6 caracteres").isLength({ min: 6 })
    ],
    userController.createUser
);

module.exports = router;
