const express = require('express');
const { createCommunicationSpace, getCommunicationSpacesByProjectId } = require('../controllers/communicationSpace');
const { createPost, getPostsByTaskId, createComment, getCommentsByPostId, deleteComment, deletePost } = require('../controllers/Posts');

const router = express.Router()
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../pdf'));
  },
  filename: function (req, file, cb) {
    // Generate unique filename using uuidv4
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const originalname = `${uuidv4()}-${file.originalname}`;
    cb(null, originalname);
  }
});

  const upload = multer({ storage: storage });


router.post('/create' ,createCommunicationSpace);

router.get('/project/:projectId' ,getCommunicationSpacesByProjectId);

router.post('/posts/create', upload.single('pdf'), createPost);

router.delete('/posts/:postId', deletePost);

  
router.get('/posts/byTaskId/:taskId', getPostsByTaskId);

// Routes for comments
router.post('/comments/create', createComment);
router.get('/comments/byPostId/:postId', getCommentsByPostId);

router.delete('/comments/:postId/:commentId', deleteComment);



module.exports = router;