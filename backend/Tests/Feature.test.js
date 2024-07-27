const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../server');
const Feature = require('../models/Features');
const Ticket = require('../models/Tickets');
const Task = require('../models/Tasks');

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

describe('Feature Controller', () => {
  const mockProjectId = new mongoose.Types.ObjectId("605c72efc8d3b0004a9b0c08");
  const mockFeatureId = new mongoose.Types.ObjectId("66a2c0f495eb2255304032e2");
  const mockTicketId = new mongoose.Types.ObjectId("66a2c06d20191d91ba6aef62");
  const mockTaskId = new mongoose.Types.ObjectId("66a2c0c395eb2255304032e1");

//   it('should create a new feature', async () => {
//     const featureData = {
//       titleF: 'Test Feature',
//       startDate: '2024-07-01T00:00:00Z',
//       endDate: '2024-07-15T00:00:00Z',
//       projectId: mockProjectId.toString()
//     };

//     const createResponse = await request(app)
//       .post('/api/features/create')
//       .send(featureData);

//     console.log('Response Body:', createResponse.body);

//     expect(createResponse.status).toBe(201);
//     expect(createResponse.body).toHaveProperty('_id');
//     expect(createResponse.body.titleF).toBe('Test Feature');
//     expect(createResponse.body.startDate).toBe('2024-07-01T00:00:00.000Z');
//     expect(createResponse.body.endDate).toBe('2024-07-15T00:00:00.000Z');
//     expect(createResponse.body.projectId).toBe(mockProjectId.toString());
//   });

  it('should retrieve features by project ID', async () => {
    const featureData = {
      _id: mockFeatureId,
      titleF: 'Test Feature',
      startDate: '2024-07-01T00:00:00Z',
      endDate: '2024-07-15T00:00:00Z',
      projectId: mockProjectId
    };

    await new Feature(featureData).save();

    const ticketData = {
      _id: mockTicketId,
      Description: 'Test Ticket',
      Priority: 'High',
      flag: true,
      Etat: 'To Do',
      TaskId: mockTaskId,
      ResponsibleTicket: '66a2964cbbafb03300e01c9a',
      projectId: mockProjectId,
      Type: 'Bug',
      Feature: mockFeatureId
    };

    await new Ticket(ticketData).save();
    await Task.findByIdAndUpdate(mockTaskId, { $push: { tickets: mockTicketId } });


    await Feature.findByIdAndUpdate(mockFeatureId, { $push: { Tickets: mockTicketId } });

    const getFeaturesResponse = await request(app)
      .get(`/api/feature/getlistfeatures/${mockProjectId}`);

    console.log('Response Body:', getFeaturesResponse.body);

    expect(getFeaturesResponse.status).toBe(200);
    expect(getFeaturesResponse.body).toBeInstanceOf(Array);
    expect(getFeaturesResponse.body.length).toBeGreaterThan(0);
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
      .put(`/api/feature/updatefeature/${mockFeatureId}`)
      .send(updatedFeatureData);

    console.log('Response Body:', updateResponse.body);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.updatedFeature).toHaveProperty('_id');
    expect(updateResponse.body.updatedFeature.titleF).toBe('Updated Feature Title');
    expect(updateResponse.body.updatedFeature.startDate).toBe('2024-07-05T00:00:00.000Z');
    expect(updateResponse.body.updatedFeature.endDate).toBe('2024-07-20T00:00:00.000Z');
  });

  // Add other tests as needed
});
