const express = require("express");
const {
  loginController,
  authController,
  registerController,
  applyDoctorController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

// router object
const router = express.Router();

// routes
// login post
router.post("/login", loginController);

// register post
router.post("/register", registerController);

// Auth || post

router.post("/getUserData", authMiddleware, authController);

// apply doctor 
router.post('/apply-doctor ',authMiddleware , applyDoctorController );

module.exports = router;
