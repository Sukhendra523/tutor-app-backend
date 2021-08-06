const express = require("express");

const {
  sendOTP,
  verifyOTP,
  signin,
  registerUser,

  create,
  getALLClass,
  getALLStream,
  getALLSubject,
  getALLBoard,
} = require("../controller/auth");

const router = express.Router();

router.post("/sendOTP", sendOTP);
router.post("/signin", verifyOTP, signin);
router.post("/registerUser", registerUser);
router.post("/create", create);
router.get("/classes", getALLClass);
router.get("/boards", getALLBoard);
router.get("/streams", getALLStream);
router.get("/subjects", getALLSubject);

module.exports = router;
