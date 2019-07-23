const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Post = require('../models/Post');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      photoURL,
      caption,
      tags
    } = req.body;
    const user = req.user;

    Post
      .create({ username: user._id, photoURL, caption, tags })
      .then(post => res.send(post))
      .catch(next);
  })
;
