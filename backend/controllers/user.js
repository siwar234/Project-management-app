const mongoose = require("mongoose");
const User=require('../models/User');



exports.banUser = async (req, res) => {
    const { userID, banDate } = req.body;
  
    // Validate if banDate is a valid date
    if (!banDate || isNaN(new Date(banDate))) {
      return res
        .status(400)
        .send({ success: false, error: "Invalid date format for banDate" });
    }
  
    // check if user exists in the database
    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(userID) });
    if (!user) {
      return res.status(404).send({ success: false, error: "User not found" });
    }
  
    // ban user
    user.isBanned = new Date(banDate);
    await user.save();

    const updatedUsers = await User.find(); 

    res.status(200).json({ updatedUsers });
  };

  

  exports.unbanUser = async (req, res) => {
    const { userID } = req.body;
  
    // check if user exists in the database
    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(userID) });
    if (!user) {
      return res.status(404).send({ success: false, error: "User not found" });
    }
  
    // check if user is already unbanned
    if (user.isBanned == null || user.isBanned < new Date()) {
      return res
        .status(400)
        .send({ success: false, error: "User is already unbanned" });
    }
  
    // unban user
    user.isBanned = null;
    await user.save();
  
    res.status(200).json({ user });
  };



  //get list user 
  exports.getListUser = async (req, res) => {
    try {
        const users = await User.find({ isAdmin: false });
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


//GET USER BY ID 
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate({
      path: 'equipes',
      populate: { path: 'members.memberId', model: 'User' }
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}



 exports.UpdateUser = async (req, res) => {
    try {
        const data = await User.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true }
        );
        res.status(201).json(data);
      
    } catch (error) {
      console.log(error.message);
    }
  };







