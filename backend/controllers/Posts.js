 const Post = require('../models/Posts');
 const Communication = require('../models/CommunicationSpace'); 




 exports.createPost = async (req, res) => {
  const { taskId, posterId, postText, images } = req.body;

  try {
    const pdfPath = req.file ? req.file.path : null;
    console.log('Uploaded PDF Path:', pdfPath);

    const newPost = new Post({
      postText: postText,
      taskId: taskId,
      poster: posterId,
      images: images || [],
      pdf: pdfPath ,
    });

    const savedPost = await newPost.save();

    const communicationSpace = await Communication.findOneAndUpdate(
      { Task: taskId },
      { $push: { posts: savedPost._id } },
      { new: true }
    );

    if (!communicationSpace) {
      return res.status(404).json({ error: 'Communication space not found' });
    }

    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Error creating post' });
  }
};




// Delete post
exports.deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await Communication.findOneAndUpdate(
      { Task: post.taskId },
      { $pull: { posts: postId } }
    );

    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Error deleting post' });
  }
};





  exports.getPostsByTaskId = async (req, res) => {
    const { taskId } = req.params;
  
    try {
      const posts = await Post.find({ taskId: taskId })
        .populate({
          path: 'poster',
          model: 'User',
          select: 'firstName profilePicture',
        })
        .populate({
          path: 'comments.postedBy',
          model: 'User',
          select: 'firstName profilePicture',
        })
        .sort({ _id: -1 }) 
        .exec();
  
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts by taskId:', error);
      res.status(500).json({ error: 'Error fetching posts by taskId' });
    }
  };
  

// Create a comment

exports.createComment = async (req, res) => {
    const { postId, commenterId, commentText } = req.body;
  
    try {
      const comment = { text: commentText, postedBy: commenterId, postId };
  
      // Add the comment to the post and retrieve the updated post with populated comments
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: comment } },
        { new: true }
      ).populate('comments.postedBy');
  
      res.status(201).json(updatedPost);
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Error creating comment' });
    }
  };


exports.deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    ).populate('comments.postedBy');

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Error deleting comment' });
  }
};

  
  exports.getCommentsByPostId = async (req, res) => {
    const { postId } = req.params;
  
    try {
      const post = await Post.findById(postId)
        .populate('comments.postedBy')
        .sort({ 'comments.createdAt': -1 });
  
      res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'Error fetching comments' });
    }
  };
  