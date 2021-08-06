const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
    board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
    stream: { type: mongoose.Schema.Types.ObjectId, ref: "Stream" },
    requestedTutors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tutor" }],
    tutors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tutor" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
