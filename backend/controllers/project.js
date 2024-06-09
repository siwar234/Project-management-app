const Project = require('../models/Project');
const Equipe = require('../models/Equipe');

exports.createProject = async (req, res) => {
  try {
    const { projectName, type, equipeId, ResponsableId } = req.body;

    let equipe;
    if (equipeId) {
      equipe = await Equipe.findById(equipeId);
      if (!equipe) {
        return res.status(400).json({ error: 'Equipe not found' });
      }
    }

    const project = new Project({
      projectName: projectName,
      type: type, 
      Equipe: equipeId || null,
      Responsable: ResponsableId || null
    });

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.UpdateProject = async (req, res) => {
  try {
      const data = await Project.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(201).json(data);
    
  } catch (error) {
    console.log(error.message);
  }
};

  exports.getProject = async (req, res) => {
    try {
      const { id } = req.params;
      const project = await Project.findById(id).populate('Responsable', 'firstName profilePicture').populate({
        path: 'Equipe',
        populate: [
          { path: 'members.memberId', model: 'User' },
          { path: 'owner', model: 'User' } 
        ] 
      });
      res.status(200).json(project);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }


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
  