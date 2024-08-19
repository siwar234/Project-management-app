const request = require('supertest');
const mongose = require('mongoose');
const nodemailer = require('nodemailer');
const { app } = require('../server');
const Equipe = require('../models/Equipe');
jest.setTimeout(100000); // Set the timeout to 10000ms (10 seconds) or any suitable duration

jest.mock('nodemailer', () => {
  return {
    createTransport: jest.fn().mockReturnValue({
      sendMail: jest.fn().mockResolvedValue({ messageId: 'mockMessageId' }),
    }),
  };
});


beforeAll(async () => {
  await mongose.connect(process.env.URL_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
});

afterAll(async () => {
  if ( process.env.DROP_DB_AFTER_TESTS === 'true') {
    await mongose.connection.db.dropDatabase();
  }
  await mongose.connection.close();
});

beforeEach(() => {
  jest.clearAllMocks();
});


describe('Equipe Controller', () => {
  const mockUserId = new mongose.Types.ObjectId("66a2964cbbafb03300e01c9a");

  it('should create an equipe and send invitations', async () => {
    const response = await request(app)
      .post(`/api/equipe/createequipe/${mockUserId}`)
      .send({
        NameEquipe: 'Equipe 1',
        emails: ['invitee1@example.com', 'invitee2@example.com'],
      });

    expect(response.status).toBe(201);

    const equipeId = response.body.equipes._id;
    const equipe = await Equipe.findById(equipeId);
    expect(equipe).toBeTruthy();
    expect(equipe.NameEquipe).toBe('Equipe 1');
    expect(equipe.emails).toHaveLength(2);
    expect(equipe.emails).toEqual(expect.arrayContaining([
      expect.objectContaining({ email: 'invitee1@example.com' }),
      expect.objectContaining({ email: 'invitee2@example.com' }),
    ]));

    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: 'invitee1@example.com',
      subject: expect.any(String),
      html: expect.any(String),
    }));

    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledTimes(2);
  });

  // Test for updating an equipe
  describe('UpdateEquipe', () => {
    let equipeId;

    beforeEach(async () => {
      const equipe = await Equipe.create({
        NameEquipe: 'Equipe to Update',
        owner: mockUserId,
        emails: [],
        members: [],
      });
      equipeId = equipe._id; 
    });

    it('should update an equipe', async () => {
      const response = await request(app)
        .put(`/api/equipe/updateequipe/${equipeId}`)
        .send({
          NameEquipe: 'Updated Equipe',
        });

      expect(response.status).toBe(201);
      expect(response.body.NameEquipe).toBe('Updated Equipe');

      const updatedEquipe = await Equipe.findById(equipeId);
      expect(updatedEquipe.NameEquipe).toBe('Updated Equipe');
    });
  });


  
});
