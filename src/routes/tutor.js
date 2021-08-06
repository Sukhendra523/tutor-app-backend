const express = require("express");

const {
  registerTutor,
  acceptStudentRequest,
  getTutor,
  getAllTutor,
  deleteRequest,
} = require("../controller/tutor");

const router = express.Router();

router.post("/registerTutor", registerTutor);
router.get("/getAllTutor", getAllTutor);
router.post("/acceptRequest", acceptStudentRequest);
router.post("/deleteRequest", deleteRequest);
router.get("/getTutor/:userId", getTutor);

module.exports = router;
