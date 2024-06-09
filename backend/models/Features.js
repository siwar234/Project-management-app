
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types


const featuresSchema = new mongoose.Schema(
  {
    titleF: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    iconF: {
        type: String,
        trim: true,
        default:'#ffc0ca'
    },
     
    Tickets:[
      { type: ObjectId, ref: 'Tickets' }
    ],
    
    
    
    projectId:
    { type: ObjectId, ref: 'Project' },
    
    
    }, { timestamps: true });

    
  
 
  
  module.exports = mongoose.model("Features", featuresSchema)
  
