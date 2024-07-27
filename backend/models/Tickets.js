
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { ObjectId } = mongoose.Schema.Types
const allowedTypes = ["Software development", "Marketing", "Design", "Human Resources"];


const TicketsSchema = new mongoose.Schema(
  {
   

    Description: {
        type: String,
        trim: true,
    
      },
      
      EstimatedDuration: {
        type: String,
      },
      
      descriptionticket: {
        imageD: [{
          type: String,
          trim: true,
        }],
        descriptionText: {
          type: String,
          trim: true,
        }
      },
      
      CoverImage: [{
        colorimage: {
          type: String,
          trim: true,
        },
        size :{
          type: String,
          trim: true,
        }
    }],
    position: {
      type: Number,
     
    },
     
    featureid: { type: ObjectId, ref: 'Features' },
      
      ResponsibleTicket : { type: ObjectId, ref: 'User' },


    //   EndDate: {
    //     type:Date

    //   },

    projectId:
    { type: ObjectId, ref: 'Project' },

      TaskId:
        { type: ObjectId, ref: 'Tasks' },

        Etat : {
            type: String,
            trim: true,
        
          },
          votes: [{
            type: ObjectId,
            ref: 'User' 
          }],

        flag :   { type: Boolean },
        

        
        Type :{
          type: String,
          trim: true,
          default:"Task"
      },
      User :{ type: mongoose.Schema.Types.ObjectId,ref: 'User'},

     comments: [{
  commenterId: {
    type: ObjectId,
    ref: 'User'
  },
  comment: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}],


      Feature:
        { type: ObjectId, ref: 'Features' },
      
       
        Priority :{type: String,
          default:"Low",
        trim: true,}
            


    
   
    }, { timestamps: true });

    
  
 
  
  module.exports = mongoose.model("Tickets", TicketsSchema)
  
