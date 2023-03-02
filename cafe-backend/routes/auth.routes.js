const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const verifyJwt = require("../middleware/verifyJwt");

router.post("/", authController.signIn);

router.patch("/:id", verifyJwt, authController.logout);

module.exports = router;
