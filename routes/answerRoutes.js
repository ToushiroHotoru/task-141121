const express = require("express");
const answerController = require("../controllers/answerController");

const router = express.Router();

router.post("/answer", answerController.get_answer);
router.post("/search-answer", answerController.search_answer);

module.exports = router;
