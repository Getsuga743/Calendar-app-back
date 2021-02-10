const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// Crear Server
const app = express();

// Base de Datos
dbConnection();

// CORS

app.use(cors());

// Directorio Public
app.use(express.static('public'));

// Lectura y parseo del body

app.use(express.json());

// Rutas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

const port = process.env.PORT || process.env.LOCAL_PORT;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
