const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bycrypt=require("bcrypt")
const User = require("../models/User");

exports.forgetPassword = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      // Generate a unique JWT token for the user that contains the user's id
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {expiresIn: "10m",});
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_SENDER_USER,
          pass: process.env.EMAIL_SENDER_PASSWORD,
        },
      });
      const resetUrl = `http://localhost:3000/authentificate/password/${token}`;

      const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Reset Password",
        html: `<div style="max-width: 700px; margin:auto; padding: 50px 20px; font-size: 110%;">
        <!-- Image below the main content -->
        <div style="text-align: center; margin-top: 20px;">
          <img src="https://www.shutterstock.com/image-vector/icon-concept-about-wrong-password-600nw-1909183087.jpg" alt="Image" style="max-width: 50%;" />
        </div>
        <hr style="border-top: 1px solid #fff;">
        <!-- Main content -->
        <h2 style="text-align: center; text-transform: uppercase; color: #2A3547; margin-bottom: 20px;">Reset Your Password</h2>
        <p style="font-size: 110%;">Hello,</p>
        
      <p>Click on the following link to reset your password:</p>
      <a href=${resetUrl} style="display: block; text-align: center; text-decoration: none; color: #FFF; background-color: #6c3f8d; padding: 10px 20px; margin: 20px auto; width: 200px; border-radius: 5px; font-size: 90%;">Reset your password</a>

      <p>The link will expire in 10 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>`,
      };
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        res.status(200).send({ message: "Email sent" });
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };



  exports.resetPassword = async (req, res) => {
  try {
    // Verify the token sent by the user
    const decodedToken = jwt.verify(
      req.params.token,
      process.env.SECRET_KEY
    );

    // If the token is invalid, return an error
    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // find the user with the id from the token
    const user = await User.findOne({ _id: decodedToken.userId });
    if (!user) {
      return res.status(401).send({ message: "no user found" });
    }
    
    const salt = await bycrypt.genSalt(10);
    req.body.newPassword = await bycrypt.hash(req.body.newPassword, salt);

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).send({ message: "Password updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};