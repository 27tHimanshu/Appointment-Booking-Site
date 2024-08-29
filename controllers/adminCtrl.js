const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModels');

const getAllUserController = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).send({
            success: true,
            message: 'User data',
            data: users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while fetching users',
            error,
        });
    }
};

const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        res.status(200).send({
            success: true,
            message: 'Doctors data list',
            data: doctors,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting data',
            error,
        });
    }
};

const changeAccountStatusController = async (req, res) => {
    try {
        const { doctorId, status } = req.body;

        // Find and update the doctor's status
        const doctor = await doctorModel.findByIdAndUpdate(
            doctorId,
            { status }
        );

        const user = await userModel.findOne( {_id:doctor.userId});
        const notification = user.notification   
       
        notification.push({
            type: 'doctor-account-request-updated',
            message: `Your doctor account request has been ${status}`,
            onClickPath: '/notification',
        });

        // Update the user's isDoctor field based on the status
        user.isDoctor = status === 'approved' ? true : false;
        await user.save();

        res.status(201).send({
            success: true,
            message: 'Account status updated',
            data: doctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in account status update',
            error,
        });
    }
};

module.exports = {
    getAllDoctorsController,
    getAllUserController,
    changeAccountStatusController,
};
