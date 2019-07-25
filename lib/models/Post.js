const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  photoURL: {
    type: String,
    required: true
  },
  caption: String,
  tags: [String]
});

postSchema.statics.popularPosts = function(n = 10) {
  return this.aggregate([
    [{ '$group': { '_id': '$post', 'totalComments': { '$sum': 1 } } },
      { '$sort': { 'totalComments': -1 } }, 
      { '$limit': n }]
  ]);
};


module.exports = mongoose.model('Post', postSchema);


