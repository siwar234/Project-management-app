const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");



router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] ,prompt: 'select_account' })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {}),
  function (req, res) {
    try {
      console.log("User after Google authentication:", req.user);

      const id = req.user._id;

      const payload = {
        id: id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      res.redirect(`http://localhost:3000/redirect?token=${token}&id=${id}`);
    } catch (error) {
      console.error('Error generating JWT token:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
);


module.exports = router;