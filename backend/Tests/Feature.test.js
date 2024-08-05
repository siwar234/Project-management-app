const request = require('supertest');
const mongose = require('mongoose');
const { app } = require('../server');
const Feature = require('../models/Features');
const Ticket = require('../models/Tickets');
const Task = require('../models/Tasks');
const Project = require('../models/Project');
const Equipe = require('../models/Equipe');
const User = require('../models/User'); 

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
describe('Feature Controller', () => {


  const mockFeatureId = new mongose.Types.ObjectId("605c72efc8d3b0004a9b0f64");
  // const mockTaskId = "66b0b337e9db004702642e8b";

  const mockProjectId = "605c72efc8d3b0004a9b0c08";
  const mockTicketId = "66b0b02e6183b8b305ac6402";

  

  it('should retrieve features by project ID', async () => {



    const featureData = new Feature({
      _id: mockFeatureId,
      titleF: ' Test Feature',
      startDate: '2024-07-01T00:00:00Z',
      endDate: '2024-07-15T00:00:00Z',
      projectId: mockProjectId
    });
    await featureData.save();

    await Feature.findByIdAndUpdate(mockFeatureId, { $push: { Tickets: mockTicketId } });

    const getFeaturesResponse = await request(app)
      .get(`/api/feature/getlistfeatures/${mockProjectId}`);

    console.log('Response Body:', getFeaturesResponse.body);

    expect(getFeaturesResponse.status).toBe(200);
    expect(getFeaturesResponse.body).toBeInstanceOf(Array);
    // expect(getFeaturesResponse.body.length).toBeGreaterThan(0);
    expect(getFeaturesResponse.body[0]).toHaveProperty('_id');
    expect(getFeaturesResponse.body[0].titleF).toBe('Test Feature');
    expect(getFeaturesResponse.body[0].Tickets[0]._id.toString()).toBe(mockTicketId.toString());
  });

  it('should update a feature by ID', async () => {
  


 

    const updatedFeatureData = {
      titleF: 'Updated Feature Title',
      startDate: '2024-07-05T00:00:00Z',
      endDate: '2024-07-20T00:00:00Z'
    };

    const updateResponse = await request(app)
      .put(`/api/feature/updatefeature/605c72efc8d3b0004a9b0f64`)
      .send(updatedFeatureData);

    console.log('Response Body:', updateResponse.body);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.updatedFeature).toHaveProperty('_id');
    expect(updateResponse.body.updatedFeature.titleF).toBe('Updated Feature Title');
    expect(updateResponse.body.updatedFeature.startDate).toBe('2024-07-05T00:00:00.000Z');
    expect(updateResponse.body.updatedFeature.endDate).toBe('2024-07-20T00:00:00.000Z');
  });

});
