
const mongoose = require("mongoose");
const Equipe=require('../models/Equipe');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { activeEmail } = require('../controllers/auth');
const Role = require("../models/role");
const Project = require('../models/Project');

const createEquipe = async (req, res) => {
  try {
    const { NameEquipe, emails } = req.body;
    const id = req.params.id;

    console.log('Creating equipe with:', { NameEquipe, id });

    const equipe = await Equipe.create({ NameEquipe, owner: id });

    console.log('Equipe created:', equipe);

    await sendInvitations(equipe._id, emails); 

    return res.status(201).json({  equipes: equipe });
  } catch (error) {
    console.error('Error creating equipe:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


 const sendInvitations = async (equipeId, emails) => {
    try {
      const equipe = await Equipe.findById(equipeId);
      console.log('Sending invitations for equipe:', equipe);


      for (const email of emails) {


        const token = generateUniqueToken({ email });

        // Send invitation email with token in the URL
        const invitationUrl = `http://172.10.0.140/:3000/join/jointeam/?equipeId=${equipeId}&token=${token}`;
        const message = `<div style="max-width: 700px; margin:auto; padding: 50px 20px; font-size: 110%;">
        <!-- Image below the main content -->
        <div style="text-align: center; margin-top: 20px;">
          <img src="https://png.pngtree.com/png-vector/20210430/ourmid/pngtree-office-desk-with-computer-send-email-messaging-message-concept-illustration-png-image_3251031.png" alt="emailImage" style="max-width: 40%;" />
        </div>
        <hr style="border-top: 1px solid #fff;">
        <!-- Main content -->
        <h2 style="text-align: center; text-transform: uppercase; color: #2A3547; margin-bottom: 20px;">You have been invited to join equipe ${equipe.NameEquipe}.</h2>
        <p style="font-size: 110%;"> Start planning and tracking work with your team. You can share your work and view what your team is doing.</p>
        <p style="font-size: 90%;">accept invitation and become a part of team ${equipe.NameEquipe} </p>
        <!-- Button with custom styling -->
        <a href=${invitationUrl} style="display: block; text-align: center; text-decoration: none; color: #fff; background-color: #E8687F; padding: 10px 20px; margin: 20px auto; width: 200px; border-radius: 5px; font-size: 90%;">accept invitation </a>
        <!-- Footer text -->
        <p style="text-align: center;font-size: 80%">this invitation expires in 1 day.</p>
      </div>`;

        await sendEmail({ email, subject: 'Invitation to join Equipe', message });
        
        // Add email to equipe's emails list
        equipe.emails.push({ email });
      }
  
      await equipe.save();
    } catch (error) {
      console.error('Error sending invitations:', error);
      throw new Error('Error sending invitations');
    }
  };

 
  
 const  sendEmail = async ({ email, subject, message }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user:  process.env.EMAIL_SENDER_USER,
              pass: process.env.EMAIL_SENDER_PASSWORD,
            },
          });
        
  
      const info = await transporter.sendMail({
        from: process.env.EMAIL_SENDER_USER, 
        to: email, 
        subject: subject, 
        html: message, 
      });
  
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  };

  const generateUniqueToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" });
  };


  
