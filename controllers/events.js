const { response } = require('express');
const Event = require('../models/Event');

const getEvent = async (req, res = response) => {
  const eventID = req.params.id;
  try {
    if (!eventID) {
      return res.status(400).json({
        ok: false,
        msg: 'No hay id',
      });
    }
    const event = await Event.findById(eventID).populate('user', 'name');
    return res.json({
      ok: true,
      event,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'contacte con el administrador',
    });
  }
};

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate('user', 'name');
  res.json({ ok: true, events });
};
const createEvent = async (req, res = response) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const saveEvent = await event.save();
    return res.json({
      ok: true,
      event: saveEvent,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventID = req.params.id;
  try {
    const event = await Event.findById(eventID);
    if (!event) {
      res.status(404).json({
        ok: false,
        msg: 'ID no encontrada',
      });
    }
    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: 'no tiene permitido editar este evento',
      });
    }
    const newEvent = {
      ...req.body,
      user: req.uid,
    };
    const eventUpdated = await Event.findByIdAndUpdate(eventID, newEvent, {
      new: true,
    });
    return res.json({
      ok: true,
      event: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventID = req.params.id;
  try {
    const event = await Event.findById(eventID);
    if (!event) {
      return res.status(404).json({
        ok: true,
        msg: 'no existe un evento con esa id',
      });
    }
    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: 'no tiene permitido editar este evento',
      });
    }
    await Event.findByIdAndRemove(eventID);
    return res.json({
      ok: true,
      msg: `evento con id ${eventID} eliminado`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

module.exports = {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
