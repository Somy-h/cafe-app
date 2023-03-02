const express = require("express");
const categoryController = require("../controllers/category.controller");
const menuItemController = require("../controllers/menu-item.controller");
const verifyJwt = require("../middleware/verifyJwt");
const verifyAdmin = require("../middleware/verifyAdmin");

const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(verifyJwt, verifyAdmin, categoryController.createCategory);


// router
//   .route('/:id')
//   .get(categoryController.getCategory)
//   .patch(verifyJwt, verifyAdmin, categoryController.updateCategory)
//   .delete(verifyJwt, verifyAdmin, categoryController.deleteCategory);

router
  .route('/:cid/menu-items')
  .get(menuItemController.getAllMenuItems);

//FOR TESTING
router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(verifyJwt, verifyAdmin, categoryController.updateCategory)
  .delete(verifyJwt, verifyAdmin, categoryController.deleteCategory);



module.exports = router;