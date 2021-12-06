const express = require("express");
const quizController = require("../controllers/quizController");

const router = express.Router();

const isAdminFunc = (req, res, next) => {
  if (req.body.isAdmin == "true") {
    console.log(req.body.isAdmin);
    next();
  } else {
    throw new Error("You don't have permission to these actions");
  }
};

router.get("/get-quiz", quizController.get_quiz);
router.post("/create-quiz", isAdminFunc, quizController.create_quiz);
router.post("/edit-quiz", isAdminFunc, quizController.edit_quiz);
router.delete("/delete-quiz", isAdminFunc, quizController.delete_quiz);

module.exports = router;
