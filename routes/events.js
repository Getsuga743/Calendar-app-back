const { Router } = require('express');
const { check } = require('express-validator');
const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const validateFields = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();
// Obtener eventos
// Validar con el token
router.use(validateJWT);

router.get('/', getEvents);

router.get('/:id', getEvent);
// Crear un nuevo evento
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validateFields,
  ],
  createEvent,
);
// Actualizar Evento
router.put('/:id', updateEvent);
// Borrar evento

router.delete('/:id', deleteEvent);

module.exports = router;
