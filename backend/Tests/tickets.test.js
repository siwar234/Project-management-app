const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../server');
const Task = require('../models/Tasks');
const Ticket = require('../models/Tickets');
const Feature = require('../models/Features');

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

describe('Ticket Controller', () => {
  const mockTaskId = new mongoose.Types.ObjectId("66a2c0c395eb2255304032e1");
  const mockTicketId = new mongoose.Types.ObjectId("66a2c06d20191d91ba6aef64");
  const mockProjectId = new mongoose.Types.ObjectId("605c72efc8d3b0004a9b0c08");
  const mockFeatureId = new mongoose.Types.ObjectId("66a2c0f495eb2255304032e5");

  it('should retrieve tickets by task ID', async () => {
    // Create and save a task with the mock task ID
    const mockTask = new Task({
      _id: mockTaskId,
      TaskName: 'Test2 Task',
      Duration: '1 week',
      projectId: mockProjectId,
      tickets: []
    });
    await mockTask.save();

    // Create a new ticket and save it
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

    // Update the task to include the new ticket ID
    await Task.findByIdAndUpdate(mockTaskId, { $push: { tickets: mockTicketId } });

    // Retrieve tickets by task ID
    const getTicketsResponse = await request(app)
      .get(`/api/tickets/getlistickets/${mockTaskId}`);

    console.log('Response Body:', getTicketsResponse.body);

    expect(getTicketsResponse.status).toBe(200);
    expect(getTicketsResponse.body).toBeInstanceOf(Array);
    expect(getTicketsResponse.body.length).toBeGreaterThan(0);
    expect(getTicketsResponse.body[0]).toHaveProperty('_id');
    expect(getTicketsResponse.body[0].Description).toBe('Test Ticket');
    expect(getTicketsResponse.body[0].Priority).toBe('High');
  });

  it('should update a ticket by ID', async () => {
    // Create a feature
    const mockFeature = new Feature({
      _id: mockFeatureId,
      titleF: 'Test Feature',
      Tickets: []
    });
    await mockFeature.save();

   

    const updatedTicketData = {
      Description: 'Updated Ticket Description',
      Priority: 'High',
      Etat: 'In Progress',
      Type: 'Bug',
      ResponsibleTicket: '66a2964cbbafb03300e01c9a',
      Feature: mockFeatureId.toString()
    };

    const updateResponse = await request(app)
      .put(`/api/tickets/updateticket/${mockTicketId}`)
      .send(updatedTicketData);

    console.log('Response Body:', updateResponse.body);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty('_id');
    expect(updateResponse.body.Description).toBe('Updated Ticket Description');
    expect(updateResponse.body.Priority).toBe('High');
    expect(updateResponse.body.Etat).toBe('In Progress');
    expect(updateResponse.body.Type).toBe('Bug');
    expect(updateResponse.body.ResponsibleTicket._id.toString()).toBe('66a2964cbbafb03300e01c9a');
    expect(updateResponse.body.Feature._id.toString()).toBe(mockFeatureId.toString());

    // Verify the feature was updated
    const updatedFeature = await Feature.findById(mockFeatureId);
    expect(updatedFeature.Tickets).toContainEqual(mockTicketId);

    // Verify other features were not affected
    const otherFeatures = await Feature.find({ _id: { $ne: mockFeatureId }, Tickets: mockTicketId });
    otherFeatures.forEach(feature => {
      expect(feature.Tickets).not.toContainEqual(mockTicketId);
    });
  });

});
