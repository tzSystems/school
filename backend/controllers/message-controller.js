const mongoose = require('mongoose');
const Message = require('../models/messageSchema');
const Parent = require('../models/parentSchema'); // Import schemas for each role
const Admin = require('../models/adminSchema');
const Student = require('../models/studentSchema');
const Teacher = require('../models/teacherSchema');

// Helper function to get user details by role
const getUserDetailsByRole = async (userId, role) => {
    console.log('role: ' + role)
    switch (role) {
        case 'Parent':
            return await Parent.findById(userId);
        case 'Admin':
            return await Admin.findById(userId);
        case 'Student':
            return await Student.findById(userId);
        case 'Teacher':
            return await Teacher.findById(userId);
        default:
            throw new Error('Invalid role', role);
    }
};

const getMessagesBySenderAndRecipient = async (req, res) => {
    try {
        const { senderId, recipientId } = req.params;
        const { role } = req.query; // Assume role comes from query parameters
        console.log('role ', role);

        if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(recipientId)) {
            return res.status(400).json({ error: 'Invalid sender or recipient ID' });
        }

        const messages = await Message.find({
            $or: [
                { senderId: senderId, recipientId: recipientId },
                { senderId: recipientId, recipientId: senderId }
            ]
        });

        // Fetch and attach user details based on role
        const sender = await getUserDetailsByRole(senderId, role);
        const recipient = await getUserDetailsByRole(recipientId, role);

       // console.log('sender',sender)
       // console.log('recipient',recipient)
        // Optionally, attach user details to each message if needed
        messages.forEach(msg => {
            msg.sender = sender;
            msg.recipient = recipient;
        });

        res.status(200).json(messages);
    } catch (err) {
        console.log('err', err);
        res.status(500).json({ error: 'Failed to retrieve messages', details: err });
    }
};

const deleteAttachment = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Error deleting attachment from Cloudinary:', error);
    }
};


const sendMessage = async (req, res) => {
    try {
        const { senderId, recipientId, content, role, name, attachment } = req.body;
    
        

        console.log('body', req.body);

        

        // Create a new message with or without attachment
        const message = new Message({
            senderId,
            recipientId,
            content,
            role,
            name,
            attachment:(attachment !== null && attachment.url !== null) ? { url: attachment.url, type: attachment.type, publicId:attachment.publicId } : null
        });

        // Save the message to the database
        const savedMessage = await message.save();
        console.log('message saved', savedMessage);
        res.status(200).json(savedMessage);
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ error: error.message });
    }
};



// Get all messages associated with a specific user ID (sender or recipient)
const getMessagesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.query; // Assume role comes from query parameters

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const messages = await Message.find({
            $or: [
                { senderId: userId },
                { recipientId: userId }
            ]
        });

        // Fetch and attach user details based on role
        const user = await getUserDetailsByRole(userId, role);

        // Optionally, attach user details to each message if needed
        messages.forEach(msg => {
            msg.user = user;
        });

        res.status(200).json(messages);
    } catch (err) {
        console.log('err', err);
        res.status(500).json({ error: 'Failed to retrieve messages', details: err });
    }
};

// Delete a message
const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(messageId)) {
            return res.status(400).json({ error: 'Invalid message ID' });
        }

        const result = await Message.findByIdAndDelete(messageId);

        if (!result) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (err) {
        console.log('err', err);
        res.status(500).json({ error: 'Failed to delete message', details: err });
    }
};

module.exports = {
    sendMessage,
    getMessagesBySenderAndRecipient,
    getMessagesByUserId,
    deleteMessage
};
