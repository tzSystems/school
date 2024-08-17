
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Async thunk to fetch chat lists for a user
export const fetchChatListsForUser = createAsyncThunk(
    'chatList/fetchChatListsForUser',
    async ({ userId, role }, { rejectWithValue }) => {
        try {
            console.log('Fetching chat lists for user')
            console.log('userId',userId);
            console.log('role', role);
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/chatlists/${userId}/${role}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to create a new chat list
export const createChatList = createAsyncThunk(
    'chatList/createChatList',
    async ({ participants, firstMessage }, { rejectWithValue }) => {
        try { 
            console.log('participants', participants)
            console.log('firstMessage', firstMessage);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/chatlists`, { participants, firstMessage });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// Async thunk to update the last message in a chat list
export const updateLastMessage = createAsyncThunk(
    'chatList/updateLastMessage',
    async ({ chatListId, senderId, senderRole, content, timestamp }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/chatlists/${chatListId}`, {
                senderId,
                senderRole,
                content,
                timestamp,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to mark messages as read in a chat list
export const markMessagesAsRead = createAsyncThunk(
    'chatList/markMessagesAsRead',
    async ({ chatListId }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/chatlists/${chatListId}/read`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



