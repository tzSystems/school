import axios from 'axios';
import {
    sendMessageRequest,
    sendMessageSuccess,
    sendMessageFailed,
    fetchMessagesRequest,
    fetchMessagesSuccess,
    fetchMessagesFailed,
} from './messageSlice';

// Function to send a message
export const sendMessage = ({ recipientId, content, senderId, role, name, attachment }) => async (dispatch) => {
    dispatch(sendMessageRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/MessageSend`, {
            recipientId,
            content,
            senderId,
            name,
            role,  // Include role in the request body
            attachment  // Include the attachment URL if present
        });

        if (result.data) {
            dispatch(sendMessageSuccess(result.data));
            return result;
        }
    } catch (error) {
        dispatch(sendMessageFailed(error.message || 'An error occurred while sending the message'));
    }
};

// Function to fetch messages between a sender and recipient
export const fetchMessagesBySenderAndRecipient = ({ senderId, recipientId, senderRole }) => async (dispatch) => {
    dispatch(fetchMessagesRequest());

    try {
        console.log('role', senderRole);
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Messages/${senderId}/${recipientId}`,{
            params: { role:senderRole }  // Include role in the request parameters to filter messages by role (sender or recipient)
        });
        if (result.data) {
            console.log('data', result.data)
            dispatch(fetchMessagesSuccess(result.data));
        }
    } catch (error) {
        dispatch(fetchMessagesFailed(error.message || 'An error occurred while fetching messages'));
    }
};

// Function to fetch all messages for a specific user
export const fetchMessagesByUser = (userId) => async (dispatch) => {
    dispatch(fetchMessagesRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Messages/User/${userId}`);
        if (result.data) {
            dispatch(fetchMessagesSuccess(result.data));
        }
    } catch (error) {
        dispatch(fetchMessagesFailed(error.message || 'An error occurred while fetching messages'));
    }
};
