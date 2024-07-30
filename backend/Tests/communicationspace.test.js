const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Communication = require('../models/CommunicationSpace');


beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.URL_TEST, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log('Connected to Test Database:', process.env.URL_TEST);
  }
});

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

describe('CommunicationSpace Controller', () => {
  const mockProjectId = new mongoose.Types.ObjectId("605c72efc8d3b0004a9b0c08");
  const mockTaskId = new mongoose.Types.ObjectId("66a2c0c395eb2255304032e1");
  const mockcomunicationid = new mongoose.Types.ObjectId("66a2c0c395eb2255304032d5");


  
//   it('should create a new communication space', async () => {
//     const communicationSpaceData = {
//       Task: mockTaskId.toString(),
//       Disscusionspace: 'Test Discussion',
//       Privacy: 'Public',
//       projectId: mockProjectId.toString()
//     };

//     const createResponse = await request(app)
//       .post('/api/communicationspace/create')
//       .send(communicationSpaceData);

//     console.log('Response Body:', createResponse.body);

//     expect(createResponse.status).toBe(201);
//     expect(createResponse.body).toHaveProperty('_id');
//     expect(createResponse.body.Task).toBe(mockTaskId.toString());
//     expect(createResponse.body.Disscusionspace).toBe('Test Discussion');
//     expect(createResponse.body.Privacy).toBe('Public');
//     expect(createResponse.body.projectId).toBe(mockProjectId.toString());
//   });

  it('should retrieve communication spaces by project ID', async () => {
      jest.setTimeout(20000); // Set timeout to 20 seconds for this test

    const communicationSpaceData = {
       _id: mockcomunicationid,
      Task: mockTaskId,
      Disscusionspace: 'Test Discussion',
      Privacy: 'Public',
      projectId: mockProjectId
    };

    await new Communication(communicationSpaceData).save();

    const getCommunicationSpacesResponse = await request(app)
      .get(`/api/communicationspace/project/${mockProjectId}`);

    console.log('Response Body:', getCommunicationSpacesResponse.body);

    expect(getCommunicationSpacesResponse.status).toBe(200);
    expect(getCommunicationSpacesResponse.body).toBeInstanceOf(Array);
    expect(getCommunicationSpacesResponse.body.length).toBeGreaterThan(0);
    expect(getCommunicationSpacesResponse.body[0]).toHaveProperty('_id');
    expect(getCommunicationSpacesResponse.body[0].Disscusionspace).toBe('Test Discussion');
    expect(getCommunicationSpacesResponse.body[0].Privacy).toBe('Public');
    expect(getCommunicationSpacesResponse.body[0].projectId._id.toString()).toBe(mockProjectId.toString());
  });

  // Add other tests as needed
});
