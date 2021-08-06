const express = require("express");
const { requireSignin, isTutor } = require("../common-middleware");

const {
  registerTutor,
  acceptStudentRequest,
  getTutor,
  getAllTutor,
  deleteRequest,
} = require("../controller/tutor");

const router = express.Router();

router.get("/getAllTutor", getAllTutor);
router.use("/", requireSignin);

router.post("/registerTutor", isTutor, registerTutor);
router.post("/acceptRequest", isTutor, acceptStudentRequest);
router.post("/deleteRequest", isTutor, deleteRequest);
router.get("/getTutor/:userId", getTutor);

module.exports = router;
