const express = require("express");
const quizController = require("../controllers/quizController");

const router = express.Router();

router.get("/get-quiz", quizController.get_quiz);
router.post("/create-quiz", quizController.create_quiz);
router.post("/edit-quiz", quizController.edit_quiz);
router.delete("/delete-quiz", quizController.delete_quiz);

module.exports = router;
