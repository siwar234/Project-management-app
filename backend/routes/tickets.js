const express = require('express');
const { createTickets, getListTicketsBytasks, updatedtickets,getListTicketsByproject, updateTicket, updateTicketfeature, deleteTicket, getalltickets, updateTicketimages, addVote, deleteVote, addComment, deleteComment, updateComment, updateTicketFlag, deleteticketflag } = require('../controllers/Tickets');
const router = express.Router()



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

module.exports = router;



