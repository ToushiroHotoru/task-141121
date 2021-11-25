const express = require("express");
const dataFormController = require("../controllers/dataFormController");

const router = express.Router();

router.get("/get-data", dataFormController.get_data);
router.post("/add-data-city", dataFormController.add_data_city);
router.post("/edit-data-city", dataFormController.edit_data_city);
router.delete("/delete-data-city", dataFormController.delete_data_city);
// router.post("/edit-data-name", dataFormController.edit_data_name);
// router.post("/edit-data-salon", dataFormController.edit_data_salon);
// router.delete("/delete-data", answerController.save_answer);

module.exports = router;
