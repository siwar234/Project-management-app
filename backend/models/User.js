
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { ObjectId } = mongoose.Schema.Types


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
  
    },
    
    isBanned: Date,

    isAdmin: { type: Boolean, default: false },

    ProfileInformation: { type: String },
    Location: { type: String },
    organisation: { type: String },


    // id: String,

    // lastName: {
    //   type: String,
    //   trim: true,
  
    // },

    // phone: { type: String },


    email: {
      type: String,
  
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
          message: props => `${props.value} is not a valid email address!`
        }
    },
    password: { type: String },


    profilePicture: { type: String },

    secret: {
      type: String,





    },


    googleId: {
      type: String,
      trim: true



    },

    Roles: [
        {
          role: { type: ObjectId, ref: "Role" },
          name: String,
        },
      ],
    // Roles: { type: String, default: "admin" },

    equipes: [{ type: ObjectId, ref: "Equipe" }] 

    }, { timestamps: true });

    
  
 
  
  module.exports = mongoose.model("User", userSchema)
  
