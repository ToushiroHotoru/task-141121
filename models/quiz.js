const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataQuiz = new Schema({
    questions: [],
}, );

const quiz = mongoose.model("quiz", dataQuiz);
module.exports = quiz;