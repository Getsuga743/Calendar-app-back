const express = require('express');
require('dotenv').config();

// Crear Server
const app = express();

// Directorio Public
app.use(express.static('public'));

// Lectura y parseo del body

app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
