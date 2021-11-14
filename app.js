const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.use((req, res) => {
  res.status(404).render("404");
});

const dbURI =
  "mongodb+srv://toushiro:asagilove@cluster0.ssuiv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(5000))
  .catch((err) => console.log(err));
