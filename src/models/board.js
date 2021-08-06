const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    name:{type: String,
        trim: true,
        minLength: 3,
        maxLength: 20,}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Board", boardSchema);