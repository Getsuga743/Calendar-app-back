const { Router } = require('express');
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();
// Obtener eventos
// Validar con el token
router.use(validateJWT);

router.get('/', getEvents);
// Crear un nuevo evento
router.post('/', createEvent);
// Actualizar Evento
router.put('/:id', updateEvent);
// Borrar evento

router.put('/:id', deleteEvent);

module.exports = router;
