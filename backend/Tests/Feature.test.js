const request = require('supertest');
const mongose = require('mongoose');
const { app } = require('../server');
const Feature = require('../models/Features');

jest.setTimeout(100000); // Set the timeout to 100000ms (100 seconds) or any suitable duration

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



beforeEach(async () => {
  jest.clearAllMocks();
  
  // Create unique ObjectIds for each test
  global.testData = {
    mockFeatureId: new mongose.Types.ObjectId(),
    mockProjectId: "605c72efc8d3b0004a9b0c08",
    mockTicketId: "66b0b02e6183b8b305ac6402"
  };

  // Create and save mock data
  const featureData = new Feature({
    _id: global.testData.mockFeatureId,
    titleF: 'Test Feature',
    startDate: '2024-07-01T00:00:00Z',
    endDate: '2024-07-15T00:00:00Z',
    projectId: "605c72efc8d3b0004a9b0c08",
  });
  await featureData.save();

  await Feature.findByIdAndUpdate(global.testData.mockFeatureId, { $push: { Tickets: global.testData.mockTicketId } });
});

describe('Feature Controller', () => {
  it('should retrieve features by project ID', async () => {
    const getFeaturesResponse = await request(app)
      .get(`/api/feature/getlistfeatures/${global.testData.mockProjectId}`);

    console.log('Response Body:', getFeaturesResponse.body);

    expect(getFeaturesResponse.status).toBe(200);
    expect(getFeaturesResponse.body).toBeInstanceOf(Array);
    expect(getFeaturesResponse.body.length).toBeGreaterThan(0);
    expect(getFeaturesResponse.body[0]).toHaveProperty('_id');
    expect(getFeaturesResponse.body[0].titleF).toBe('Test Feature');
  });

  it('should update a feature by ID', async () => {
    const updatedFeatureData = {
      titleF: 'Updated Feature Title',
      startDate: '2024-07-05T00:00:00Z',
      endDate: '2024-07-20T00:00:00Z',
    };

    const updateResponse = await request(app)
      .put(`/api/feature/updatefeature/${global.testData.mockFeatureId}`)
      .send(updatedFeatureData);

    console.log('Update Response Status:', updateResponse.status);
    console.log('Update Response Body:', updateResponse.body);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.updatedFeature).toHaveProperty('_id');
    expect(updateResponse.body.updatedFeature.titleF).toBe('Updated Feature Title');
    expect(updateResponse.body.updatedFeature.startDate).toBe('2024-07-05T00:00:00.000Z');
    expect(updateResponse.body.updatedFeature.endDate).toBe('2024-07-20T00:00:00.000Z');
  });
});
