

const ChatList = require('../models/chatListSchema.js');

const createChatList = async (req, res) => {
    try {
        const { participants } = req.body;

        // Ensure participants are provided and valid
        if (!participants || participants.length !== 2) {
            return res.status(400).json({ error: 'Two participants are required to create or update a chat list.' });
        }

        // Find or create a chat list between these participants
        const existingChatList = await ChatList.findOne({
            participants: { $all: participants.map(participant => ({ userId: participant.userId, role: participant.role })) }
        });

        if (existingChatList) {
            // Chat list already exists, return it or update it if needed
            return res.status(200).json(existingChatList);
        } else {
            // Create a new chat list
            const newChatList = new ChatList({ participants });
            await newChatList.save();
            return res.status(201).json(newChatList);
        }
    } catch (err) {
        console.error('Error creating or updating chat list:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const getChatListsForUser = async (req, res) => {
    try {
        const { userId, role } = req.params;
        console.log('userId', userId);
        console.log('role', role);

        // Find all chat lists where the user is a participant
        const chatLists = await ChatList.find({
            participants: { $elemMatch: { userId, role } }
        });

        res.status(200).json(chatLists);
    } catch (err) {
        console.error('Error fetching chat lists:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const updateLastMessage = async (req, res) => {
    try {
        const { chatListId } = req.params;
        const { senderId, senderRole, content, timestamp } = req.body;

        // Find and update the chat list with the new message
        const updatedChatList = await ChatList.findByIdAndUpdate(chatListId, {
            lastMessage: {
                senderId,
                senderRole,
                content,
                timestamp
            },
            $inc: { unreadCount: 1 }  // Increment unread count
        }, { new: true });

        if (!updatedChatList) {
            return res.status(404).json({ error: 'Chat list not found' });
        }

        res.status(200).json(updatedChatList);
    } catch (err) {
        console.error('Error updating last message:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const markMessagesAsRead = async (req, res) => {
    try {
        const { chatListId } = req.params;

        // Find and update the chat list to reset the unread count
        const updatedChatList = await ChatList.findByIdAndUpdate(chatListId, {
            unreadCount: 0
        }, { new: true });

        if (!updatedChatList) {
            return res.status(404).json({ error: 'Chat list not found' });
        }

        res.status(200).json(updatedChatList);
    } catch (err) {
        console.error('Error marking messages as read:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteChatList = async (req, res) => {
    try {
        const { chatListId } = req.params;

        // Delete the chat list
        const deletedChatList = await ChatList.findByIdAndDelete(chatListId);

        if (!deletedChatList) {
            return res.status(404).json({ error: 'Chat list not found' });
        }

        res.status(200).json({ message: 'Chat list deleted successfully' });
    } catch (err) {
        console.error('Error deleting chat list:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    createChatList,
    getChatListsForUser,
    updateLastMessage,
    markMessagesAsRead,
    deleteChatList
};
