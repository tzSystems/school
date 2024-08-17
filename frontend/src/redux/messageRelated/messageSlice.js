

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [], // Stores all messages
    loading: false,
    error: null,
    response: null,
    status: "idle", // Tracks the status of message operations
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        sendMessageRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.response = null;
        },
        sendMessageSuccess: (state, action) => {
            state.messages.push(action.payload); // Add the new message to the messages array
            state.loading = false;
            state.error = null;
            state.response = "Message sent successfully";
        },
        sendMessageFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.response = null;
        },
        fetchMessagesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchMessagesSuccess: (state, action) => {
            state.messages = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchMessagesFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearMessages: (state) => {
            state.messages = [];
            state.error = null;
            state.response = null;
            state.status = "idle";
        },
    },
});

export const {
    sendMessageRequest,
    sendMessageSuccess,
    sendMessageFailed,
    fetchMessagesRequest,
    fetchMessagesSuccess,
    fetchMessagesFailed,
    clearMessages,
} = messageSlice.actions;

export const messageReducer = messageSlice.reducer;
