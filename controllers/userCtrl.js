const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/appointmentModel');
const moment = require('moment');

//register callback
const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(200).send({ message: "User Already Exists.", success: false });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({ message: "Registered Successfully!", success: true });
    } catch (error) {
        res.status(500).send({ success: false, message: `Register Controller ${error.message}` });
    }
}

//login callback
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ message: "User Not Found!", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({ message: "Invalid Email or Password", success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        res.status(200).send({ message: "Successfully Loggedin.", success: true, token });
    } catch (error) {
        res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
    }
}

const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res.status(200).send({
                message: "User Not Found!",
                success: false
            });
        }
        else {
            res.status(200).send({
                success: true,
                data: user
            });
        }
    } catch (error) {
        res.status(500).send({ message: "Auth Error", success: false, error });
    }
};

//Apply doctor controller
const applyDoctorController = async (req, res) => {
    try {
        const newDoctor = await doctorModel({ ...req.body, status: "Pending" });
        await newDoctor.save();
        const adminUser = await userModel.findOne({ isAdmin: true });
        const notification = adminUser.notification;
        notification.push({
            type: "apply-doctor-request",
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor Profile.`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        });
        await userModel.findByIdAndUpdate(adminUser._id, { notification });
        res.status(201).send({
            success: true,
            message: "Successfully applied for doctor profile"
        })
    } catch (error) {
        res.status(500).send({ message: "Error while applying for doctor", success: false, error });
    }
};

//read Notification controller
const getAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        const seennotification = user.seennotification;
        const notification = user.notification;
        seennotification.push(...notification);
        user.notification = [];
        user.seennotification = notification;
        const updatedUser = await user.save();
        res.status(200).send({
            success: true,
            message: "All notification marked as read.",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).send({ message: "Error in notification", success: false, error });
    }
};

//delete notifications controller
const deleteAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        user.notification = [];
        user.seennotification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "All notification deleted successfully.",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).send({ message: "Unable to delete all notification", success: false, error });
    }
};

//Get all doctor on homepage for patient
const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({ status: 'approved' });
        res.status(200).send({
            success: true,
            message: 'Doctors List fetched successfully.',
            data: doctors,
        });
    } catch (error) {
        res.status(500).send({ message: "Unable to Fetch Doctors List.", success: false, error });
    }
};

// Book Appointment
const bookAppointmentController = async (req, res) => {
    try {
        req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        req.body.time = moment(req.body.time, "HH:mm").toISOString();
        req.body.status = 'pending';
        const newAppointment = new appointmentModel(req.body);
        await newAppointment.save();
        const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
        user.notification.push({
            type: "New-appointment-request",
            message: `A new appointment request from ${req.body.userInfo.name}`,
            onClickPath: "/user/appointments",
        });
        await user.save();
        res.status(200).send({
            success: true,
            message: 'Appointment Booked Successfully.',
        });
    } catch (error) {
        res.status(500).send({ message: "Error while booking appointment.", success: false, error });
    }
};


// check the availabilty 

const bookingAvailabilityController = async (req, res) => {
  try {
    // Log request payload for debugging
    console.log(req.body);

    // Get requested date and time
    const requestedDate = moment(req.body.date, 'DD-MM-YYYY').toISOString();
    const requestedTime = moment(req.body.time, 'HH:mm').toISOString(); // Convert time to ISO

    // Fetch the doctor's details including timings
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });

    if (!doctor) {
      return res.status(404).send({
        message: "Doctor not found",
        success: false,
      });
    }

    const startTime = moment(doctor.timings[0], 'HH:mm');
    const endTime = moment(doctor.timings[1], 'HH:mm');
    const selectedTime = moment(req.body.time, 'HH:mm');

    // Check if requested time falls within the doctor's working hours
    if (selectedTime.isBefore(startTime) || selectedTime.isAfter(endTime)) {
      return res.status(400).send({
        message: `Doctor is only available between ${startTime.format('HH:mm')} and ${endTime.format('HH:mm')}`,
        success: false,
      });
    }

    // Check if there's an appointment at the same time or within 1-hour range
    const appointments = await appointmentModel.find({
      doctorId: req.body.doctorId,
      date: requestedDate,
      $or: [
        { time: requestedTime }, // Exact match
        { time: { 
            $gte: moment(selectedTime).subtract(1, 'hour').toISOString(), 
            $lte: moment(selectedTime).add(1, 'hour').toISOString() 
          } 
        } // One-hour range
      ]
    });

    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Slot not available at this time, check another timing.",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Slot available. Continue booking.",
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Error in booking.",
      success: false,
      error,
    });
  }
};





// user appointments controller
const userAppointmentsController = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({
            userId: req.body.userId,
        });
        res.status(200).send({
            success: true,
            message: 'Appointment list fetched Successfully.',
            data: appointments,
        });
    } catch (error) {
        res.status(500).send({ message: "Error in fetching user appointments list.", success: false, error });
    }
};


module.exports = {
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDoctorsController,
    bookAppointmentController,
    bookingAvailabilityController,
    userAppointmentsController,
};