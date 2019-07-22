const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      username,
      email,
      password
    } = req.body;

    User
      .create({ username, email, password })
      .then(user => {
        const token = user.authToken();
        res.cookie('session', token);
        res.send(user);
      })
      .catch(next);
  });
