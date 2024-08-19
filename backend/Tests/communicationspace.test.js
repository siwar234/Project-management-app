const request = require('supertest');
const mongose = require('mongoose');
const {app }= require('../server');
const Communication = require('../models/CommunicationSpace');
jest.setTimeout(100000); // Set the timeout to 10000ms (10 seconds) or any suitable duration




beforeAll(async () => {
  if (mongose.connection.readyState === 0) {
    await mongose.connect(process.env.URL_TEST, {
      // Removed deprecated options
    });
    console.log('Connected to Test Database:', process.env.URL_TEST);
  }
});

afterAll(async () => {
  if (process.env.DROP_DB_AFTER_TESTS === 'true') {
    await mongose.connection.db.dropDatabase();
    console.log('Dropped Test Database');
  }
  await mongose.disconnect();
  console.log('Disconnected from Test Database');
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('CommunicationSpace Controller', () => {
    // const mockProjectId = new mongose.Types.ObjectId();
    const mockTaskId = new mongose.Types.ObjectId();
    const mockCommunicationId = new mongose.Types.ObjectId();

    it('should retrieve communication spaces by project ID', async () => {
        const mockProjectId = "605c72efc8d3b0004a9b0c08" 

        const communicationSpaceData = {
            _id: mockCommunicationId,
            Task: mockTaskId,
            Disscusionspace: 'Test Discussion',
            Privacy: 'Public',
            projectId: mockProjectId
        };

        await new Communication(communicationSpaceData).save();

        const getCommunicationSpacesResponse = await request(app)
            .get(`/api/communicationspace/project/605c72efc8d3b0004a9b0c08`);

        console.log('Response Body:', getCommunicationSpacesResponse.body);

        expect(getCommunicationSpacesResponse.status).toBe(200);
        expect(getCommunicationSpacesResponse.body).toBeInstanceOf(Array);
        // expect(getCommunicationSpacesResponse.body.length).toBeGreaterThan(0);
        expect(getCommunicationSpacesResponse.body[0]).toHaveProperty('_id');
        expect(getCommunicationSpacesResponse.body[0].Disscusionspace).toBe('Test Discussion');
        expect(getCommunicationSpacesResponse.body[0].Privacy).toBe('Public');
    });

    // Add other tests as needed
});
