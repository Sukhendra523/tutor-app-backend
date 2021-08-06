const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    fatherFirstName: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    fatherLastName: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },
    dateOfBirth: Date,
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    address: {
      type: String,
      trim: true,
      minLength: 5,
      maxLength: 50,
    },
    city: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    pincode: { type: Number, trim: true, minLength: 5, maxLength: 10 },
    role: {
      type: String,
      enum: ["student", "tutor", "admin"],
      default: "student",
    },
    mobile: {
      type: Number,
      minLength: 10,
      minLength: 10,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model("User", userSchema);
