const express = require("express");
const adminController = require("../controllers/admin.controller");
const verifyJwt = require("../middleware/verifyJwt");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

router.use(verifyJwt);
router.use(verifyAdmin);

router
  .route('/order-count')
  .get(adminController.getOrderCount);

router
  .route('/order-count/week')
  .get(adminController.getOrderCountForWeek);

router
  .route('/order-sales')
  .get(adminController.getOrderSales)

router
  .route('/order-sales/week')
  .get(adminController.getOrderSalesForWeek)

router
  .route('/orders')
  .get(adminController.getOrderHistoryToday)


module.exports = router;