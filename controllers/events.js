const { response } = require('express');

const getEvents = (req, res = response) => {
  res.json({ ok: true, msg: 'obtener eventos' });
};
const createEvent = (req, res = response) => {
  res.json({ ok: true, msg: 'crear eventos' });
};

const updateEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: `Evento actualizado ${req.params.id}`,
  });
};

const deleteEvent = (req, res = response) => {
  res.json({ ok: true, msg: `Eliminar Evento ${req.params.id}` });
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
