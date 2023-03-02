const express = require("express");
const extraItemController = require("../controllers/extra-item.controller");
const router = express.Router();

router
  .route('/')
  .get(extraItemController.getAllExtraItems)
  .post(extraItemController.createExtraItem);

router
  .route('/:id')
  .get(extraItemController.getExtraItem)
  .patch(extraItemController.updateExtraItem)
  .delete(extraItemController.deleteExtraItem);

module.exports = router;