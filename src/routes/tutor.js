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

// router.options("/*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, Content-Type, Authorization, Content-Length, X-Requested-With, Accept"
//   );
//   res.sendStatus(200);
// });

router.get("/getAllTutor", getAllTutor);
router.use("/", requireSignin);

router.post("/registerTutor", isTutor, registerTutor);
router.post("/acceptRequest", isTutor, acceptStudentRequest);
router.post("/deleteRequest", isTutor, deleteRequest);
router.get("/getTutor/:userId", getTutor);

module.exports = router;
