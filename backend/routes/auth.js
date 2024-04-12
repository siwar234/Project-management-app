const express = require('express')
const {Register,Login,activeEmail,getEmailFromToken} = require('../controllers/auth')
const router = express.Router()
const path = require('path');
const { forgetPassword, resetPassword } = require('../controllers/forgetPassword');
const User = require('../models/User');
const authMiddleware =require('../middlewares/authMiddleware')

router.post('/activate/:activation_token', activeEmail);

  router.post('/', Register);
  router.post('/login', Login );
  router.post("/forgetPassword", forgetPassword);
router.post("/reset-password/:token", resetPassword);

  // router.post('/forgot-password', forgotPassword );
  // router.post('/reset-password', chnagePassword );
  router.post('/get-email-from-token/:token', (req, res) => {
    const { token } = req.params;
    const email = getEmailFromToken(token);
    res.json({ email });
  });
  router.get('/current', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate({
        path: 'equipes',
        populate: { path: 'members.memberId', model: 'User' } 
      });;
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching current user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  


  module.exports = router;
