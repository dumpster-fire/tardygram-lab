const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const Comment = require('../lib/models/Comment');
const chance = require('chance').Chance();

module.exports = async({ users = 5, posts = 10, comments = 10 } = { users: 5, posts: 10, comments: 10 }) => {
  const createdUsers = await User.create(
    [...Array(users)].map(() => ({
      username: chance.name(),
      email: chance.email(),
      password: 'password'
    }))
  );

  const createdPosts = await Post.create(
    [...Array(posts)].map(() => ({
      username: chance.pickone(createdUsers)._id,
      photoURL: chance.url(),
      caption: chance.sentence({ word: 5 }),
      tags: [chance.hashtag(), chance.hashtag(), chance.hashtag()] 
    }))
  );

  const createdComments = await Comment.create(
    [...Array(comments)].map(() => ({
      comment: chance.sentence(),
      commentedBy: chance.pickone(createdUsers)._id,
      post: chance.pickone(createdComments)._id
    }))
  ); 

  return {
    users: createdUsers,
    posts: createdPosts,
    comments: createdComments
  };
};






