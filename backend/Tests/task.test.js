const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../server');
const Task = require('../models/Tasks');
const Ticket = require('../models/Tickets');
const Feature = require('../models/Features');

// mongoose.connect(process.env.URL_TEST, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// }).catch((err) => {
//   console.log(err);
// });

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.URL_TEST);
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

describe('Task Controller', () => {
  const mockProjectId = '605c72efc8d3b0004a9b0c08';
  const mockTaskId = '605c72efc8d3b0004a9b0c02';


  it('should retrieve tasks by project ID', async () => {
    const projectId = mockProjectId;

    const mockTask = new Task({
      _id: mockTaskId,
      TaskName: 'Test Task',
      Duration: '1 week',
      projectId: projectId,
    });
    await mockTask.save();



    const response = await request(app)
      .get(`/api/tasks/getlisttask/${projectId}`);

    console.log('Response Body:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('_id');
    expect(response.body[0].TaskName).toBe('Test Task');
    expect(response.body[0].Duration).toBe('1 week');
    expect(response.body[0].projectId._id.toString()).toBe(projectId);
  });

  it('should update a task by ID', async () => {
    const projectId = mockProjectId;

    // const mockTask = new Task({
    //   _id: mockTaskId,
    //   TaskName: 'Test Task',
    //   Duration: '1 week',
    //   projectId: projectId,
    // });
    // await mockTask.save();

    const updatedTaskData = {
      TaskName: 'Updated Test Task',
      Duration: '2 weeks',
      StartDate: '2024-07-01T00:00:00Z',
      EndDate: '2024-07-15T00:00:00Z'
    };

    const response = await request(app)
      .put(`/api/tasks/Updatetasks/${mockTaskId}`)
      .send(updatedTaskData);

    console.log('Response Body:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.TaskName).toBe('Updated Test Task');
    expect(response.body.Duration).toBe('2 weeks');
    expect(response.body.StartDate).toBe('2024-07-01T00:00:00.000Z');
    expect(response.body.EndDate).toBe('2024-07-15T00:00:00.000Z');
  });

  it('should delete a task by ID and related data', async () => {
    const mockTaskId = '605c72efc8d3b0004a9b0f58';
    const mockTicketId = '605c72efc8d3b0004a9b0f59';
    const mockFeatureId = '605c72efc8d3b0004a9b0f60';

    const response = await request(app)
      .delete(`/api/tasks/deletetasks/${mockTaskId}`);

    console.log('Response Body:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Task and related tickets deleted successfully');

    // Check if the task was deleted
    const task = await Task.findById(mockTaskId);
    expect(task).toBeNull();

    // Check if the related ticket was deleted
    const ticket = await Ticket.findById(mockTicketId);
    expect(ticket).toBeNull();

    // Check if the feature's tickets were updated
    const feature = await Feature.findById(mockFeatureId);
    if (feature) {
        expect(feature.Tickets).not.toContain(mockTicketId);
  
        if (feature.Tickets.length === 0) {
          expect(feature.startDate).toBeNull();
          expect(feature.endDate).toBeNull();
        }
      } else {
        console.log('Feature document not found, as expected if it was deleted or not created properly.');
      }
  });
});
