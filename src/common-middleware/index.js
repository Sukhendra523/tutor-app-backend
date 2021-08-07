const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.LOGIN_SECRET_KEY);
    req.user = user;
  } else {
    return res
      .status(401)
      .json({ status: 401, success: false, message: "Sign In Required" });
  }
  next();
};

exports.isMobileAuthenticated = (req, res, next) => {
  if (req.headers.authorization) {
    const mobileAuthToken = req.headers.authorization.split(" ")[1];
    const mobile = jwt.verify(
      mobileAuthToken,
      process.env.MOBILE_AUTH_SECRET_KEY
    );
    req.mobile = mobile;
  } else {
    return res.status(401).json({
      status: 401,
      success: false,
      message: "Mobile Number is Not Authenticated",
    });
  }
  next();
};

exports.isStudent = (req, res, next) => {
  if (req.user.role !== "student") {
    return res.status(400).json({ message: "Student Acces denied" });
  }
  next();
};

exports.isTutor = (req, res, next) => {
  if (req.user.role !== "tutor") {
    return res.status(400).json({ message: "Teacher Acces denied" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: " Admin Acces denied" });
  }
  next();
};
