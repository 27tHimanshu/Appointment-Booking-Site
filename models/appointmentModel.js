const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    doctorId: {
        type: String,
        required: true,
    },
    doctorInfo: {
        type: String,
        required: true,
    },
    userInfo: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
    },
    time: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const appointmentModel = mongoose.model('appointments', appointmentSchema);

module.exports = appointmentModel;


// const mongoose = require('mongoose');

// const appointmentSchema = new mongoose.Schema({
//     userId: {
//         type: String,
//         required: true,
//     },
//     doctorId: {
//         type: String,
//         required: true,
//     },
//     doctorInfo: {
//         type: Object, // Changed from String to Object for better flexibility
//         required: true,
//     },
//     userInfo: {
//         type: Object, // Changed from String to Object for better flexibility
//         required: true,
//     },
//     date: {
//         type: Date, // Changed to Date type since it's more appropriate for date storage
//         required: true,
//     },
//     status: {
//         type: String,
//         required: true,
//         default: 'pending',
//     },
//     time: {
//         type: String, // Time remains a string in "HH:mm" format
//         required: true,
//     }
// }, { timestamps: true });

// const appointmentModel = mongoose.model('appointments', appointmentSchema);

// module.exports = appointmentModel;
