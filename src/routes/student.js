const express = require("express");
const { requireSignin, isStudent } = require("../common-middleware");

const {
  registerStudent,
  sendRequest,
  getStudent,
  getAllStudent,
} = require("../controller/student");

const router = express.Router();

router.use("/", requireSignin);

router.post("/registerStudent", isStudent, registerStudent);
router.get("/getAllStudent", getAllStudent);
router.post("/sendRequest", isStudent, sendRequest);
router.get("/getStudent/:userId", getStudent);

module.exports = router;
