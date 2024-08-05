const request = require('supertest');
const mongose = require('mongoose');
const { app } = require('../server');
const Post = require('../models/Posts');
const Communication = require('../models/CommunicationSpace');
jest.setTimeout(100000); // Set the timeout to 10000ms (10 seconds) or any suitable duration


mongose.connect(process.env.URL_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
    // console.log(err);
  });
  
  beforeAll(async () => {
    if (mongose.connection.readyState === 0) {
      await mongose.connect(process.env.URL_TEST);
      // console.log('Connected to Test Database:', process.env.URL_TEST);
    }
  });
  
  afterAll(async () => {
    if ( process.env.DROP_DB_AFTER_TESTS === 'true') {
      await mongose.connection.db.dropDatabase();
      // console.log('Dropped Test Database');
    }
    await mongose.disconnect();
    // console.log('Disconnected from Test Database');
  });
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
describe('Post Controller', () => {
  const mockTaskId = "66b0d368ecb9a7195dc05fdb";
  const mockPosterId = "66b0d15ffdbbff40fcf5dbdd";
  const mockPostId = new mongose.Types.ObjectId("66a2c06d20191d91ba6aef64");
  const mockCommentId = new mongose.Types.ObjectId("66a2964cbbafb03300e01c9a");


 
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

//   it('should delete a post', async () => {
    

//     const deleteResponse = await request(app)
//       .delete(`/api/communicationspace/posts/${mockPostId}`);

//     console.log('Response Body:', deleteResponse.body);

//     expect(deleteResponse.status).toBe(200);
//     expect(deleteResponse.body).toHaveProperty('message', 'Post deleted successfully');
//   });


 

  it('should retrieve comments by post ID', async () => {
    jest.setTimeout(20000); 
    const mockPostid = new mongose.Types.ObjectId("66a2c06d20191d91ba6aef62");

    
    const post = new Post({
      _id: mockPostid,
      postText: 'Test Post',
      taskId: mockTaskId,
      poster: mockPosterId,
      images: [],
      comments: [{ _id: mockCommentId, text: 'Test Comment', postedBy: mockPosterId }]
    });

    await post.save();

    await Communication.findOneAndUpdate(
        { Task: mockTaskId },
        { $push: { posts: mockPostid } },
        { new: true }
      );
  

    const getCommentsResponse = await request(app)
      .get(`/api/communicationspace/comments/byPostId/${mockPostid}`);

    console.log('Response Body:', getCommentsResponse.body);

    expect(getCommentsResponse.status).toBe(200);
    expect(getCommentsResponse.body).toHaveProperty('_id');
    expect(getCommentsResponse.body.comments.length).toBeGreaterThan(0);
    expect(getCommentsResponse.body.comments[0].text).toBe('Test Comment');
  });

  it('should delete a comment', async () => {


    const deleteCommentResponse = await request(app)
      .delete(`/api/communicationspace/comments/66a2c06d20191d91ba6aef62/${mockCommentId}`);

    console.log('Response Body:', deleteCommentResponse.body);

    expect(deleteCommentResponse.status).toBe(200);
    expect(deleteCommentResponse.body).toHaveProperty('_id');
    expect(deleteCommentResponse.body.comments.length).toBe(0);
  });

});
