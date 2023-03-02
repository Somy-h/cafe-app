const express = require('express');
const userController = require('../controllers/user.controller');
const orderController = require('../controllers/order.controller');
const router = express.Router();
const verifyJwt = require('../middleware/verifyJwt');

router.param('id', verifyJwt);

router.post('/', userController.signUp);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(verifyJwt, userController.updateUser); 

router
  .route('/:id/orders')
  .get(verifyJwt, orderController.getUserOrderHistory)

module.exports = router;