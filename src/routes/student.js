const express = require("express");
const { requireSignin, isStudent } = require("../common-middleware");

const {
  registerStudent,
  sendRequest,
  getStudent,
  getAllStudent,
} = require("../controller/student");

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

router.use("/", requireSignin);

router.post("/registerStudent", isStudent, registerStudent);
router.get("/getAllStudent", getAllStudent);
router.post("/sendRequest", isStudent, sendRequest);
router.get("/getStudent/:userId", getStudent);

module.exports = router;
