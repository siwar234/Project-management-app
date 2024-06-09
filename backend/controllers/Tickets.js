
const mongoose = require("mongoose");
const Tickets=require('../models/Tickets');
const Task = require('../models/Tasks');
const Features = require('../models/Features');

const { ObjectId } = require('mongoose').Types;


exports.createTickets = async (req, res) => {
  try {
      const { Description, Priority, flag, Etat, TaskId, ResponsibleTicket, projectId, Type } = req.body;

      if (!Description) {
          return res.status(400).json({ error: 'Description is required' });
      }

      const tickets = new Tickets({
          Description: Description,
          Priority: Priority,
          flag: flag || false ,
          Etat: Etat || '',
          TaskId: TaskId,
          projectId: projectId,
          ResponsibleTicket: ResponsibleTicket,
          Type: Type || '',
      });

      const savedTicket = await tickets.save();

      // Update the specific task with the new ticket ID
      await Task.findByIdAndUpdate(TaskId, { $push: { tickets: savedTicket._id } });

      res.status(201).json(savedTicket);
  } catch (error) {
      console.error('Error creating tickets:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


// exports.createTickets = async (req, res) => {
//   try {
//     const { Description, Priority, flag, Etat, ResponsibleTicket, projectId, Type } = req.body;
//     const TaskId = req.params.id; // Get TaskId from the parameters

//     // Check if TaskId is provided and valid
//     if (!TaskId || !ObjectId.isValid(TaskId)) {
//       return res.status(400).json({ error: 'Valid TaskId is required' });
//     }

//     if (!Description) {
//       return res.status(400).json({ error: 'Description is required' });
//     }

//     const ticket = {
//       Description: Description,
//       Priority: Priority || 'Low', // Set default value if not provided
//       flag: flag || '',
//       Etat: Etat || '',
//       projectId: projectId,
//       ResponsibleTicket: ResponsibleTicket,
//       Type: Type || '',
//     };

//     // Find the task by ID
//     const task = await Task.findById(TaskId);

//     if (!task) {
//       return res.status(404).json({ error: 'Task not found' });
//     }

//     // Push the new ticket into the tickets array of the task
//     task.tickets.push(ticket);
    
//     // Save the updated task
//     const updatedTask = await task.save();

//     res.status(201).json(updatedTask); // Return the created ticket
//   } catch (error) {
//     console.error('Error creating tickets:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };



  exports.getListTicketsBytasks = async (req, res) => {
    try {
      const TaskId = req.params.TaskId;
      
      const tickets = await Tickets.find({ TaskId });
  
      res.status(200).json(tickets);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  
  exports.getalltickets = async (req, res) => {
    try {
        const { id } = req.params;

        const alltickets = await Tickets.find({ ResponsibleTicket: id })
            .populate('projectId')
            .populate('ResponsibleTicket')
            .populate('Feature')
            .populate('votes')
            .populate({
              path: "comments",
              populate: {
                path: "commenterId",
                model: "User"
              }
            })
        res.status(200).json(alltickets);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};



  exports.getListTicketsByproject = async (req, res) => {
    try {
      const projectId = req.params.projectId;
      
      const tickets = await Tickets.find({ projectId }).populate('TaskId').populate('ResponsibleTicket').populate('Feature').populate('votes').populate("comments")  
      .populate({
        path: "comments",
        populate: {
          path: "commenterId",
          model: "User"
        }
      })
      res.status(200).json(tickets);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


  exports.updatedtickets = async (req, res) => {
    try {
        const { Description, ResponsibleTicket, Etat, Type, Priority, Feature } = req.body;

        const updatedFields = { Description, ResponsibleTicket, Etat, Type, Priority, Feature };

        const updatedtickets = await Tickets.findOneAndUpdate(
            { _id: req.params.id },
            updatedFields,
            { new: true }
        );

      
      

        if (!updatedtickets) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        if (Feature) {
            await Features.findOneAndUpdate(
                { _id: Feature },
                { $addToSet: { Tickets: req.params.id } }
            );

            await Features.updateMany(
                { _id: { $ne: Feature }, Tickets: req.params.id },
                { $pull: { Tickets: req.params.id } }
            );
        }

        const originaltickets = await Tickets.findById(req.params.id).populate('ResponsibleTicket').populate('Feature').populate('votes')  .populate({
          path: "comments",
          populate: {
            path: "commenterId",
            model: "User"
          }
        })

        res.status(200).json(originaltickets);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

    

  
  
  
exports.updateTicket = async (req, res) => {
  try {
    const { Description, ResponsibleTicket, Etat, Type, Priority  } = req.body;
    
    const updatedTicket = await Tickets.findOneAndUpdate(
      { _id: req.params.id }, 
      { Description, ResponsibleTicket, Etat, Type, Priority  },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

   
    
    const task = await Task.findById(updatedTicket.TaskId).populate('tickets').populate('related').populate({
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

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    const taskid = updatedTicket.TaskId;
    const ticketId = updatedTicket._id;

    const ticket = await Tickets.findById(ticketId)
    .populate('ResponsibleTicket')
    .populate('Feature')
    .populate('votes').populate({
      path: "comments",
      populate: {
        path: "commenterId",
        model: "User"
      }
    });   
   
    res.status(200).json({task,taskid,ticketId,ticket});

  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




exports.updateTicketfeature = async (req, res) => {
  try {
    const { Feature } = req.body;

    // Find the old feature ID associated with the ticket
    const ticket = await Tickets.findById(req.params.id);
    const oldFeatureId = ticket ? ticket.Feature : null;

    // Update the ticket with the new feature
    const updatedTicket = await Tickets.findOneAndUpdate(
      { _id: req.params.id },
      { Feature },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    console.log('Feature ID:', Feature);

    if (Feature) {
      const task = await Task.findById(updatedTicket.TaskId);

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      const feature = await Features.findById(Feature);

      if (!feature) {
        return res.status(404).json({ error: 'Feature not found' });
      }

      let startDate = feature.startDate ? feature.startDate : task.StartDate;
      let endDate = feature.endDate ? feature.endDate : task.EndDate;

      if (task.StartDate < startDate) {
        startDate = task.StartDate;
      }
      if (task.EndDate > endDate) {
        endDate = task.EndDate;
      }

      // Update the new feature with the ticket and its dates
      await Features.findOneAndUpdate(
        { _id: Feature },
        {
          $addToSet: { Tickets: req.params.id },
          startDate,
          endDate
        }
      );

      // If there was an old feature associated with the ticket
      if (oldFeatureId) {
        // Find the old feature
        const oldFeature = await Features.findById(oldFeatureId);

        if (oldFeature) {
          // Remove the ticket from the old feature and update its dates
          await Features.findOneAndUpdate(
            { _id: oldFeatureId },
            {
              $pull: { Tickets: req.params.id },
              startDate: null, // Resetting to null as we'll recalculate it
              endDate: null // Resetting to null as we'll recalculate it
            }
          );

          // Find remaining tickets associated with the old feature
          const remainingTickets = await Tickets.find({ Feature: oldFeatureId });
          let earliestStartDate = Infinity;
          let latestEndDate = -Infinity;

          for (const ticket of remainingTickets) {
            const relatedTask = await Task.findById(ticket.TaskId);
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

          // Update the dates of the old feature based on remaining tickets
          await Features.findOneAndUpdate(
            { _id: oldFeatureId },
            {
              $set: {
                startDate: newStartDate,
                endDate: newEndDate
              }
            }
          );
        }
      }
    } else {
      // If the ticket is removed from the feature
      if (oldFeatureId) {
        // Remove the ticket from the old feature and update its dates
        await Features.findOneAndUpdate(
          { _id: oldFeatureId },
          {
            $pull: { Tickets: req.params.id },
            startDate: null, // Resetting to null as we'll recalculate it
            endDate: null // Resetting to null as we'll recalculate it
          }
        );

        // Find remaining tickets associated with the old feature
        const remainingTickets = await Tickets.find({ Feature: oldFeatureId });
        let earliestStartDate = Infinity;
        let latestEndDate = -Infinity;

        for (const ticket of remainingTickets) {
          const relatedTask = await Task.findById(ticket.TaskId);
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

        // Update the dates of the old feature based on remaining tickets
        await Features.findOneAndUpdate(
          { _id: oldFeatureId },
          {
            $set: {
              startDate: newStartDate,
              endDate: newEndDate
            }
          }
        );
      }
    }

    // Find and return the updated task with populated tickets and features
    const updatedTask = await Task.findById(updatedTicket.TaskId).populate('tickets').populate('related').populate({
      path: 'tickets',
      populate: [
        { path: 'ResponsibleTicket', model: 'User' },
        { path: 'Feature', model: 'Features' },
        { path: 'votes', model: 'User' } ,
        { 
          path: 'comments', 
          populate: { path: 'commenterId', model: 'User' } 
        }

      ]
    });

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const taskid = updatedTicket.TaskId;
    const ticketId = updatedTicket._id;

    const ticketfeature = await Tickets.findById(ticketId)
    .populate('ResponsibleTicket')
    .populate('Feature')
    .populate('votes').populate({
      path: "comments",
      populate: {
        path: "commenterId",
        model: "User"
      }
    });   
    res.status(200).json({updatedTask,taskid,ticketId,ticketfeature });
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { ticketid } = req.params;
    const { commenterId, commentText } = req.body;

    const commenticket = await Tickets.findByIdAndUpdate(
      ticketid,
      {
        $push: {
          comments: {
            commenterId: commenterId,
            comment: commentText
          }
        }
      },
      { new: true } 
    );

    const taskid = commenticket.TaskId;
    const ticketId = commenticket._id;

    const ticketcomment = await Tickets.findById(ticketId)
    .populate('ResponsibleTicket')
    .populate('Feature')
    .populate('votes').populate({
      path: "comments",
      populate: {
        path: "commenterId",
        model: "User"
      }
    });   

    const task = await Task.findById(commenticket.TaskId).populate('related')
      .populate('tickets')
      .populate({
        path: 'tickets',
        populate: [
          { path: 'ResponsibleTicket', model: 'User' },
          { path: 'Feature', model: 'Features' },
          { path: 'votes', model: 'User' },
          { 
            path: 'comments', 
            populate: { path: 'commenterId', model: 'User' } 
          }
        ]
      });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ task, ticketId, taskid, ticketcomment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal server error' }); 
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { ticketid, commentId, commenterId } = req.params;

    const updatedTicket = await Tickets.findByIdAndUpdate(
      ticketid,
      { $pull: { comments: { _id: commentId, commenterId: commenterId } } },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

   
 const task = await Task.findById(updatedTicket.TaskId).populate('tickets').populate('related').populate({
      path: 'tickets',
      populate: [
        { path: 'ResponsibleTicket', model: 'User' },
        { path: 'Feature', model: 'Features' } ,
         { path: 'votes', model: 'User' },
         { 
          path: 'comments', 
          populate: { path: 'commenterId', model: 'User' } 
        }
         
      ]
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const taskId = updatedTicket.TaskId;
    const ticketId = updatedTicket._id;
   const ticket=  await Tickets.findById(ticketId)
    .populate('ResponsibleTicket')
    .populate('Feature')
    .populate('votes').populate({
      path: "comments",
      populate: {
        path: "commenterId",
        model: "User"
      }
    });   

    res.status(200).json({ task,ticketId,taskId,ticket});
    } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { ticketid, commentId } = req.params;
    const { commenterId, updatedCommentText } = req.body;

    const comment = await Tickets.findOneAndUpdate(
      { 
        _id: ticketid, 
        'comments._id': commentId, 
        'comments.commenterId': commenterId 
      },
      { 
        $set: { 
          'comments.$[comment].comment': updatedCommentText,
          'comments.$[comment].updatedAt': new Date() 
        }
      },
      { 
        new: true,
        arrayFilters: [{ 'comment._id': commentId }] 
      }
    );
    

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found or unauthorized' });
    }
    console.log('Updated comment:', comment); 

    const ticket = await Tickets.findById(ticketid)
      .populate('ResponsibleTicket')
      .populate('Feature')
      .populate('votes')
      .populate({
        path: 'comments',
        populate: {
          path: 'commenterId',
          model: 'User'
        }
      });

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const taskId = ticket.TaskId;
    const ticketId = ticket._id;

    const task = await Task.findById(taskId).populate('tickets').populate('related').populate({
      path: 'tickets',
      populate: [
        { path: 'ResponsibleTicket', model: 'User' },
        { path: 'Feature', model: 'Features' } ,
        { path: 'votes', model: 'User' },
        { 
          path: 'comments', 
          populate: { path: 'commenterId', model: 'User' } 
        }
      ]
    });

    res.status(200).json({ task,ticketId, taskId, ticket });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.addVote = async (req, res) => {
  const { ticketid } = req.params;
  const { voterId } = req.body;

  try {
    const ticketupdated = await Tickets.findById(ticketid);

    if (!ticketupdated) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    if (ticketupdated.votes.includes(voterId)) {
      return res.status(400).json({ error: 'You have already voted for this ticket' });
    }

    ticketupdated.votes.push(voterId);

    await ticketupdated.save();


    const task = await Task.findById(ticketupdated.TaskId).populate('tickets').populate('related').populate({
      path: 'tickets',
      populate: [
        { path: 'ResponsibleTicket', model: 'User' },
        { path: 'Feature', model: 'Features' } ,
         { path: 'votes', model: 'User' },
         { 
          path: 'comments', 
          populate: { path: 'commenterId', model: 'User' } 
        }
         
      ]
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    const ticketId = ticketupdated._id;
    const taskId = ticketupdated.TaskId;
    const ticket = await Tickets.findById(ticketId)
    .populate('ResponsibleTicket')
    .populate('Feature')
    .populate('votes').populate({
      path: "comments",
      populate: {
        path: "commenterId",
        model: "User"
      }
    });

    res.status(200).json({task, ticketId, taskId, ticket });
    // res.status(200).json({task,ticketid, taskId, ticket });

  } catch (error) {
    console.error('Error adding vote:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.deleteVote = async (req, res) => {
  const { ticketid } = req.params;
  const { voterId } = req.params;

  try {
    console.log('Deleting vote:', voterId);
    
    const updatedTicket = await Tickets.findByIdAndUpdate(
      ticketid,
      { $pull: { votes: voterId } },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const task = await Task.findById(updatedTicket.TaskId).populate('tickets').populate('related').populate({
      path: 'tickets',
      populate: [
        { path: 'ResponsibleTicket', model: 'User' },
        { path: 'Feature', model: 'Features' } ,
         { path: 'votes', model: 'User' },
         { 
          path: 'comments', 
          populate: { path: 'commenterId', model: 'User' } 
        }
         
      ]
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const taskId = updatedTicket.TaskId;
    const ticketId = updatedTicket._id;
   const ticket=  await Tickets.findById(ticketId)
    .populate('ResponsibleTicket')
    .populate('Feature')
    .populate('votes').populate({
      path: "comments",
      populate: {
        path: "commenterId",
        model: "User"
      }
    });   

    res.status(200).json({ task,ticketId,taskId,ticket});

  } catch (error) {
    console.error('Error deleting vote:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};





exports.updateTicketimages = async (req, res) => {
  try {
    const { descriptionticket } = req.body;

    if (!descriptionticket) {
      return res.status(400).json({ error: 'No description ticket provided' });
    }

    const { descriptionText, imageD } = descriptionticket;

    const updateFields = {};

    if (descriptionText) {
      updateFields['descriptionticket.descriptionText'] = descriptionText;
    }

    if (imageD && imageD.length > 0) {
      updateFields['$addToSet'] = {
        'descriptionticket.imageD': { $each: imageD }
      };
    }

    const updatedTickets = await Tickets.findOneAndUpdate(
      { _id: req.params.id },
      updateFields,
      { new: true }
    );

    if (!updatedTickets) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const task = await Task.findById(updatedTickets.TaskId).populate('tickets').populate('related').populate({
      path: 'tickets',
      populate: [
        { path: 'ResponsibleTicket', model: 'User' },
        { path: 'Feature', model: 'Features' },
        { path: 'votes', model: 'User' }
      ]
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const ticketId = updatedTickets._id;
    const taskId = updatedTickets.TaskId;

    // Populate the ticket object
    const ticket = await Tickets.findById(ticketId)
      .populate('ResponsibleTicket')
      .populate('Feature')
      .populate('votes').populate({
        path: "comments",
        populate: {
          path: "commenterId",
          model: "User"
        }
      });

    res.status(200).json({ task, ticketId, taskId, ticket });

  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};





exports.deleteTicket = async (req, res) => {
  try {

    const ticketId = req.params.ticketId;

      await Task.updateMany(
          { tickets: ticketId },
          { $pull: { tickets: ticketId } }
      );

      await Features.updateMany(
          { 'Tickets': ticketId },
          { $pull: { 'Tickets': ticketId } }
      );

      await Tickets.findByIdAndDelete(ticketId);
      res.status(200).json({ message: 'tickets deleted successfully' });

  } catch (error) {
      throw error;
  }
}


exports.updateTicketFlag = async (req, res) => {
  try {
    const { ticketid } = req.params;

  

    const updatedTicket = await Tickets.findByIdAndUpdate(
      ticketid,
      { flag: true },
      { new: true }
    );


  
    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const task = await Task.findById(updatedTicket.TaskId).populate('tickets').populate('related').populate({
      path: 'tickets',
      populate: [
        { path: 'ResponsibleTicket', model: 'User' },
        { path: 'Feature', model: 'Features' },
        { path: 'votes', model: 'User' }
      ]
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const ticketId = updatedTicket._id;
    const taskId = updatedTicket.TaskId;

    // Populate the ticket object
    const ticket = await Tickets.findById(ticketId)
      .populate('ResponsibleTicket')
      .populate('Feature')
      .populate('votes').populate({
        path: "comments",
        populate: {
          path: "commenterId",
          model: "User"
        }
      });

    res.status(200).json({ task, ticketId, taskId, ticket });

  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.deleteticketflag = async (req, res) => {
  try {
    const { ticketid } = req.params;

  

    const flagticket = await Tickets.findByIdAndUpdate(
      ticketid,
      { flag: false },
      { new: true }
    );


  
    if (!flagticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const task = await Task.findById(flagticket.TaskId).populate('tickets').populate('related').populate({
      path: 'tickets',
      populate: [
        { path: 'ResponsibleTicket', model: 'User' },
        { path: 'Feature', model: 'Features' },
        { path: 'votes', model: 'User' }
      ]
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const ticketId = flagticket._id;
    const taskId = flagticket.TaskId;

    // Populate the ticket object
    const ticket = await Tickets.findById(ticketId)
      .populate('ResponsibleTicket')
      .populate('Feature')
      .populate('votes').populate({
        path: "comments",
        populate: {
          path: "commenterId",
          model: "User"
        }
      });

    res.status(200).json({ task, ticketId, taskId, ticket });

  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};










