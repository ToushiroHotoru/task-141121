const express = require("express");
const dataFormController = require("../controllers/dataFormController");

const router = express.Router();

router.get("/get-data", dataFormController.get_data);
// router.post("/create-data", dataFormController.create_data);
// router.post("/edit-data-name", dataFormController.edit_data_name);
// router.post("/edit-data-salon", dataFormController.edit_data_salon);
// router.post("/edit-data-department", dataFormController.edit_data_department);
// router.delete("/delete-data", answerController.save_answer);

module.exports = router;
