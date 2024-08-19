const request = require('supertest');
const mongose = require('mongoose');
const { app } = require('../server');
const Task = require('../models/Tasks');
const Ticket = require('../models/Tickets');
const Feature = require('../models/Features');
jest.setTimeout(100000); // Adjust timeout if needed


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

    const mockTaskId = new mongose.Types.ObjectId();

    

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

  
});
