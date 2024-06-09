const express = require('express');
const { createFeature, getListfeatures, updateFeature } = require('../controllers/features');
const router = express.Router()



router.post("/createfeature" , createFeature)

router.get("/getlistfeatures/:projectId",getListfeatures)

router.put('/updatefeature/:id',updateFeature)



module.exports = router;



