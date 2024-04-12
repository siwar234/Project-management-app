
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { ObjectId } = mongoose.Schema.Types


const equipeSchema = new mongoose.Schema(
  {
    NameEquipe: {
      type: String,
      trim: true,
  
    },
    
    description: {
      type: String,
      trim: true,
  
    },
    
        owner:{type:ObjectId,ref:'User'},

        
     

   members:  {     
    type: [
     {
      memberId:{type:ObjectId,ref:'User'},      
     }
   ],
 },

   emails: [{
    email: {
      type: String,
      validate: {
        validator: function(v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    // user: [{
    //   userd :{type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User' },
    //   tokenused: { type: Boolean, default: false }

    // }]
  }]
   
   
    }, { timestamps: true });

    
  
 
  
  module.exports = mongoose.model("Equipe", equipeSchema)
  
