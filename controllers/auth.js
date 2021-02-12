/* eslint-disable no-unused-vars */
const { response } = require('express');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const userCreate = async (req, res = response) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    console.log(user);
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario existe con ese correo',
      });
    }
    user = new User(req.body);

    // Encrypt
    const salt = bcrypt.genSaltSync(11);
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    const token = await generateJWT(user.id, user.name);

    return res.status(201).json({
      ok: true,
      msg: 'register',
      user: { name, email, password },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el admistrador',
    });
  }
};

const userLogin = async (req, res = response) => {
  const { email, password } = req.body;
  // Find email
  const user = await User.findOne({ email });
  try {
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario no existe con ese correo',
      });
    }
    // Confirm Password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto',
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    return res.status(201).json({
      ok: true,
      msg: 'login',
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid, name } = req;
  const token = await generateJWT(uid, name);
  return res.json({
    ok: true,
    token,
  });
};

module.exports = { userCreate, userLogin, renewToken };
