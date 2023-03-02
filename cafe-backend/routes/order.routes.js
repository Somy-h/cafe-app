const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();
const verifyJwt = require("../middleware/verifyJwt");

router
  .route('/')
  .get(orderController.getAllOrders)
  .post(verifyJwt, orderController.createOrder);

router
  .route('/:id')
  .get(orderController.getOrder)

router
  .route('/:id/extra-items')
  .get(orderController.getOrderDetail)
module.exports = router;