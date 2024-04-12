const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
    }),

    function (req, res) {
      const payload = {
        userid: req.user._id,
        user: req.user 
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      // res.redirect(`http://localhost:3000/?token=${token}&id=${payload.id}`);
      // res.redirect(`http://localhost:3000/profileuser/${token}/${payload.userid}`);

      return res.status(200).json({token});

    }
  );


module.exports = router;