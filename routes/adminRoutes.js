const express = require('express')
const authMiddleware = require("../middlewares/authMiddleware");
const { getAllUserController, getAllDoctorsController } = require('../controllers/adminCtrl');

const router = express.Router();

// get method || users 

router.get('/getAllUsers',authMiddleware,getAllUserController)

// get method || doctors 
router.get('/getAllDoctors',authMiddleware, getAllDoctorsController)


module.exports=router;