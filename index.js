const express = require('express');
const connectDB = require('./config/db');

// Crear el servidor
const app = express();

// Conectar base de datos
connectDB();

// Habilitar Express.json
app.use(express.json({ extended: true }));

// Puerto de la App
const PORT = process.env.PORT || 4000;

// Definir pagina principal
/*app.get('/', (req, res) => {
    res.send('Hola Mundo');
})*/

// Importar Rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// Iniciando la App
app.listen(PORT, () => {
    console.log(`El servidor esta corriendo por el puerto ${PORT}`);
})
