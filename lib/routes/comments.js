const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Comment = require('../models/Comment');


module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      comment, 
      post
    } = req.body;

    const user = req.user;

    Comment 
      .create({ comment, commentBy: user._id, post })
      .then(comment => res.send(comment))
      .catch(next);
  });

