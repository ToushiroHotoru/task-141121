const express = require("express");
const answerController = require("../controllers/answerController");

const router = express.Router();

router.post("/get-answer", answerController.get_answer);
router.post("/save-answer", answerController.save_answer);

module.exports = router;
