const User = require('../models/users');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {

    // Revisar si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    // Extraer email y password
    const { email, password } = req.body;

    try {
        // Revisar si ya existe el usuario o no.
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: false,
                msg: 'El usuario no existe',
            })
        }

        const validPass = await bcryptjs.compare(password, user.password);

        if(!validPass) {
            return res.status(400).json({
                status: false,
                msg: 'Contraseña incorrecta',
            })
        }

        // Revisar si todo es correctp Crear y Firma el JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        // Firmar el JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;

            // Mensaje de confirmación
            res.status(200).json({
                status: true,
                token: token,
            });
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: 'Hubo un error',
        });
        process.exit(1);
    }
}
