const express = require("express");
const menuItemController = require("../controllers/menu-item.controller");
const extraItemController = require("../controllers/extra-item.controller");
const imageUpload = require("../utils/image-upload");
const verifyJwt = require("../middleware/verifyJwt");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

router
  .route('/')
  .get(menuItemController.getAllMenuItems)
  .post(verifyJwt, verifyAdmin, imageUpload, menuItemController.createMenuItem);

router
  .route('/:id')
  .get(menuItemController.getMenuItem)
  .patch(verifyJwt, verifyAdmin, imageUpload, menuItemController.updateMenuItem)
  .delete(verifyJwt, verifyAdmin, menuItemController.deleteMenuItem);

router
  .route('/:mid/extra-items')
  .get(extraItemController.getAllExtraItems)
  .post(extraItemController.createExtraMenuItem);

router
  .route('/:mid/extra-items/:eid')
  .post(extraItemController.addExtraMenuItem)
  .delete(extraItemController.deleteExtraMenuItem);


module.exports = router;