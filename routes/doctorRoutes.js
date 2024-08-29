const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDocInfoController,
  updateProfileController,
} = require("../controllers/doctorctrl");
const router = express.Router();

// post single doc info

router.post("/getDoctorInfo", authMiddleware, getDocInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

module.exports = router;
