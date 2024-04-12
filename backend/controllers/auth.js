const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");
const Role = require("../models/role");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
// exports.Register=async(req,res)=>{
//     try{
//         const isExisting = await User.findOne({email:req.body.email})
//         if(isExisting){
//             throw new Error('Email exists already')
//         }
//         const hashedPassword = await bcrypt.hash(req.body.password,10)
//         const userRole = await Role.findOne({ name: 'user' });
//         const newUser = await User.create({
//             ...req.body,
//             password: hashedPassword,
//             Roles: userRole
//               ? [{ roleId: userRole._id, name: userRole.name }]
//               : [],
//           });

//         const {password , ...others}=newUser._doc

//         res.status(201).json({
//           sucess: true,
//           newUser

//       })

//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: err.message });
//       }
// }

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:  process.env.EMAIL_SENDER_USER,
      pass: process.env.EMAIL_SENDER_PASSWORD,
    },
  });

  const message = {
    from: process.env.EMAIL_SENDER_USER,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(message);
};

exports.Register = async (req, res, next) => {
  const { email } = req.body;

  try {
    
    const isExisting = await User.findOne({ email: email });
    if (isExisting) {
      return res.status(400).json({ message: "Email already exists" });
    }

    
    const user = {
      email,
    };

    const token = createActivationToken(user);
    const resetUrl = `http://localhost:3000/email/activate?token=${token}`;

    const message = `<div style="max-width: 700px; margin:auto; padding: 50px 20px; font-size: 110%;">
      <!-- Image below the main content -->
      <div style="text-align: center; margin-top: 20px;">
        <img src="https://www.goodday.work/site/assets/img//solutions/blocks/more-marketing-teams.png" alt="Image" style="max-width: 50%;" />
      </div>
      <hr style="border-top: 1px solid #fff;">
      <!-- Main content -->
      <h2 style="text-align: center; text-transform: uppercase; color: #2A3547; margin-bottom: 20px;">You're almost there</h2>
      <p style="font-size: 110%;">Hello,</p>
      <p style="font-size: 80%;">To finalize the configuration of your account and start using TeamSync, please confirm that the e-mail address provided is correct.</p>
      <!-- Button with custom styling -->
      <a href=${resetUrl} style="display: block; text-align: center; text-decoration: none; color: #fff; background-color: #5D87FF; padding: 10px 20px; margin: 20px auto; width: 200px; border-radius: 5px; font-size: 90%;">Check your e-mail address</a>
      <!-- Footer text -->
      <p style="text-align: center;font-size: 80%">If you have not requested this email, then ignore it.</p>
    </div>`;

    await sendEmail({
      email: user.email,
      subject: "TeamSync application",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports. getEmailFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.email;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};


exports.activeEmail = async (req, res, next) => {
  try {
    const user = jwt.verify(req.params.activation_token, process.env.JWT_SECRET);
    const { email } = user;

    const isExisting = await User.findOne({ email: email });
   
    if (isExisting) {
      return res.status(400).json({ message: "Email already exists" });
    }
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userRole = await Role.findOne({ name: "user" });

    const newUser = await User.create({
      ...req.body,
      email,
      password: hashedPassword,
      Roles: userRole ? [{ roleId: userRole._id, name: userRole.name }] : [],
    });

    const { password, ...others } = newUser._doc;

    const token = jwt.sign({ id: newUser._id, ...others }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    return res.status(200).json({ user: others, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


exports.Login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "passwordinvalid" });
    }
  
    if (!user.password) {
      throw new Error("User password is missing");
    }
    
    const comparePass = await bcrypt.compare(req.body.password, user.password);
    
    if (!comparePass) {
      return res.status(400).json({ message: "passwordinvalid" });
    }
  
    const { password, ...others } = user._doc;

    if (user.isBanned > new Date()) {
      return res.status(403).json({ message: "banned" });
    }
  
    const token = jwt.sign({ id: user._id,user:others}, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
  
    return res.status(200).json({ user: others, token });
  } catch (err) {
    console.error('An error occurred during login:', err);
    return res.status(500).json({ error: "Internal server error" });
  }

}



const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" });
};
