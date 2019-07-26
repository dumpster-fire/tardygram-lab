const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  commentBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true   
  }
});
commentSchema.statics.popularPosts = function(n = 10) {
  return this.aggregate([
    {
      '$group': {
        '_id': '$post', 
        'commentCount': {
          '$sum': 1
        }
      }
    }, {
      '$sort': {
        'commentCount': -1
      }
    }, {
      '$limit': n
    }
  ]);

};


module.exports = mongoose.model('Comment', commentSchema);

