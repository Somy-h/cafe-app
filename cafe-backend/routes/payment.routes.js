const express = require("express");
const verifyJwt = require("../middleware/verifyJwt");
const paymentController = require("../controllers/payment.controller");
const router = express.Router();

router.post('/', verifyJwt, paymentController.createPaymentIntent);

module.exports = router;