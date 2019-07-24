const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

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

  .get('/', ensureAuth, (req, res, next) => {
    Post
      .find()
      .then(posts => res.send(posts))
      .catch(next);
  })

  .get('/:id', ensureAuth, (req, res, next) => {
    Promise.all([
      Post
        .findById(req.params.id)
        .populate('user', { __v: false }),
      Comment
        .find({ post: req.params.id })
        .populate('user', { __v: false })
    ])
      .then(([post, comment]) => res.send({ ...post.toJSON(), comment }))
      .catch(next);
  });


