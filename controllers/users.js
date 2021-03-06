const User = require('../models/users');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

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

        if (user) {
            return res.status(400).json({
                status: false,
                msg: 'El usuario ya existe',
            })
        }

        // Crear el nuevo usuario
        user = new User(req.body);

        // Hash el password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        // Guardar usuario;
        await user.save();

        // Crear y Firma el JWT
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