/* Rutas de Usuarios / Auth
  host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { userCreate, userLogin, renewToken } = require('./controllers/auth');

const router = Router();

router.post('/new', [check('name', 'El nombre es obligatorio').not().isEmpty()], userCreate);

router.post('/', userLogin);

router.get('/renew', renewToken);

module.exports = router;
