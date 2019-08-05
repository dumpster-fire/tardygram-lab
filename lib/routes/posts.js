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

  .get('/popular', (req, res, next) => {
    const { count = 10 } = req.query;
    Post
      .popular(count)
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
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    Post
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedPost => res.send(updatedPost))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Post
      .findByIdAndDelete(req.params.id)
      .then(post => res.send(post))
      .catch(next);
  });


