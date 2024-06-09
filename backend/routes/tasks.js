const express = require('express');
const { createTasks, getListTasksByproject, updateTask, deleteTaskbyid, moveTicket, getAlltasks, relatedTasks, unrelatedTasks } = require('../controllers/Tasks');
const router = express.Router()


router.post("/createtasks" , createTasks)

router.get("/getlisttask/:projectId",getListTasksByproject)
router.get("/getalltasks/:userId",getAlltasks)

router.put('/Updatetasks/:id', updateTask);

router.delete('/deletetasks/:taskId', deleteTaskbyid)
router.put('/move-ticket', moveTicket);

router.put('/relatedtask/:taskId/:relatedTaskId', relatedTasks);
router.put('/unrelatedtask/:taskId', unrelatedTasks);

module.exports = router;



