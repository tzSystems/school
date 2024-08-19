const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Assuming you have a User model
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Assuming you have a User model
    },
    content: {
        type: String,
        required: true
    },
    attachment: {
        url: {
            type: String,
            default: null // Optional, in case there's no attachment
        },
        type: {
            type: String, // e.g., 'image/jpeg', 'video/mp4', etc.
            default: null // Optional, in case there's no attachment
        }
    },
    role: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Message", messageSchema);
