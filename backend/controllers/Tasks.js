
const mongoose = require("mongoose");
const Tasks=require('../models/Tasks');
const Tickets=require('../models/Tickets');
const Feature = require('../models/Features');
const Equipe = require('../models/Equipe');
const Project = require('../models/Project');
const axios = require('axios'); // Import Axios
const env = require('dotenv').config();
const fetch = require('node-fetch'); 
global.fetch = fetch; 
global.Headers = fetch.Headers; // Add this line to define Headers globally

const { GoogleGenerativeAI } = require("@google/generative-ai");
// const cron = require('node-cron');

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
    const { TaskName, Duration, projectId } = req.body;

    if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
      throw new Error('Invalid or missing projectId');
    }

    const newTask = new Tasks({
      TaskName,
      Duration,
      projectId,
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating tasks:', error);
    res.status(400).json({ message: error.message });
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
            { path: 'projectId', model: 'Project' },



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






const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// exports.predictAndUpdateTaskDuration = async (req, res) => {
//   try {
//     const taskId = req.params.taskId;
//     console.log('Starting prediction for task:', taskId);

//     const task = await Tasks.findById(taskId).populate('tickets').populate('projectId').exec();
//     if (!task) {
//       console.log('Task not found:', taskId);
//       return res.status(404).json({ error: 'Task not found' });
//     }
//     console.log('Task retrieved:', task);

//     const taskData = {
//       TaskName: task.TaskName,
//       project: task.projectId.projectName,
//       tickets: task.tickets.map(ticket => ({
//         Description: ticket.Description,
//       }))
//     };

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `
//     Task: ${taskData.TaskName}
//     Project: ${taskData.project}
//     Tickets:
//     ${taskData.tickets.map(ticket => `- ${ticket.Description}`).join('\n')}
    
//     Question: Please provide an estimated duration for completing this task in weeks (e.g., 1 week, 2 weeks, 3 weeks, 4 weeks). Just provide the number of weeks.
//   `;


//     console.log('Requesting prediction from Gemini API with prompt:', prompt);

//     const result = await model.generateContent(prompt);
//     const response = await result.response;

//     // Ensure the response is valid and has the expected structure
//     if (!response || !response.text) {
//       console.error('Invalid response from Gemini API');
//       return res.status(500).json({ error: 'Invalid response from Gemini API' });
//     }

//     const predictedDuration = response.text(); // Adjust based on the actual response structure
//     task.Duration = predictedDuration;
//     await task.save();

//     console.log('Task duration updated successfully:', predictedDuration);
//     res.status(200).json({ success: true, predictedDuration });
//   } catch (error) {
//     console.error('Error in predicting and updating task duration:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


exports.predictAndUpdateTicketDuration = async (ticketId) => {
  try {
    console.log('Starting prediction for ticket:', ticketId);

    const ticket = await Tickets.findById(ticketId)
      .populate('featureid')
      .populate('projectId')
      .populate('TaskId')
      .exec();

    if (!ticket) {
      console.log('Ticket not found:', ticketId);
      throw new Error('Ticket not found');
    }
    console.log('Ticket retrieved:', ticket);

    const ticketData = {
      Description: ticket.Description,
      TaskName: ticket.TaskId.TaskName,
      Priority: ticket.Priority,
      ProjectName: ticket.projectId.projectName,
    };

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Ticket Description: ${ticketData.Description}
      Task Name: ${ticketData.TaskName}
      Priority: ${ticketData.Priority}
      Project Name: ${ticketData.ProjectName}

      Question: Please provide an estimated duration for completing this ticket based on its details. Just return 1 day, 2 days, 1 week, 2 weeks, 3 weeks, or 4 weeks.
    `;

    console.log('Requesting prediction from Gemini API with prompt:', prompt);

    const result = await model.generateContent(prompt);
    const response = result?.response;

    if (!response || typeof response.text !== 'function') {
      console.error('Invalid response from Gemini API');
      throw new Error('Invalid response from Gemini API');
    }

    const responseText = await response.text();
    console.log('Received response from Gemini API:', responseText);

    // Extract the duration from the response text (days and weeks)
    const durationPattern = /\b(1|2)\s*(days?|weeks?)\b/g; // Matches 1 day, 2 days, 1 week, or 2 weeks
    const matches = responseText.match(durationPattern);
    const predictedDuration = matches ? matches.join(', ') : 'Unknown duration'; // Join multiple matches if any

    ticket.EstimatedDuration = predictedDuration;
    await ticket.save();

    console.log('Ticket duration updated successfully:', predictedDuration);
  } catch (error) {
    console.error('Error in predicting and updating ticket duration:', error);
  }
};