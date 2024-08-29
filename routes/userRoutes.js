const express = require("express");
const {
  loginController,
  authController,
  registerController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDocController,
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

// apply doctor or post
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// Notification

router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

// Notification

router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);




// get all docs 
router.get('/getAllDocs',authMiddleware,getAllDocController);


module.exports = router;
