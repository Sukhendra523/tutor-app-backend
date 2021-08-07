const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Class = require("../models/class");
const Board = require("../models/board");
const Stream = require("../models/stream");
const Subject = require("../models/subject");
const env = require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);
exports.sendOTP = async (req, res) => {
  const { mobile } = req.body;
  console.log("Mobile :::", mobile);

  try {
    const response = await client.verify
      .services(process.env.TWILIO_SERVICE_ID)
      .verifications.create({
        to: `+91${mobile}`,
        channel: "sms",
      });
    response &&
      res.status(200).json({
        status: 200,
        success: true,
        message: "verifaction Code has sent to your mobile number",
      });
  } catch (error) {
    res.status(400).json({
      error: error,
      message: "Somthing goes wrong !! tyr again later",
    });
  }
};

exports.verifyOTP = async (req, res, next) => {
  const { mobile, code } = req.body;

  try {
    const response = await client.verify
      .services(process.env.TWILIO_SERVICE_ID)
      .verificationChecks.create({
        to: `+91${mobile}`,
        code: code,
      });
    response && response.status == "approved"
      ? next()
      : res.status(403).json({ message: "Incorrect OTP Please Try again" });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Somthing goes wrong !! tyr again later",
    });
  }
};

exports.signin = async (req, res) => {
  const { mobile } = req.body;
  try {
    const user = await User.findOne({
      mobile,
    });

    if (user) {
      const token = jwt.sign(
        { mobile: user.mobile, _id: user._id, role: user.role },
        process.env.LOGIN_SECRET_KEY,
        { expiresIn: "1d" }
      );
      res.status(200).json({
        token,
        user,
      });
    } else {
      const mobileAuthToken = jwt.sign(
        { mobile: mobile },
        process.env.MOBILE_AUTH_SECRET_KEY,
        {
          expiresIn: "20m",
        }
      );
      res.status(200).json({
        mobileAuthToken,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Somthing goes wrong !! tyr again later",
    });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const {
      mobile,
      firstName,
      lastName,
      fatherFirstName,
      fatherLastName,
      gender,
      dateOfBirth,
      email,
      address,
      city,
      pincode,
      role,
    } = req.body;

    const emailExits = await User.findOne({ email: email }, "email");
    if (emailExits) {
      return res.status(403).json({
        message: "This email already Exists",
      });
    }
    const newUser = new User({
      mobile,
      firstName,
      lastName,
      fatherFirstName,
      fatherLastName,
      gender,
      dateOfBirth,
      email,
      address,
      city,
      pincode,
      role,
    });
    const user = await newUser.save();

    const token = jwt.sign(
      { mobile: user.mobile, _id: user._id, role: user.role },
      process.env.LOGIN_SECRET_KEY,
      { expiresIn: "1d" }
    );
    if (user) {
      res.status(201).json({
        status: 201,
        success: true,
        token,
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Somthing goes wrong !! tyr again later",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const class_ = await Class.create([
      { name: "1st" },
      { name: "2nd" },
      { name: "3rd" },
      { name: "4th" },
      { name: "5th" },
      { name: "6th" },
      { name: "7th" },
      { name: "8th" },
      { name: "9th" },
      { name: "10th" },
      { name: "11th" },
      { name: "12th" },
    ]);
    const board = await Board.create([
      { name: "CBSE" },
      { name: "ICSE" },
      { name: "State" },
    ]);
    const stream = await Stream.create([
      { name: "PCM" },
      { name: "PCB" },
      { name: "Com." },
      { name: "Arts" },
    ]);
    const subject = await Subject.create([
      { name: "Mathematics" },
      { name: "Physics" },
      { name: "Chemistry" },
      { name: "Biology" },
      { name: "Computer Science" },
      { name: "History" },
      { name: "Geography" },
      { name: "Ecomnomics" },
      { name: "Civics" },
      { name: "English" },
      { name: "Hindi" },
      { name: "Sanskrit" },
    ]);

    if (class_ && board && stream && subject) {
      res.status(200).json({ class_, board, stream, subject });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Somthing goes wrong !! tyr again later",
    });
  }
};

exports.getALLClass = async (req, res) => {
  try {
    const classes = await Class.find();
    if (classes) {
      res.status(200).json(classes);
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Somthing goes wrong !! tyr again later",
    });
  }
};

exports.getALLBoard = async (req, res) => {
  try {
    const boards = await Board.find();
    if (boards) {
      res.status(200).json(boards);
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Somthing goes wrong !! tyr again later",
    });
  }
};

exports.getALLStream = async (req, res) => {
  try {
    const streams = await Stream.find();
    if (streams) {
      res.status(200).json(streams);
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Somthing goes wrong !! tyr again later",
    });
  }
};

exports.getALLSubject = async (req, res) => {
  try {
    const subjects = await Subject.find();
    if (subjects) {
      res.status(200).json(subjects);
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Somthing goes wrong !! tyr again later",
    });
  }
};
