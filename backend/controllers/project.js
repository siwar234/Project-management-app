const Project = require('../models/Project');
const Equipe = require('../models/Equipe');
const Notification = require('../models/Notifications');  
// const { getUser, io } = require('../../socket/index'); 

const mongoose = require('mongoose');

exports.createProject = async (req, res) => {
  try {
    const { projectName, type, equipeId, ResponsableId,senderId ,archiver} = req.body;

    let equipe;
    if (equipeId) {
      equipe = await Equipe.findById(equipeId);
      if (!equipe) {
        return res.status(400).json({ error: 'Equipe not found' });
      }
    }

    const project = new Project({
      projectName: projectName,
      User:senderId,
      type: type, 
      Equipe: equipeId || null,
      archiver: archiver || false ,
      Responsable: ResponsableId || null
    });

    await project.save();

    const populatedProject = await Project.findById(project._id).populate('User');

    res.status(201).json(populatedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.UpdateProject = async (req, res) => {
  try {
    console.log('Updating project with ID:', req.params.id);
    console.log('Update data:', req.body);

    const data = await Project.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error updating project:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.archiverproject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId).populate('Equipe').populate('Responsable', 'firstName profilePicture');
   
    if (!project) {
      throw new Error('Project not found');
    }

    project.archiver = true;
    await project.save();

    res.status(201).json(project);

  } catch (error) {
    console.error('Error archiving project:', error);
    throw error;
  }
};


exports.unarchiverproject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId).populate('Equipe').populate('Responsable', 'firstName profilePicture');
   
    if (!project) {
      throw new Error('Project not found');
    }

    project.archiver = false;
    await project.save();

    res.status(201).json(project);

  } catch (error) {
    console.error('Error archiving project:', error);
    throw error;
  }
};
exports.getProject = async (req, res) => {
  const { id } = req.params;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid project ID format' });
  }

  try {
    const project = await Project.findById(id)
      .populate('Responsable', 'firstName profilePicture')
      .populate({
        path: 'Equipe',
        populate: [
          { path: 'members.memberId', model: 'User' },
          { path: 'owner', model: 'User' }
        ]
      });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};



  // exports.getAllProject = async (req, res) => {
  //   try {
  //     const project = await Project.find()
  //     .populate({
  //       path: 'Equipe',
  //       populate: { path: 'members.memberId', model: 'User' } 
  //     });
  //     res.status(200).json(project);
  //   } catch (err) {
  //     res.status(404).json({ error: err.message });
  //   }
  // }

  exports.getProjectByUser = async (req, res) => {
    try {
        const id = req.params.id;

        const equipes = await Equipe.find({
            $or: [
                { owner: id },
                { 'members.memberId': id }
            ]
        });

        if (!equipes || equipes.length === 0) {
            return res.status(404).json({ message: 'No projects found for the user.' });
        }

        const equipeIds = equipes.map(equipe => equipe._id);

        const projects = await Project.find({
            'Equipe': { $in: equipeIds }
        }).populate('Equipe').populate('Responsable', 'firstName profilePicture');

        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: 'No projects found for the user.' });
        }

        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

  

  exports.deleteProjectById = async (req, res) => {

    try {
      const projectId = req.params.projectId;
  
      await Project.findByIdAndDelete(projectId);
  
       
  
      // await User.updateMany({}, { $pull: { equipes: equipeId } });
  
      res.status(200).json({ message: 'project deleted' });
  
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while leaving the equipe' });
    }
  };
  