const { request } = require("express");
const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: `user not found`, success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: `Invalid Email or Password `, success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).send({ message: "Login Success ", success: true, token });
  } catch (error) {
    res.status(500).send({ message: `Error in login ctrl ${error.message}` });
  }
};

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User already exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "register successfully ", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        message: `Register Controller ${error.message}`,
      });
  }
};

// apply doctor controller

const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = new doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();

    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });

    await userModel.findByIdAndUpdate(adminUser._id, { notification });

    res.status(201).send({
      success: true,
      message: "Doctor Account Applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while applying for doctor",
    });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found ",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error ",
      success: false,
      error,
    });
  }
};

// notification controller 

const getAllNotificationController = async (req,res)=>{
    try{
       const user = await userModel.findOne({_id:req.body.userId})
       const seenNotification = user.seenNotification;
       const notification = user.notification 
       seenNotification.push(...notification)
       user.notification=[]
       user.seenNotification=notification
       const updatedUser =await user.save();
       res.status(200).send({
        success:true ,
        message:'all notification mark as read ',
        data : updatedUser,
       })
    }
    catch(error){
        res.status(500).send({
            message:'error in notification ',
            success:false,
            error 
        })

    }
}


// delete notification 

const deleteAllNotificationController= async(req,res)=>{
   try{
       const user = await userModel.findOne({_id:req.body.userId})
       user.notification=[]
       user.seenNotification=[]
       const updatedUsed = await user.save();
       updatedUsed.password = undefined;
       res.status(200).send({
        success:true,
        message:'notification deleted successfully',
        data:updatedUsed
       })
   }
   catch(error){
    console.log(error); 
     res.status(500).send({
      success:false,
      message:'unable to delete all notification',
      error
     })
   }
}

const getAllDocController=async (req,res)=>{
  try{
      const doctors = await doctorModel.find({status:'approved'})
      res.status(200).send({
        success:true,
        message:'docotrs List fetched successfully',
        data:doctors,
      })
  }
  catch(error){
   console.log(error);
   res.status(500).send({
    success:false,
    message:"Error while fetching doctor ",
    error
   })
  }
    
}


module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDocController,
};
