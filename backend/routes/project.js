const express = require('express');
const { createProject, getProject,getProjectByUser, UpdateProject, deleteProjectById } = require('../controllers/project');
const router = express.Router()


router.post('/createproject',createProject)

router.get('/getprojectbyid/:id',getProject)



router.get('/getprojectbyuser/:id',getProjectByUser)




router.put('/updateproject/:id',UpdateProject)
router.delete('/deleteproject/:projectId', deleteProjectById)






module.exports = router;



