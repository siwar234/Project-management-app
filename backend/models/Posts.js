const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
    postText: {
    type: String,
    // required: true,
    trim: true,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tasks',
    required: true,
  },

  
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },

  pdf: { type: String },

  images: [{
    type: String,
    trim: true,
  }],

  comments: [
    {
      text: String,
      postedBy: { type: ObjectId, ref: 'User' },
      postId: { type: ObjectId, ref: 'Post' } 
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
