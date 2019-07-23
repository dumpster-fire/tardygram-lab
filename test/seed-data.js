const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const chance = require('chance').Chance();

module.exports = async({ users = 5, posts = 10 } = { users: 5, posts: 10 }) => {
  const createdUsers = await User.create(
    [...Array(users)].map(() => ({
      username: chance.name(),
      email: chance.email(),
      password: 'password'
    }))
  );

  const createdPosts = await Post.create(
    [...Array(posts)].map(() => ({
      user: chance.pickone(createdUsers)._id,
      photoURL: chance.url(),
      caption: chance.sentence({ word: 5 }),
      tags: [chance.hashtag({ hashtag: 3 })] //? array
    }))
  );

  return {
    users: createdUsers,
    posts: createdPosts
  };
};






  //const createComments = await Comment.create(
    //comment: chance.sentence(),
 // )
