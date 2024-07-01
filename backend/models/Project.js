
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { ObjectId } = mongoose.Schema.Types
const allowedTypes = ["Software development", "Marketing", "Design", "Human Resources"];


const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      trim: true,
  
    },
    
    descriptionProject: {
      type: String,
      trim: true,
  
    },

    Icon: { type: String },

  
    Equipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipe' },
    
    Responsable: { type: ObjectId, ref: 'User' },


     type: {
    type: String,
    },
          
    User :{ type: mongoose.Schema.Types.ObjectId,ref: 'User'},


        

    
   
   
    }, { timestamps: true });

    
  
 
  
  module.exports = mongoose.model("Project", projectSchema)
  
