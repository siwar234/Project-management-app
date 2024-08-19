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
describe('Task Controller', () => {

  it('should retrieve tasks by project ID', async () => {
    // const projectIdd = new mongose.Types.ObjectId();

    const mockTaskId = new mongose.Types.ObjectId();

    // const equipeId = new mongose.Types.ObjectId();
    // const senderId = new mongose.Types.ObjectId();


    // const mockProject = new Project({
    //   _id: projectIdd,
    //   projectName: ' Project1',
    //   type: 'Test Type',
    //   User: senderId,
    //   Equipe: equipeId,
    //   Responsable: senderId,
    //   archiver: false,
    // });
    // await mockProject.save();


    const mockTask = new Task({
      _id: mockTaskId,
      TaskName: 'Test2 Task',
      Duration: '1 week',
      projectId: "605c72efc8d3b0004a9b0c08",
    });
    await mockTask.save();

    const response = await request(app)
      .get(`/api/tasks/getlisttask/605c72efc8d3b0004a9b0c08`);

    console.log('Response Body:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('_id');
    expect(response.body[0].TaskName).toBe('Test2 Task');
    expect(response.body[0].Duration).toBe('1 week');
  });

  it('should update a task by ID', async () => {
    const mockTasid = new mongose.Types.ObjectId();

    const mockTask = new Task({
      _id: mockTasid,
      TaskName: 'Test Task',
      Duration: '1 week',
    });
    await mockTask.save();

    const updatedTaskData = {
      TaskName: 'Updated Test Task',
      Duration: '2 weeks',
      StartDate: '2024-07-01T00:00:00Z',
      EndDate: '2024-07-15T00:00:00Z'
    };

    const response = await request(app)
      .put(`/api/tasks/Updatetasks/${mockTasid}`)
      .send(updatedTaskData);

    console.log('Response Body:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.TaskName).toBe('Updated Test Task');
    expect(response.body.Duration).toBe('2 weeks');
    expect(response.body.StartDate).toBe('2024-07-01T00:00:00.000Z');
    expect(response.body.EndDate).toBe('2024-07-15T00:00:00.000Z');
  });

  // it('should delete a task by ID and related data', async () => {
  //   const mockProjectId = new mongose.Types.ObjectId();

  //   const mockTicketId = new mongose.Types.ObjectId("605c72efc8d3b0004a9b0f59");
  //   const mockFeatureId = new mongose.Types.ObjectId("605c72efc8d3b0004a9b0f62");
    
  //   const mockTask = new Task({
  //     _id: mockTaskId,
  //     TaskName: ' Task2',
  //     Duration: '1 week',
  //     projectId: mockProjectId,
  //     tickets: [mockTicketId]
  //   });
  //   await mockTask.save();

  //   const mockTicket = new Ticket({
  //     _id: mockTicketId,
  //     Description: 'Test Ticket',
  //     TaskId: mockTaskId,
  //     projectId: mockProjectId,
  //     Feature: mockFeatureId
  //   });
  //   await mockTicket.save();

  //   const mockFeature = new Feature({
  //     _id: mockFeatureId,
  //     titleF: ' Feature2',
  //     projectId: mockProjectId,
  //     Tickets: [mockTicketId]
  //   });
  //   await mockFeature.save();

  //   const response = await request(app)
  //     .delete(`/api/tasks/deletetasks/${mockTaskId}`);

  //   console.log('Response Body:', response.body);

  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty('message', 'Task and related tickets deleted successfully');

  //   // Check if the task was deleted
  //   const task = await Task.findById(mockTaskId);
  //   expect(task).toBeNull();

  //   // Check if the related ticket was deleted
  //   const ticket = await Ticket.findById(mockTicketId);
  //   expect(ticket).toBeNull();

  //   // Check if the feature's tickets were updated
  //   const feature = await Feature.findById(mockFeatureId);
  //   if (feature) {
  //     expect(feature.Tickets).not.toContain(mockTicketId);
  //     if (feature.Tickets.length === 0) {
  //       expect(feature.startDate).toBeNull();
  //       expect(feature.endDate).toBeNull();
  //     }
  //   } else {
  //     console.log('Feature document not found, as expected if it was deleted or not created properly.');
  //   }
  // });
});
