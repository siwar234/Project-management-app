const request = require('supertest');
const mongose = require('mongoose');
const { app } = require('../server');
const Task = require('../models/Tasks');
const Ticket = require('../models/Tickets');
const Feature = require('../models/Features');

jest.setTimeout(100000); // Set the timeout to 100000ms (100 seconds) or any suitable duration

beforeAll(async () => {
  if (mongose.connection.readyState === 0) {
    await mongose.connect(process.env.URL_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
  const mockTaskId = new mongose.Types.ObjectId();
  const mockTicketId = new mongose.Types.ObjectId();
  const mockProjectId = new mongose.Types.ObjectId();
  const mockFeatureId = new mongose.Types.ObjectId();

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
  const featureData = new Feature({
    _id: mockFeatureId,
    titleF: 'Test Feature',
    Tickets: []
  });
  await featureData.save();

  // Create a task and update it with the ticket ID
  await new Task({ _id: mockTaskId, tickets: [mockTicketId] }).save();

  // Set global variables for test cases
  global.testData = { mockTaskId, mockTicketId, mockProjectId, mockFeatureId };
});

afterEach(async () => {
  await Ticket.deleteMany({});
  await Task.deleteMany({});
  await Feature.deleteMany({});
});

describe('Ticket Controller', () => {
  it('should retrieve tickets by task ID', async () => {
    const { mockTaskId } = global.testData;

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

  describe('Ticket Controller', () => {
    it('should retrieve tickets by task ID', async () => {
      const { mockTaskId } = global.testData;
  
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
  
    describe('Ticket Controller', () => {
      it('should retrieve tickets by task ID', async () => {
        const { mockTaskId } = global.testData;
    
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
        const { mockTicketId, mockFeatureId } = global.testData;
    
      
    
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
    
        console.log('Update Response Status:', updateResponse.status);
        console.log('Update Response Body:', updateResponse.body);
    
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body).toHaveProperty('_id');
        expect(updateResponse.body.Description).toBe('Updated Ticket Description');
        expect(updateResponse.body.Priority).toBe('High');
        expect(updateResponse.body.Etat).toBe('In Progress');
        expect(updateResponse.body.Type).toBe('Bug');
    
        // Verify the feature was updated
        const updatedFeature = await Feature.findById(mockFeatureId);
        expect(updatedFeature.Tickets).toContainEqual(mockTicketId);
    
        // Verify other features were not affected
        const otherFeatures = await Feature.find({ _id: { $ne: mockFeatureId }, Tickets: mockTicketId });
        otherFeatures.forEach(feature => {
          expect(feature.Tickets).not.toContain(mockTicketId);
        });
      });
    });
    
  });
  
});
