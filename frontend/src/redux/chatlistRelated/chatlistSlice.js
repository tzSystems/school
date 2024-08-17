import { createSlice } from '@reduxjs/toolkit';
import {
    fetchChatListsForUser,
    createChatList,
    updateLastMessage,
    markMessagesAsRead
} from './chatlistHandle'; // Adjust the path to where your thunks are defined

const initialState = {
    chatLists: [],
    loading: false,
    error: null
};

const chatListSlice = createSlice({
    name: 'chatList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatListsForUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChatListsForUser.fulfilled, (state, action) => {
                state.loading = false;
                state.chatLists = action.payload;
            })
            .addCase(fetchChatListsForUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createChatList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createChatList.fulfilled, (state, action) => {
                state.loading = false;
                state.chatLists.push(action.payload);
            })
            .addCase(createChatList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateLastMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLastMessage.fulfilled, (state, action) => {
                state.loading = false;
                const updatedChatList = action.payload;
                const index = state.chatLists.findIndex(
                    (chatList) => chatList._id === updatedChatList._id
                );
                if (index !== -1) {
                    state.chatLists[index] = updatedChatList;
                }
            })
            .addCase(updateLastMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(markMessagesAsRead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markMessagesAsRead.fulfilled, (state, action) => {
                state.loading = false;
                const updatedChatList = action.payload;
                const index = state.chatLists.findIndex(
                    (chatList) => chatList._id === updatedChatList._id
                );
                if (index !== -1) {
                    state.chatLists[index] = updatedChatList;
                }
            })
            .addCase(markMessagesAsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const chatListReducer = chatListSlice.reducer;
