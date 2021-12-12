const Quiz = require("../models/quiz");

const get_quiz = async (req, res) => {
  try {
    const result = await Quiz.find().lean();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

const create_quiz = async (req, res) => {
  const quizNewData = new Quiz(req.body);
  try {
    await quizNewData.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const edit_quiz = async (req, res) => {
  try {
    const id = req.body.id;
    const quizNewData = req.body.quizNewData;
    const responsePerson = req.body.responsePerson;
    const spectatePerson = req.body.spectatePerson;
    let quiz = await Quiz.findOne({ _id: id });
    quiz.note = quizNewData;
    quiz.responsePerson = responsePerson;
    quiz.spectatePerson = spectatePerson;
    await quiz.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const delete_quiz = async (req, res) => {
  try {
    const id = req.body.id;
    await Quiz.findOne({ _id: id }).remove().exec();
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  get_quiz,
  create_quiz,
  edit_quiz,
  delete_quiz,
};
