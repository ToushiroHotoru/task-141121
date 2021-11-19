const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const DataForm = require("./models/dataForms");
const Quiz = require("./models/quiz");
const AnswerForm = require("./models/answerForm");

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

app.get("/quiz", async (req, res) => {
  try {
    const result = await Quiz.find().lean();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.post("/answer", async (req, res) => {
  console.log("работает");
  console.log(req.body);
  const data = new AnswerForm(req.body);

  try {
    await data.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
});

app.use((req, res) => {
  res.status(404).redirect("/");
});
