const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../server');
const Post = require('../models/Posts');
const Communication = require('../models/CommunicationSpace');


// beforeAll(async () => {
//   if (mongoose.connection.readyState === 0) {
//     await mongoose.connect(process.env.URL_TEST, {
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,
//     });
//     console.log('Connected to Test Database:', process.env.URL_TEST);
//   }
// });

afterAll(async () => {
  if (process.env.NODE_ENV === 'test' && process.env.DROP_DB_AFTER_TESTS === 'true') {
    await mongoose.connection.db.dropDatabase();
    console.log('Dropped Test Database');
  }
  await mongoose.disconnect();
  console.log('Disconnected from Test Database');
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Post Controller', () => {
  const mockTaskId = new mongoose.Types.ObjectId("66a2c0c395eb2255304032e1");
  const mockPosterId = new mongoose.Types.ObjectId("605c72efc8d3b0004a9b0c09");
  const mockPostId = new mongoose.Types.ObjectId("66a2c06d20191d91ba6aef64");
  const mockCommentId = new mongoose.Types.ObjectId("66a2964cbbafb03300e01c9a");

  

//   it('should create a new post', async () => {
//     const postData = {
//       taskId: mockTaskId.toString(),
//       posterId: mockPosterId.toString(),
//       postText: 'Test Post',
//       images: []
//     };

//     const createResponse = await request(app)
//       .post('/api/posts/create')
//       .send(postData);

//     console.log('Response Body:', createResponse.body);

//     expect(createResponse.status).toBe(201);
//     expect(createResponse.body).toHaveProperty('_id');
//     expect(createResponse.body.taskId).toBe(mockTaskId.toString());
//     expect(createResponse.body.poster).toBe(mockPosterId.toString());
//     expect(createResponse.body.postText).toBe('Test Post');
//   });

 
it('should retrieve posts by task ID', async () => {
    const post = new Post({
      _id: mockPostId,
      postText: 'Test Post',
      taskId: mockTaskId,
      poster: mockPosterId,
      images: []
    });

    await post.save();

    await Communication.findOneAndUpdate(
      { Task: mockTaskId },
      { $push: { posts: mockPostId } },
      { new: true }
    );

    const getPostsResponse = await request(app)
      .get(`/api/communicationspace/posts/byTaskId/${mockTaskId}`);

    console.log('Response Body:', getPostsResponse.body);

    expect(getPostsResponse.status).toBe(200);
    expect(getPostsResponse.body).toBeInstanceOf(Array);
    expect(getPostsResponse.body.length).toBeGreaterThan(0);
    expect(getPostsResponse.body[0]).toHaveProperty('_id');
    expect(getPostsResponse.body[0].postText).toBe('Test Post');
  });

  it('should delete a post', async () => {
    // const post = new Post({
    //   _id: mockPostId,
    //   postText: 'Test Post',
    //   taskId: mockTaskId,
    //   poster: mockPosterId,
    //   images: []
    // });

    // await post.save();

    const deleteResponse = await request(app)
      .delete(`/api/communicationspace/posts/${mockPostId}`);

    console.log('Response Body:', deleteResponse.body);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty('message', 'Post deleted successfully');
  });


//   it('should create a new comment', async () => {
//     const commentData = {
//       postId: mockPostId.toString(),
//       commenterId: mockPosterId.toString(),
//       commentText: 'Test Comment'
//     };

//     const createCommentResponse = await request(app)
//       .post('/api/communicationspace/comment')
//       .send(commentData);

//     console.log('Response Body:', createCommentResponse.body);

//     expect(createCommentResponse.status).toBe(201);
//     expect(createCommentResponse.body).toHaveProperty('_id');
//     expect(createCommentResponse.body.comments.length).toBeGreaterThan(0);
//     expect(createCommentResponse.body.comments[0].text).toBe('Test Comment');
//   });

 

  it('should retrieve comments by post ID', async () => {

    
    const post = new Post({
      _id: mockPostId,
      postText: 'Test Post',
      taskId: mockTaskId,
      poster: mockPosterId,
      images: [],
      comments: [{ _id: mockCommentId, text: 'Test Comment', postedBy: mockPosterId }]
    });

    await post.save();

    await Communication.findOneAndUpdate(
        { Task: mockTaskId },
        { $push: { posts: mockPostId } },
        { new: true }
      );
  

    const getCommentsResponse = await request(app)
      .get(`/api/communicationspace/comments/byPostId/${mockPostId}`);

    console.log('Response Body:', getCommentsResponse.body);

    expect(getCommentsResponse.status).toBe(200);
    expect(getCommentsResponse.body).toHaveProperty('_id');
    expect(getCommentsResponse.body.comments.length).toBeGreaterThan(0);
    expect(getCommentsResponse.body.comments[0].text).toBe('Test Comment');
  });

  it('should delete a comment', async () => {
   

    const deleteCommentResponse = await request(app)
      .delete(`/api/communicationspace/comments/${mockPostId}/${mockCommentId}`);

    console.log('Response Body:', deleteCommentResponse.body);

    expect(deleteCommentResponse.status).toBe(200);
    expect(deleteCommentResponse.body).toHaveProperty('_id');
    expect(deleteCommentResponse.body.comments.length).toBe(0);
  });

});
