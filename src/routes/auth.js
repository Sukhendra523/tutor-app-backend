const express = require("express");
const {
  requireSignin,
  isAdmin,
  isMobileAuthenticated,
} = require("../common-middleware");

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

router.options("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Authorization, Content-Length, X-Requested-With, Accept"
  );
  res.sendStatus(200);
});

router.post("/sendOTP", sendOTP);
router.post("/signin", verifyOTP, signin);
router.post("/registerUser", isMobileAuthenticated, registerUser);
router.post("/create", requireSignin, isAdmin, create);
router.get("/classes", getALLClass);
router.get("/boards", getALLBoard);
router.get("/streams", getALLStream);
router.get("/subjects", getALLSubject);

module.exports = router;
