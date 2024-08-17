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
    }],
    // New columns for messages and notifications
    messages: [{
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the user who sent the message
            required: true
        },
        sender: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    notifications: [{
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the user who sent the notification
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        read: {
            type: Boolean,
            default: false
        }
    }]
});

module.exports = mongoose.model("parent", parentSchema);
