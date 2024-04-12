const express = require('express');
const { createEquipe, signinAfterInvitation ,getListequipes,getEquipesByUserId, signupAfterInvitation, getEquipesById, deleteEquipeById, invitepeople, leaveTeam, UpdateEquipe, addtoteam} = require('../controllers/equipe');
const router = express.Router()
const authMiddleware=require('../middlewares/authMiddleware')



router.post('/createequipe/:id' ,createEquipe);
router.post('/signin-after-invitation/:activation_token/:equipeId',signinAfterInvitation)
router.post('/signup-after-invitation/:activation_token/:equipeId',signupAfterInvitation)
router.post('/addteam/:activation_token/:equipeId',addtoteam)

router.delete('/deleteequipe/:equipeId', deleteEquipeById)
router.post('/invite/:id',invitepeople);

router.put('/leave/:equipeId/:id',leaveTeam);

router.get('/equipes/:userId', getEquipesByUserId)

router.get('/liste-equipe',getListequipes)
router.get('/equipe/:id',getEquipesById)

router.put('/updateequipe/:id', UpdateEquipe);

module.exports = router;