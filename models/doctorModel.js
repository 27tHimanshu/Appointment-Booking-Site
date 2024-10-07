const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone Number is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    website: {
        type: String,
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    specialization: {
        type: String,
        required: [true, 'Specialization is required'],
    },
    experience: {
        type: String,
        required: [true, 'Experience is required'],
    },
    feesPerCunsaltation: {
        type: Number,
        required: [true, 'Fee is required'],
    },
    status: {
        type: String,
        default: 'Pending',
    },
    timings: {
        type: Object,
        required: [true, 'Work Timing is required'],
    }
}, { timestamps: true });

const doctorModel = mongoose.model('doctors', doctorSchema);
module.exports = doctorModel;


// const mongoose = require('mongoose');

// const doctorSchema = new mongoose.Schema({
//     userId: {
//         type: String,
//         required: true, // Ensuring every doctor has a linked userId
//     },
//     firstName: {
//         type: String,
//         required: [true, 'First Name is required'],
//     },
//     lastName: {
//         type: String,
//         required: [true, 'Last Name is required'],
//     },
//     phone: {
//         type: String,
//         required: [true, 'Phone Number is required'],
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required'],
//     },
//     website: {
//         type: String,
//     },
//     address: {
//         type: String,
//         required: [true, 'Address is required'],
//     },
//     specialization: {
//         type: String,
//         required: [true, 'Specialization is required'],
//     },
//     experience: {
//         type: String,
//         required: [true, 'Experience is required'],
//     },
//     feesPerConsultation: {
//         type: Number,
//         required: [true, 'Consultation Fee is required'],
//     },
//     status: {
//         type: String,
//         default: 'Pending', // New doctors will be marked as pending by default
//     },
//     timings: {
//         type: Array,
//         required: [true, 'Work Timing is required'],
//     }
// }, { timestamps: true });

// const doctorModel = mongoose.model('doctors', doctorSchema);

// module.exports = doctorModel;
