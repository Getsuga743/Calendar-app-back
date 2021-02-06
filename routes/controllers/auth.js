/* eslint-disable no-unused-vars */
const { response } = require('express');
const { validationResult } = require('express-validator');
const userCreate = (req, res = response) => {
  const { name, email, password } = req.body;

  // error handle
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  res.json({
    ok: true,
    msg: 'register',
    user: { name, email, password },
  });
};

const userLogin = (req, res = response) => {
  const { name, email, password } = req.body;
  res.json({
    ok: true,
    msg: 'login',
    user: { name, email, password },
  });
};

const renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'login',
  });
};
module.exports = { userCreate, userLogin, renewToken };
