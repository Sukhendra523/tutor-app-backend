const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

//Environment Variable
env.config();

//routes
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const tutorRoutes = require("./routes/tutor");

//using express application
const app = express();

//DB Connection

// Local Db connection string ==> mongoose.connect('mongodb://username:password@host:port/database?options...', {useNewUrlParser: true});
// Local DB connection string >> mongodb://localhost:27017/${process.env.MONGO_DB_DATABASE}
//Cloud DB connection string >> mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.eaa66.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority
mongoose
  .connect(`mongodb://localhost:27017/${process.env.MONGO_DB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log("ERROR :", error);
  });

//middlewares
app.use(cors());
app.use(express.json());

//rest api routes
app.use("/api", authRoutes);
app.use("/api", studentRoutes);
app.use("/api", tutorRoutes);

app.listen(process.env.PORT, () => {
  console.log(`SERVER is running at PORT = ${process.env.PORT}`);
});
