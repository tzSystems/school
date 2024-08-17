

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatListSchema = new Schema({
    participants: [{
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        role: {
            type: String,
            enum: ['Parent', 'Admin', 'Student', 'Teacher'],
            required: true
        }
    }],
    lastMessage: {
        senderId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        senderRole: {
            type: String,
            enum: ['Parent', 'Admin', 'Student', 'Teacher'],
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
    },
    unreadCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('ChatList', ChatListSchema);
