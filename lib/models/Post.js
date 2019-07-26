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

postSchema.statics.popular = function(n = 10) {
  return this.aggregate([
    {
      '$lookup': {
        'from': 'comments', 
        'localField': '_id', 
        'foreignField': 'post', 
        'as': 'comments'
      }
    }, {
      '$unwind': {
        'path': '$comments'
      }
    }, {
      '$project': {
        '_id': true, 
        'comments': true
      }
    }, {
      '$group': {
        '_id': '$_id', 
        'comments': {
          '$sum': 1
        }
      }
    }, {
      '$sort': {
        'comments': -1
      }
    }, {
      '$limit': n
    }
  ]);
};


module.exports = mongoose.model('Post', postSchema);


