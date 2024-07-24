const Communication = require('../models/CommunicationSpace'); 

exports.createCommunicationSpace = async (req, res) => {
  try {
    const { Task, Disscusionspace, Privacy,projectId } = req.body;

    const communicationSpace = await Communication.create({
      Task,
      Disscusionspace,
      Privacy,
      projectId
    });

    return res.status(201).json(communicationSpace );
  } catch (error) {
    console.error('Error creating communication space:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getCommunicationSpacesByProjectId = async (req, res) => {
    try {
      const { projectId } = req.params;
  
      const communicationSpaces = await Communication.find({ projectId })
      .populate({
        path: 'projectId',
        populate: {
          path: 'Equipe',
          model: 'Equipe',
          populate: [
            {
              path: 'owner',
              model: 'User'
            },
            {
                path: 'members.memberId',
                model: 'User'
              }
          ]
        }
      })
      .populate('Task');
  
      if (!communicationSpaces) {
        return res.status(404).json({ message: 'No communication spaces found for this project' });
      }
  
      return res.status(200).json(communicationSpaces);
    } catch (error) {
      console.error('Error retrieving communication spaces:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };



