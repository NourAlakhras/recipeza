const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();


router.post("/signup", authController.postSignup);

router.post("/login", authController.postLogin);

router.get("/logout", authController.logout);

module.exports = router;