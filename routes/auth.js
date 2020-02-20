// Rutas para autentificar usuarios
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// Autentificar al usuario
// /api/auth
router.post('/',
    authController.authUser
);

// Obteniendo información del usuario
router.get('/',
    auth,
    authController.authInfo,
);

module.exports = router;
