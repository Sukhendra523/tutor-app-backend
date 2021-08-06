const Student = require("../models/student");
const Tutor = require("../models/tutor");

exports.registerStudent = async (req, res) => {
  const { userId, classId, boardId, streamId } = req.body;

  try {
    const newStudent = new Student({
      user: userId,
      class: classId,
      board: boardId,
      stream: streamId,
    });
    const student = await (await newStudent.save())
      .populate("user")
      .populate("class")
      .populate("board")
      .populate("stream")
      .execPopulate();

    if (student) {
      res.status(201).json(student);
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Somthing goes wrong !! tyr again later",
    });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.params.userId })
      .populate("user")
      .populate("class")
      .populate("board")
      .populate("stream")
      .populate({
        path: "requestedTutors",
        populate: { path: "user" },
      })
      .populate({
        path: "tutors",
        populate: { path: "user" },
      });

    if (student) {
      res.status(200).json(student);
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Somthing goes wrong !! tyr again later",
    });
  }
};

exports.getAllStudent = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("user")
      .populate("class")
      .populate("board")
      .populate("stream")
      .populate("requestedTutors")
      .populate("tutors");

    if (students) {
      res.status(200).json(students);
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Somthing goes wrong !! tyr again later",
    });
  }
};

exports.sendRequest = async (req, res) => {
  try {
    const { studentId, tutorId } = req.body;
    const student = await Student.findByIdAndUpdate(studentId, {
      $push: { requestedTutors: tutorId },
    });
    const tutor = await Tutor.findByIdAndUpdate(tutorId, {
      $push: { studentRequests: studentId },
    }).populate("user", "firstName lastName");
    if (student && tutor) {
      res.status(200).json({
        message: `Request has sent Succeessfully${tutor.user.firstName} ${tutor.user.lastName}`,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Somthing goes wrong !! tyr again later",
    });
  }
};
