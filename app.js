const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const DataForm = require("./models/dataForms");
const Quiz = require("./models/quiz");

const app = express();

const dbURI =
  "mongodb+srv://toushiro:asagilove@cluster0.ssuiv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/all-data", async (req, res) => {
  try {
    const data = await DataForm.find();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.post("/quiz", async (req, res) => {
  const quiz = new Quiz(req.body);
  try {
    await quiz.save();
  } catch (err) {
    console.log(err);
  }
});

app.use((req, res) => {
  res.status(404).redirect("/");
});
