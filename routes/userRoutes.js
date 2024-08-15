const express=require('express');
const {loginController, registerController} = require('../controllers/userCtrl');


// router object 
const router = express.Router()

// routes 
// login post 
router.post('/login' , loginController);


// register post
router.post( '/register' , registerController);
module.exports = router

