const request = require('supertest');
const mongose = require('mongoose');
const { app } = require('../server');
const Task = require('../models/Tasks');
const Ticket = require('../models/Tickets');
const Feature = require('../models/Features');

jest.setTimeout(100000); // Set the timeout to 10000ms (10 seconds) or any suitable duration

mongose.connect(process.env.URL_TEST).catch((err) => {
  console.log(err);
});

beforeAll(async () => {
  if (mongose.connection.readyState === 0) {
    await mongose.connect(process.env.URL_TEST);
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

describe('Ticket Controller', () => {
  let mockTaskId;
  let mockTicketId;
  let mockProjectId;
  let mockFeatureId;

  beforeAll(async () => {
    mockTaskId = "66b0b337e9db004702642e8b";
    mockTicketId = new mongose.Types.ObjectId("66b0b02e6183b8b305ac6402");
    mockProjectId = "66b0b02e6183b8b305ac6405";
    mockFeatureId = new mongose.Types.ObjectId("66b0b02e6183b8b305ac6456");

    // Create a ticket
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
    };
    await new Ticket(ticketData).save();

    // Create a feature
    const mockFeature = new Feature({
      _id: mockFeatureId,
      titleF: 'Test Feature',
      Tickets: []
    });
    await mockFeature.save();

    // Update the task to include the new ticket ID
    await Task.findByIdAndUpdate(mockTaskId, { $push: { tickets: mockTicketId } });
  });

  it('should retrieve tickets by task ID', async () => {
    const getTicketsResponse = await request(app)
      .get(`/api/tickets/getlistickets/${mockTaskId}`);

    console.log('Get Tickets Response Status:', getTicketsResponse.status);
    console.log('Get Tickets Response Body:', getTicketsResponse.body);

    expect(getTicketsResponse.status).toBe(200);
    expect(getTicketsResponse.body).toBeInstanceOf(Array);
    expect(getTicketsResponse.body.length).toBeGreaterThan(0);
    expect(getTicketsResponse.body[0]).toHaveProperty('_id');
    expect(getTicketsResponse.body[0].Description).toBe('Test Ticket');
    expect(getTicketsResponse.body[0].Priority).toBe('High');
  });

  it('should update a ticket by ID', async () => {
    const mockFeature = new mongose.Types.ObjectId();

    // Create and save feature
    const mockFeatured = new Feature({
      _id: mockFeature,
      titleF: 'Feature2',
      Tickets: []
    });
    await mockFeatured.save();

    const updatedTicketData = {
      Description: 'Updated Ticket Description',
      Priority: 'High',
      Etat: 'In Progress',
      Type: 'Bug',
      ResponsibleTicket: '66a2964cbbafb03300e01c9a',
      Feature: mockFeature.toString()
    };

    const updateResponse = await request(app)
      .put(`/api/tickets/updateticket/${mockTicketId}`)
      .send(updatedTicketData);

    console.log('Update Response Status:', updateResponse.status);
    console.log('Update Response Body:', updateResponse.body);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty('_id');
    expect(updateResponse.body.Description).toBe('Updated Ticket Description');
    expect(updateResponse.body.Priority).toBe('High');
    expect(updateResponse.body.Etat).toBe('In Progress');
    expect(updateResponse.body.Type).toBe('Bug');

    // Verify the feature was updated
    const updatedFeature = await Feature.findById(mockFeature);
    expect(updatedFeature.Tickets).toContainEqual(mockTicketId);

    // Verify other features were not affected
    const otherFeatures = await Feature.find({ _id: { $ne: mockFeature }, Tickets: mockTicketId });
    otherFeatures.forEach(feature => {
      expect(feature.Tickets).not.toContain(mockTicketId);
    });
  });
});