const invitepeople = async (req, res) => {
  try{
    const id = req.params.id; 


    const {  emails } = req.body;

  await sendInvitations(id, emails);

  return res.status(201).json({ success: true });
} catch (error) {
  console.error('sending invitation :', error);
  return res.status(500).json({ error: 'Internal server error' });
}}



 const signinAfterInvitation = async (req, res) => {
    try {
        const user = jwt.verify(req.params.activation_token, process.env.JWT_SECRET);
        const { email } = user;

        const equipeId = req.params.equipeId;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!req.body.password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const comparePass = await bcrypt.compare(req.body.password, existingUser.password);

        if (!comparePass) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        
        const { password, ...userWithoutPassword } = existingUser._doc;
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

        return res.status(200).json({ user: userWithoutPassword, token });
    } catch (error) {
        console.error('Error handling signin after invitation:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const addtoteam = async (req, res) => {
  try {
    const user = jwt.verify(req.params.activation_token, process.env.JWT_SECRET);
    const { email } = user;

    const existingUser = await User.findOne({ email });

    // Check if the user exists
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const equipeId = req.params.equipeId;
    let equipe;

    if (equipeId) {
      equipe = await Equipe.findById(equipeId);
      // Check if the equipe exists
      if (!equipe) {
        console.log('Team not found, proceeding with signup only.');
      }
    }

    // If the equipe exists and the user is not already a member, add the user to the equipe
    if (equipe && !existingUser.equipes.includes(equipeId)) {
      existingUser.equipes.push(equipeId);
      await existingUser.save();

      equipe.members.push({ memberId: existingUser._id });
      await equipe.save();

      return res.status(200).json({ equipe });
    } else {
      return res.status(400).json({ error: 'User is already a member of the team' });
    }
  } catch (error) {
    console.error('Error handling add equipe', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};





        // let equipe;

        // // Check if the team exists
        // if (equipeId) {
        //     equipe = await Equipe.findById(equipeId);
        //     if (!equipe) {
        //         console.log('Team not found, proceeding with signup only.');
        //     }
        // }

        // // If the team exists and the user is not already a member, add the user to the team
        // if (equipe && !existingUser.equipes.includes(equipeId)) {
        //     existingUser.equipes.push(equipeId);
        //     await existingUser.save();

        //     equipe.members.push({ memberId: existingUser._id });
        //     await equipe.save();
        // }



const UpdateEquipe = async (req, res) => {
  try {
      const data = await Equipe.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(201).json(data);
    
  } catch (error) {
    console.log(error.message);
  }
};


const getEquipesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const equipes = await Equipe.find({ $or: [{ 'owner': userId }, { 'members.memberId': userId }] })
                                  .populate('owner') 
                                  .populate('members.memberId')
                                  .exec();
    res.status(200).json(equipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


const getEquipesByOwner = async (req, res) => {
  try {
    const userId = req.params.userId;
    const equipes = await Equipe.find({ 'owner': userId })
                                  .populate('owner') 
                                  .populate('members.memberId')
                                  .exec();
    res.status(200).json(equipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}





const getListequipes = async (req, res) => {
  try {
    const equipes = await Equipe.find()
    res.status(200).json(equipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}





const getEquipesById = async (req, res) => {
  try {
    const{id}=req.params;
    const equipes = await Equipe.findById(id).populate('owner') 
    .populate('members.memberId')
    
    res.status(200).json(equipes);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

const deleteEquipeById = async (req, res) => {

  try {
    const equipeId = req.params.equipeId;

    await Equipe.findByIdAndDelete(equipeId);

     

    await User.updateMany({}, { $pull: { equipes: equipeId } });

    res.status(200).json({ message: ' the team is deleted' });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while leaving the equipe' });
  }
};

const leaveTeam = async (req, res) => {
  try {
    const equipeId = req.params.equipeId;
    const id = req.params.id; 
    // const io = req.io; 

    await User.updateMany({}, { $pull: { equipes: equipeId } });
    await Equipe.updateMany({ _id: equipeId }, { $pull: { members: { memberId: id } } });

    const updatedEquipe = await Equipe.findById(equipeId).populate('owner');

    // Fetch the updated list of projects for the user
    const equipes = await Equipe.find({
      $or: [
        { owner: id },
        { 'members.memberId': id }
      ]
    });

    const equipeIds = equipes.map(equipe => equipe._id);

    const projects = await Project.find({
      'Equipe': { $in: equipeIds }
    }).populate('Equipe').populate('Responsable', 'firstName profilePicture');
    req.io.emit('updateProjects', projects); // Emit updateProjects event

    res.status(200).json({ updatedEquipe, projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while leaving the team' });
  }
};




const signupAfterInvitation = async (req, res) => {

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
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    const { password, ...others } = newUser._doc;
    
      const equipeId = req.params.equipeId;
     
          const equipe = await Equipe.findById(equipeId);
          if (!equipe) {
              return res.status(404).json({ error: 'Team not found' });
          }
          // Add the user to the team
          newUser.equipes.push(equipeId);
          await newUser.save();
          //add members to equipess 
          equipe.members.push({ memberId: newUser._id });
          await equipe.save();


          return res.status(200).json({ user: others, token });

    } catch (error) {
      console.error('Error handling user signup:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
};




const addLink = async (req, res) => {
  try {
    const { equipeId } = req.params;
    const { webAddress, title, description } = req.body;

    const updatedEquipe = await Equipe.findByIdAndUpdate(
      equipeId,
      {
        $push: {
          links: { webAddress, title, description },
        },
      },
      { new: true }
    );

    if (!updatedEquipe) {
      return res.status(404).json({ error: 'Equipe not found' });
    }

    res.status(200).json(updatedEquipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the link' });
  }
};

const updateLink = async (req, res) => {
  try {
    const { equipeId, linkId } = req.params;
    const { webAddress, title, description } = req.body;

    const updatedEquipe = await Equipe.findOneAndUpdate(
      { _id: equipeId, 'links._id': linkId },
      {
        $set: {
          'links.$.webAddress': webAddress,
          'links.$.title': title,
          'links.$.description': description,
        },
      },
      { new: true }
    );

    if (!updatedEquipe) {
      return res.status(404).json({ error: 'Link not found or equipe not found' });
    }
    const updatedLink = updatedEquipe.links.find(link => link._id.toString() === linkId);

    res.status(200).json(updatedLink);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the link' });
  }
};


const getLinks = async (req, res) => {
  try {
    const { equipeId } = req.params;

    const equipe = await Equipe.findById(equipeId).select('links');

    if (!equipe) {
      return res.status(404).json({ error: 'Equipe not found' });
    }

    res.status(200).json(equipe.links);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the links' });
  }
};


const deleteLink = async (req, res) => {
  try {
    const { equipeId, linkId } = req.params;

    const updatedEquipe = await Equipe.findByIdAndUpdate(
      equipeId,
      {
        $pull: {
          links: { _id: linkId },
        },
      },
      { new: true }
    );

    if (!updatedEquipe) {
      return res.status(404).json({ error: 'Equipe not found' });
    }

    res.status(200).json(updatedEquipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the link' });
  }
};



module.exports = {
  createEquipe,
  getListequipes,
  getEquipesByOwner,
  getEquipesByUserId,
  UpdateEquipe,
  signupAfterInvitation,
  sendInvitations,
  sendEmail,
  signinAfterInvitation,
  addtoteam,
  deleteLink,
  getLinks,
  invitepeople,
  updateLink,
  addLink,
  leaveTeam,
  getEquipesById,
  deleteEquipeById,
  // Export other functions
};
