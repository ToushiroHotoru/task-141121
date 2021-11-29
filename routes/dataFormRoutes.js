const express = require("express");
const dataFormController = require("../controllers/dataFormController");

const router = express.Router();

// router.get("/get-data", dataFormController.get_data);
router.post("/add-data-city", dataFormController.add_data_city);
router.post("/edit-data-city", dataFormController.edit_data_city);
router.delete("/delete-data-city", dataFormController.delete_data_city);
router.post("/add-data-company", dataFormController.add_data_company);
router.post("/edit-data-company", dataFormController.edit_data_company);
router.delete("/delete-data-company", dataFormController.delete_data_company);
router.post("/add-data-worker", dataFormController.add_data_worker);
router.post("/edit-data-worker", dataFormController.edit_data_worker);
router.delete("/delete-data-worker", dataFormController.delete_data_worker);

module.exports = router;
