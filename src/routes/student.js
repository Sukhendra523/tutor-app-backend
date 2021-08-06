const express = require("express");

const {
  registerStudent,
  sendRequest,
  getStudent,
  getAllStudent,
} = require("../controller/student");

const router = express.Router();

router.post("/registerStudent", registerStudent);
router.get("/getAllStudent", getAllStudent);
router.post("/sendRequest", sendRequest);
router.get("/getStudent/:userId", getStudent);
module.exports = router;
