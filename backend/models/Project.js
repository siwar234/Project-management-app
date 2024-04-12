
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { ObjectId } = mongoose.Schema.Types
const allowedTypes = ["Software development", "Marketing", "Design", "Human Resources", "Custom"];


const projectSchema = new mongoose.Schema(
  {
    NameProject: {
      type: String,
      trim: true,
  
    },
    
    descriptionProject: {
      type: String,
      trim: true,
  
    },
  
    equipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipe' },

    
        Responsable:{type:ObjectId,ref:'User'},

        TypeProject: {
            type: String,
            enum: allowedTypes,
            default: 'Custom'
          },
          
     


        

    
   
   
    }, { timestamps: true });

    
  
 
  
  module.exports = mongoose.model("Project", projectSchema)
  
