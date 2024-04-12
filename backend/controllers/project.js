const Project = require('../models/Project');
const Equipe = require('../models/Equipe');

exports.createProject = async (req, res) => {
    try {
      const { projectName, type, equipeId } = req.body;
  
      const equipe = await Equipe.findById(equipeId);
      if (!equipe) {
        return res.status(400).json({ error: 'Equipe not found' });
      }
  
      const allowedTypes = ["Software development", "Marketing", "Design", "Human Resources"];
      let projectType;
  
      if (allowedTypes.includes(type)) {
        projectType = type; 
      } else {
        projectType = type.trim();
      }
  
      const project = new Project({
        projectName,
        type: projectType, 
        equipe: equipeId,
      });
  
      await project.save();
  
      res.status(201).json(project);
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  