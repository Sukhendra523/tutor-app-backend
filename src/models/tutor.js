const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema(
  {
    qualification: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    status: {
      type: String,
      enum: ["Pursuing", "Completed"],
      default: "Completed",
    },
    college: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    modeOfTeaching: {
      type: String,
      enum: ["Online", "Offline"],
      default: "Online",
    },
    language: {
      type: String,
      enum: ["English", "Hindi", "Both"],
      default: "English",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
    board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    timing: String,
    occupation: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    charges: {
      from: String,
      to: String,
    },
    studentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tutor", tutorSchema);
