const express = require('express');
const { createTickets, getListTicketsBytasks, updateTicketPosition,updatedtickets,getListTicketsByproject, updateTicket, updateTicketfeature, deleteTicket, getalltickets, updateTicketimages, addVote, deleteVote, addComment, deleteComment, updateComment, updateTicketFlag, deleteticketflag, deleteimage } = require('../controllers/Tickets');
const router = express.Router()


const Feature = require('../models/Features');
const Ticket = require('../models/Tickets');
const Task = require('../models/Tasks');



// router.post("/createTickets/:id" , createTickets)
router.post("/createTickets" , createTickets)

router.get("/getlistickets/:TaskId",getListTicketsBytasks)

router.get("/getlisticketsbyproject/:projectId",getListTicketsByproject)

router.put('/Updatetickets/:id', updateTicket);
router.put('/updateticket/:id', updatedtickets);

router.get("/getalltickets/:id",getalltickets)

router.put('/Updateticketsfeature/:id', updateTicketfeature);
//flag
router.put('/updateTicketFlag/:ticketid', updateTicketFlag);
router.delete('/deleteTicketFlag/:ticketid', deleteticketflag)


router.put('/updateticketsimages/:id', updateTicketimages);

router.post('/:ticketid/vote', addVote);

router.post('/addcomment/:ticketid', addComment);

router.delete('/deleteVote/:ticketid/:voterId', deleteVote)

router.delete('/deleteComment/:ticketid/:commentId/:commenterId', deleteComment);
router.put('/updateComment/:ticketid/:commentId', updateComment);
router.put('/updatepositon/:ticketId',updateTicketPosition)

router.delete('/:ticketId/images/:imageIndex',deleteimage)



// Set OpenAI API key

const OpenAIApi = require('openai');
const env = require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;
// Initialize OpenAI API instance
const openai = new OpenAIApi({
    apiKey: apiKey,
});



router.post('/auto-create-feature/:ticketId', async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const ticket = await Ticket.findById(ticketId).populate('TaskId');

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        const ticketDescription = ticket.Description;
        const taskDescription = ticket.TaskId ? ticket.TaskId.TaskName : '';

        console.log('Ticket Description:', ticketDescription);
        console.log('Task Description:', taskDescription);

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            prompt: `Create a feature description based on the following ticket and task information:\n\nTicket: ${ticketDescription}\n\nTask: ${taskDescription}`,
            max_tokens: 100,
        });

        console.log(response);

        const featureDescription = response.data.choices[0].text.trim();

        // Create a new feature
        const newFeature = new Feature({
            titleF: featureDescription,
            projectId: ticket.projectId,
            Tickets: [ticket._id],
        });

        await newFeature.save();

        // Update the ticket with the new feature
        ticket.Feature = newFeature._id;
        await ticket.save();

        // Update the new feature with the ticket and its dates
        let startDate = null;
        let endDate = null;

        if (ticket.TaskId) {
            const task = await Task.findById(ticket.TaskId);

            if (task) {
                startDate = task.StartDate;
                endDate = task.EndDate;
            }
        }

        await Feature.findOneAndUpdate(
            { _id: newFeature._id },
            {
                $addToSet: { Tickets: ticket._id },
                startDate: startDate || newFeature.startDate,
                endDate: endDate || newFeature.endDate,
            },
            { new: true }
        );

        // If there was an old feature associated with the ticket
        const oldFeatureId = ticket.Feature;

        if (oldFeatureId && oldFeatureId.toString() !== newFeature._id.toString()) {
            // Find the old feature
            const oldFeature = await Feature.findById(oldFeatureId);

            if (oldFeature) {
                // Remove the ticket from the old feature
                await Feature.findOneAndUpdate(
                    { _id: oldFeatureId },
                    {
                        $pull: { Tickets: ticket._id },
                        startDate: null, // Resetting to null as we'll recalculate it
                        endDate: null, // Resetting to null as we'll recalculate it
                    }
                );

                // Find remaining tickets associated with the old feature
                const remainingTickets = await Ticket.find({ Feature: oldFeatureId });
                let earliestStartDate = Infinity;
                let latestEndDate = -Infinity;

                for (const remainingTicket of remainingTickets) {
                    const relatedTask = await Task.findById(remainingTicket.TaskId);
                    if (relatedTask) {
                        if (relatedTask.StartDate < earliestStartDate) {
                            earliestStartDate = relatedTask.StartDate;
                        }
                        if (relatedTask.EndDate > latestEndDate) {
                            latestEndDate = relatedTask.EndDate;
                        }
                    }
                }

                // Update the dates of the old feature based on remaining tickets
                await Feature.findOneAndUpdate(
                    { _id: oldFeatureId },
                    {
                        $set: {
                            startDate: earliestStartDate === Infinity ? null : earliestStartDate,
                            endDate: latestEndDate === -Infinity ? null : latestEndDate,
                        },
                    }
                );
            }
        }

        res.status(201).json({ message: 'Feature created and assigned to ticket', feature: newFeature, ticket });
    } catch (error) {
        console.error('Error creating or updating feature:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;



