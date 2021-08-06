const Tutor = require("../models/tutor");
const Student = require("../models/student");

exports.registerTutor = async (req, res) => {
  try {
    const {
      qualification,
      status,
      college,
      modeOfTeaching,
      language,
      userId,
      classId,
      boardId,

      subjectId,
      timing,
      occupation,
      charges,
    } = req.body;

    const newTutor = new Tutor({
      qualification,
      status,
      college,
      modeOfTeaching,
      language,
      user: userId,
      class: classId,
      board: boardId,

      subject: subjectId,
      timing,
      occupation,
      charges,
    });
    const tutor = await newTutor.save();

    if (tutor) {
      res.status(201).json({
        tutor,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Somthing goes wrong !! tyr again later",
    });
  }
};

exports.getTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findOne({ user: req.params.userId })
      .populate("user")
      .populate("class")
      .populate("board")
      .populate("stream")
      .populate("subject")
      .populate({
        path: "studentRequests",
        populate: { path: "user class board stream" },
      })
      .populate({
        path: "students",
        populate: { path: "user class board stream" },
      });

    if (tutor) {
      res.status(200).json(tutor);
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Somthing goes wrong !! tyr again later",
    });
  }
};

exports.getAllTutor = async (req, res) => {
  try {
    const tutors = await Tutor.find()
      .populate("user")
      .populate("class")
      .populate("board")
      .populate("stream")
      .populate("subject");
    if (tutors) {
      res.status(200).json(tutors);
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Somthing goes wrong !! tyr again later",
    });
  }
};

exports.acceptStudentRequest = async (req, res) => {
  try {
    const { studentId, tutorId } = req.body;
    const student = await Student.findByIdAndUpdate(studentId, {
      $push: { tutors: tutorId },
    });
    const tutor = await Tutor.findByIdAndUpdate(tutorId, {
      $push: { students: studentId },
    });

    if (student && tutor) {
      const _student = await Student.findByIdAndUpdate(studentId, {
        $pull: { requestedTutors: tutorId },
      }).populate("user", "firstName lastName");
      const _tutor = await Tutor.findByIdAndUpdate(tutorId, {
        $pull: { studentRequests: studentId },
      });
      if (_student && _tutor) {
        res.status(200).json({
          message: `${_student.user.firstName} ${_student.user.lastName} Request Accepted`,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Somthing goes wrong !! tyr again later",
    });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    const { studentId, tutorId } = req.body;

    const student = await Student.findByIdAndUpdate(studentId, {
      $pull: { requestedTutors: tutorId },
    }).populate("user", "firstName lastName");
    const tutor = await Tutor.findByIdAndUpdate(tutorId, {
      $pull: { studentRequests: studentId },
    });
    if (student && tutor) {
      res.status(200).json({
        message: `${student.user.firstName} ${student.user.lastName} Request Deleted`,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Somthing goes wrong !! tyr again later",
    });
  }
};
