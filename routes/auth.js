// Rutas para autentificar usuarios
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { check } = require('express-validator');

// Crear un usuario
// /api/users
router.post('/',
    [
        check('email', "Agrega un email valido").isEmail(),
        check('password', "El password debe de ser mínimo de 6 caracteres").isLength({ min: 6 })
    ],
    authController.authUser
);

module.exports = router;
