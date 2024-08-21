const request = require('supertest');
const mongose = require('mongoose');
const { app } = require('../server');
const Post = require('../models/Posts');
const Communication = require('../models/CommunicationSpace');
jest.setTimeout(100000); // Set the timeout to 10000ms (10 seconds) or any suitable duration



beforeAll(async () => {
    if (mongose.connection.readyState === 0) {
      await mongose.connect(process.env.URL_TEST,
        
      );
      
    }
  });
  
  afterAll(async () => {
    // Drop the test database if configured to do so
    if (process.env.DROP_DB_AFTER_TESTS === 'true') {
      await mongose.connection.db.dropDatabase();
      console.log('Dropped Test Database');
    }
  
    // Disconnect from the test database
    await mongose.disconnect();
    console.log('Disconnected from Test Database');
  
    await new Promise(resolve => setTimeout(resolve, 1000));

  });

beforeEach(() => {
  jest.clearAllMocks();
});
  

describe('Post Controller', () => {
  const mockTaskId = "66b0d368ecb9a7195dc05fdb";
  const mockPosterId = "66b0d15ffdbbff40fcf5dbdd";
  const mockPostId = new mongose.Types.ObjectId();
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


    expect(getPostsResponse.status).toBe(200);
    expect(getPostsResponse.body).toBeInstanceOf(Array);
    expect(getPostsResponse.body.length).toBeGreaterThan(0);
    expect(getPostsResponse.body[0]).toHaveProperty('_id');
    expect(getPostsResponse.body[0].postText).toBe('Test Post');
  });




 

  it('should retrieve comments by post ID', async () => {
    const mockPostid = new mongose.Types.ObjectId();

    
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


    expect(getCommentsResponse.status).toBe(200);
    expect(getCommentsResponse.body).toHaveProperty('_id');
    expect(getCommentsResponse.body.comments.length).toBeGreaterThan(0);
    expect(getCommentsResponse.body.comments[0].text).toBe('Test Comment');
  });

 
  
});
