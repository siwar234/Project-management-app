const express = require('express')
const router = express.Router()
const {banUser,unbanUser, getUser,getListUser,UpdateUser} = require("../controllers/user")
const{verifyToken}=require ("../middlewares/verifyToken")


router.put('/banuser',verifyToken,banUser)

router.put('/unbanuser',verifyToken,unbanUser)

router.get('/getlistuser',verifyToken,getListUser)

router.get('/getuser/:id',getUser)

router.put('/updateuser/:id', UpdateUser);


module.exports = router;



