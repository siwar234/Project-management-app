
const mongoose = require("mongoose");
const Tasks=require('../models/Tasks');
const Tickets=require('../models/Tickets');
const Feature = require('../models/Features');
const Equipe = require('../models/Equipe');
const Project = require('../models/Project');


exports.updateTask = async (req, res) => {
  try {
    const { TaskName, Duration, StartDate, EndDate } = req.body;
    
    const updatedTask = await Tasks.findOneAndUpdate(
      { _id: req.params.id }, 
      { TaskName, Duration, StartDate, EndDate },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const originalTask = await Tasks.findById(req.params.id).populate('related').populate('tickets').populate({
      path: 'tickets',
      populate: [
        { path: 'ResponsibleTicket', model: 'User' },
        { path: 'Feature', model: 'Features' } ,
        { path: 'votes', model: 'User' } ,
        { 
          path: 'comments', 
          populate: { path: 'commenterId', model: 'User' } 
        }


      ]
    });
    res.status(200).json(originalTask); 
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteTaskbyid = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const task = await Tasks.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const tickets = await Tickets.find({ TaskId: taskId });
    const ticketIds = tickets.map(ticket => ticket._id);

    const featuresToUpdate = await Feature.find({ Tickets: { $in: ticketIds } });
    // console.log(`Found ${featuresToUpdate.length} features to update`);

    // Delete the task
    await Tasks.findByIdAndDelete(taskId);
    // console.log(`Deleted task with ID: ${taskId}`);

    // Delete the related tickets
    await Tickets.deleteMany({ TaskId: taskId });
    // console.log(`Deleted ${ticketIds.length} related tickets`);

    const featureUpdateResult = await Feature.updateMany(
      { Tickets: { $in: ticketIds } },
      { $pull: { Tickets: { $in: ticketIds } } }
    );

    // Update the start and end dates for each feature
    for (const feature of featuresToUpdate) {

      // Find remaining tickets for the feature
      const remainingTickets = await Tickets.find({ _id: { $in: feature.Tickets } });

      let earliestStartDate = Infinity;
      let latestEndDate = -Infinity;

      for (const ticket of remainingTickets) {
        const relatedTask = await Tasks.findById(ticket.TaskId);
        if (relatedTask) {

          if (relatedTask.StartDate < earliestStartDate) {
            earliestStartDate = relatedTask.StartDate;
          }
          if (relatedTask.EndDate > latestEndDate) {
            latestEndDate = relatedTask.EndDate;
          }
        }
      }

      const newStartDate = earliestStartDate === Infinity ? null : earliestStartDate;
      const newEndDate = latestEndDate === -Infinity ? null : latestEndDate;


      await Feature.findByIdAndUpdate(
        feature._id,
        {
          startDate: newStartDate,
          endDate: newEndDate
        }
      );
    }

    res.status(200).json({ message: 'Task and related tickets deleted successfully' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'An error occurred while deleting the task and related tickets' });
  }
};









exports.moveTicket = async (req, res) => {
  const { ticketIds, sourceTaskId, destinationTaskId } = req.body;

  try {
    const sourceTask = await Tasks.findById(sourceTaskId);
    if (!sourceTask) {
      return res.status(404).json({ error: 'Source task not found' });
    }

    const destinationTask = await Tasks.findById(destinationTaskId);
    if (!destinationTask) {
      return res.status(404).json({ error: 'Destination task not found' });
    }

    // Move each ticket individually
    for (const ticketId of ticketIds) {
      const ticket = await Tickets.findById(ticketId);
      if (!ticket) {
        console.warn(`Ticket with ID ${ticketId} not found`);
        continue; 
      }
    
      sourceTask.tickets.pull(ticketId);
      destinationTask.tickets.addToSet(ticketId);
    
      await Tickets.findByIdAndUpdate(ticketId, { TaskId: destinationTaskId });
    }

    await sourceTask.save();
    await destinationTask.save();

    // Delete source task and its related tickets
    await Tasks.findByIdAndDelete(sourceTaskId); 
    await Tickets.deleteMany({ TaskId: sourceTaskId });
    
    // await Features.updateMany({ Tickets: { $in: ticketIds } }, { $pull: { Tickets: { $in: ticketIds } } });

    const updatedDestinationTask = await Tasks.findById(destinationTaskId).populate('related').populate('tickets').populate({
      path: 'tickets',
      populate: [
        { path: 'ResponsibleTicket', model: 'User' },
        { path: 'Feature', model: 'Features' } ,
        { path: 'votes', model: 'User' } ,
        { 
          path: 'comments', 
          populate: { path: 'commenterId', model: 'User' } 
        }

      ]
    });
    
    console.log('Tickets moved successfully');
    return res.status(200).json(updatedDestinationTask);
  } catch (error) {
    console.error('Error moving tickets:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};






exports.createTasks = async (req, res) => {
    try {
      const { TaskName, Duration,projectId } = req.body;
     
    
      const tasks = new Tasks({
        TaskName: TaskName,
        Duration: Duration,       
        projectId:projectId
      });
  
      await tasks.save();
  
      res.status(201).json(tasks);
    } catch (error) {
      console.error('Error creating tasks:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.getListTasksByproject = async (req, res) => {
    try {
        const projectId = req.params.projectId;

        const tasks = await Tasks.find({ projectId }).populate('related').populate('tickets')
        .populate({
          path: 'tickets',
          populate: [
            { path: 'ResponsibleTicket', model: 'User' },
            { path: 'Feature', model: 'Features' } ,
            { path: 'votes', model: 'User' } ,
            { 
              path: 'comments', 
              populate: { path: 'commenterId', model: 'User' } 
            },
          


          ]
      }).populate('projectId');
        
        res.status(200).json(tasks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.relatedTasks = async (req, res) => {
  try {
      const { taskId, relatedTaskId } = req.params;

      const task = await Tasks.findById(taskId).populate('tickets').populate({
        path: 'tickets',
        populate: [
          { path: 'ResponsibleTicket', model: 'User' },
          { path: 'Feature', model: 'Features' } ,
          { path: 'votes', model: 'User' } ,
          { 
            path: 'comments', 
            populate: { path: 'commenterId', model: 'User' } 
          }

        ]
    }).populate('projectId').populate('related')

      if (task) {
          const relatedTask = await Tasks.findById(relatedTaskId);

          if (relatedTask) {
              task.related = relatedTask._id;

              await task.save();

              return         res.status(200).json({task});
              
          } else {
              return res.status(404).json({ success: false, message: 'Related task not found.' });
          }
      } else {
          return res.status(404).json({ success: false, message: 'Main task not found.' });
      }
  } catch (error) {
      console.error('Error adding related task:', error);
      return res.status(500).json({ success: false, message: 'An error occurred while adding related task.' });
  }
};

exports.unrelatedTasks = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Tasks.findByIdAndUpdate(taskId, { $unset: { related: 1 } }, { new: true })
      .populate('tickets')
      .populate({
        path: 'tickets',
        populate: [
          { path: 'ResponsibleTicket', model: 'User' },
          { path: 'Feature', model: 'Features' },
          { path: 'votes', model: 'User' },
          {
            path: 'comments',
            populate: { path: 'commenterId', model: 'User' },
          },
        ],
      })
      .populate('projectId')
      .populate('related');

    return res.status(200).json(task);
  } catch (error) {
    console.error('Error removing related task:', error);
    return res
      .status(500)
      .json({ success: false, message: 'An error occurred while removing related task.' });
  }
};



exports.getAlltasks = async (req, res) => {
  try {
      const userId = req.params.userId;

      const equipes = await Equipe.find({
          $or: [
              { owner: userId },
              { 'members.memberId': userId }
          ]
      });

      if (!equipes || equipes.length === 0) {
          return res.status(404).json({ message: 'No projects found for the user.' });
      }

      const equipeIds = equipes.map(equipe => equipe._id);

      const projects = await Project.find({
        'Equipe': { $in: equipeIds }
    }).populate('Equipe').populate('Responsable', 'firstName profilePicture');

      // Find tasks associated with the projects
      const tasks = await Tasks.find({
        projectId: { $in: projects }
      }).populate('tickets').populate('related').populate({
        path: 'tickets',
        populate: [
          { path: 'ResponsibleTicket', model: 'User' },
          { path: 'Feature', model: 'Features' } ,
          { path: 'votes', model: 'User' } ,
          { 
            path: 'comments', 
            populate: { path: 'commenterId', model: 'User' } 
          }

        ]
    }).populate('projectId');;

      if (!tasks || tasks.length === 0) {
          return res.status(404).json({ message: 'No tasks found for the user.' });
      }

      res.status(200).json(tasks);
  } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};



