const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Parent"
    },
    address: {
        type: String,
        required: true
    },
    // New fields
    profilePicture: {
        type: String, // URL or path to the profile picture
        default: null
    },
    occupation: {
        type: String,
        default: null
    },
    dob: {
        type: Date,
        default: null
    },
    gender: {
        type: String,
       // enum: ['Male', 'Female', 'Other'],
        default: null
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        default: []
    }]
});

module.exports = mongoose.model("parent", parentSchema);
