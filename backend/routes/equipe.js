const express = require('express');
const { createEquipe, signinAfterInvitation ,getListequipes,getEquipesByUserId, signupAfterInvitation, getEquipesById,
     deleteEquipeById, invitepeople, UpdateEquipe, leaveTeam,addtoteam, getEquipesByOwner,
     addLink,
     getLinks,
     deleteLink} = require('../controllers/equipe');
const router = express.Router()
const authMiddleware=require('../middlewares/authMiddleware');



router.post('/createequipe/:id' ,createEquipe);
router.post('/signin-after-invitation/:activation_token/:equipeId',signinAfterInvitation)
router.post('/signup-after-invitation/:activation_token/:equipeId',signupAfterInvitation)
router.post('/addteam/:activation_token/:equipeId',addtoteam)

router.delete('/deleteequipe/:equipeId', deleteEquipeById)
router.post('/invite/:id',invitepeople);

router.put('/leave/:equipeId/:id',leaveTeam);

router.get('/equipes/:userId', getEquipesByUserId)

router.get('/equipesowner/:userId', getEquipesByOwner)

router.get('/liste-equipe',getListequipes)

router.get('/equipe/:id',getEquipesById)

router.put('/updateequipe/:id', UpdateEquipe);


router.put('/addlink/:equipeId', addLink);
router.get('/links/:equipeId', getLinks);
router.delete('/deletelink/:equipeId/:linkId', deleteLink);

module.exports = router;