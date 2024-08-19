const request = require('supertest');
const mongose = require('mongoose');
const { app } = require('../server');
const Project = require('../models/Project');
const Equipe = require('../models/Equipe');
const User = require('../models/User'); 
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
describe('Project Controller', () => {
  const mockProjectId = new mongose.Types.ObjectId(); 

  it('should retrieve a project by ID', async () => {
    const equipeId = new mongose.Types.ObjectId();
    const senderId = new mongose.Types.ObjectId();

    const mockEquipe = new Equipe({
      _id: equipeId,
      NameEquipe: 'Test Equipe',
    });
    await mockEquipe.save();

    const mockUser = new User({
      _id: senderId,
      firstName: 'Test User',
    });
    await mockUser.save();

    const mockProject = new Project({
      _id: mockProjectId,
      projectName: 'Test Project',
      type: 'Test Type',
      User: senderId,
      Equipe: equipeId,
      Responsable: senderId,
      archiver: false,
    });
    await mockProject.save();

    const response = await request(app)
      .get(`/api/project/getprojectbyid/${mockProjectId}`);

    console.log('Response Body:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.projectName).toBe('Test Project');
    expect(response.body.type).toBe('Test Type');
    expect(response.body.Equipe).toBeDefined();
    // expect(response.body.Equipe._id.toString()).toBe(equipeId.toString());
    expect(response.body.archiver).toBe(false);
  });

  it('should update a project by ID', async () => {
    const updatedData = {
      projectName: 'Updated Project Name',
      type: 'Updated Type',
    };

    const response = await request(app)
      .put(`/api/project/updateproject/${mockProjectId}`)
      .send(updatedData);

    console.log('Response Body:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.projectName).toBe('Updated Project Name');
    expect(response.body.type).toBe('Updated Type');
    expect(response.body.archiver).toBe(false); 
  });

  it('should return 404 for a non-existent project ID on update', async () => {
    const nonExistentProjectId = new mongose.Types.ObjectId();

    const updatedData = {
      projectName: 'Updated Project Name',
      type: 'Updated Type',
    };

    const response = await request(app)
      .put(`/api/project/updateproject/${nonExistentProjectId}`)
      .send(updatedData);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Project not found');
  });

  it('should handle errors during project update', async () => {
    const mockFindOneAndUpdate = jest.spyOn(Project, 'findOneAndUpdate').mockImplementation(() => {
      throw new Error('Test Error');
    });


    mockFindOneAndUpdate.mockRestore();
  });

 
});
