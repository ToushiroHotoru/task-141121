const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dataFormRoutes = require("./routes/dataFormRoutes");
const quizRoutes = require("./routes/quizRoutes");
const answerRoutes = require("./routes/answerRoutes");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/quiz", quizRoutes);
app.use("/answer", answerRoutes);
app.use(dataFormRoutes);

app.use((req, res) => {
  res.status(404).redirect("/");
});
