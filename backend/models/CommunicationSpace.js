const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const CommunicationSpaceSchema = new mongoose.Schema(
  {
    Task: { type: ObjectId, ref: "Tasks" },
    Disscusionspace: {
      type: String,
      trim: true,
    },
    projectId: { type: ObjectId, ref: 'Project' },
    Privacy: {
      type: String,
      default: "privacy",
      trim: true,
    },
    posts: [
      {
        type: ObjectId,
        ref: 'Post'
      }
    ],
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Communication", CommunicationSpaceSchema);
