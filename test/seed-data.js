const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const Comment = require('../lib/models/Comment');
const chance = require('chance').Chance();

module.exports = async({ users = 15, posts = 30, comments = 100 } = { users: 15, posts: 30, comments: 100   }) => {
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
      tags: [chance.hashtag(), chance.hashtag(), chance.hashtag()],
      // comments: chance.sentence()
    }))
  );

  const createdComments = await Comment.create(
    [...Array(comments)].map(() => ({
      comment: chance.sentence(),
      commentBy: chance.pickone(createdUsers)._id,
      post: chance.pickone(createdPosts)._id
        // createdPosts[0]._id
    }))
  ); 

  return {
    users: createdUsers,
    posts: createdPosts,
    comments: createdComments
  };
};






