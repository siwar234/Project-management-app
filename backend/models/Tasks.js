
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { ObjectId } = mongoose.Schema.Types
const allowedTypes = ["Software development", "Marketing", "Design", "Human Resources"];


const taskstSchema = new mongoose.Schema(
  {
   

    TaskName: {
        type: String,
        trim: true,
    
      },
        

      Duration: {
        type: String,
      },
      
      StartDate :{
        type:Date
      },

      EndDate: {
        type:Date

      },

      projectId:
        { type: ObjectId, ref: 'Project' },
       
        
      related:
      { type: ObjectId, ref: 'Tasks' },

      ResponsibleTasks : { type: ObjectId, ref: 'User' },

      tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tickets' }]
   
      // tickets: [
      //   {
      //     Description: {
      //       type: String,
      //       trim: true,
      //     },
      //     ResponsibleTicket: {
      //       type: ObjectId,
      //       ref: 'User',
      //     },
      //     projectId: {
      //       type: ObjectId,
      //       ref: 'Project',
      //     },
      //     Etat: {
      //       type: String,
      //       trim: true,
      //     },
      //     flag: {
      //       type: String,
      //       trim: true,
      //     },
      //     Type: {
      //       type: String,
      //       trim: true,
      //     },
      //     Priority: {
      //       type: String,
      //       default: 'Low',
      //       trim: true,
      //     },
      //   },
      // ],   
    }, { timestamps: true });

    
  
 
  
  module.exports = mongoose.model("Tasks", taskstSchema)
  
