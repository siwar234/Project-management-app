const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({

    
    type: { type: String },
    read: {
          type: Boolean,
          default: false,
        },
      responsible_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
  data: { type: mongoose.Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now ,
        expires: '30d' }
});
    

module.exports = mongoose.model('Notification', notificationSchema)