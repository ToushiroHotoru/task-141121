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
  console.log(req.body);
  try {
    await quizNewData.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const edit_quiz = async (req, res) => {
  try {
    const quizOldData = req.body.quizOldData;
    const quizNewData = req.body.quizNewData;
    await Quiz.findOneAndUpdate(
      { note: quizOldData },
      { $set: { note: quizNewData } }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const delete_quiz = async (req, res) => {
  try {
    const quizOldData = req.body.quizOldData;
    await Quiz.findOne({ note: quizOldData }).remove().exec();
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
