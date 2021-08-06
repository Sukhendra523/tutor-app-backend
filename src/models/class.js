const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, minLength: 3, maxLength: 20 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
