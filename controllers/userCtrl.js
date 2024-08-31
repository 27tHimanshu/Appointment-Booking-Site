const { request } = require("express");
const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");

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
    res.status(500).send({
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

const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification mark as read ",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "error in notification ",
      success: false,
      error,
    });
  }
};

// delete notification

const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updatedUsed = await user.save();
    updatedUsed.password = undefined;
    res.status(200).send({
      success: true,
      message: "notification deleted successfully",
      data: updatedUsed,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notification",
      error,
    });
  }
};

const getAllDocController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "docotrs List fetched successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching doctor ",
      error,
    });
  }
};

const bookAppointmentController = async (req, res) => {
  try {
    // Set the initial status for the new appointment
    req.body.status = "pending";
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();

    // Create a new appointment document
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();

    // Find the user by ID
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId }); // Use findOne instead of findByOne

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Add a new notification to the user's notifications array
    user.notification.push({
      type: "New-Appointment-request",
      message: `A New Appointment Request From ${req.body.userInfo.name}`,
      onClickPath: "/user/appointments",
    });

    // Save the updated user document
    await user.save();

    // Send success response
    res.status(200).send({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).send({
      success: false,
      message: "Error while booking appointment",
      error: error.message, // Send error message for security reasons
    });
  }
};

const bookingAvailabilityContrller = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.bbody.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.bbody.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time:{
        $get: fromTime , $let:toTime 
      },
    });
    if( appointments.length > 0){
        return res.status(200).send({
          message : ' Appointment not available at this time ',
          success : true , 
        })
    }
    else{
      return res.status(200).send({
        message:' appointment available  ',
        success: true,

      })
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "booking availability error",
      error,
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDocController,
  bookAppointmentController,
  bookingAvailabilityContrller,
};
