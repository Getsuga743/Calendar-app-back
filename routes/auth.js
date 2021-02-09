/* Rutas de Usuarios / Auth
  host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const validateFields = require('../middlewares/validate-fields');
const { userCreate, userLogin, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatiorio').isEmail(),
    check('password', 'El password debe de ser de 5 caracteres').isLength({
      min: 6,
    }),
    validateFields,
  ],
  userCreate,
);

router.post(
  '/',
  [
    check('email', 'el email es obligatiorio').isEmail(),
    check('password', 'El password debe de ser de 5 caracteres').isLength({
      min: 6,
    }),
    validateFields,
  ],
  userLogin,
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
