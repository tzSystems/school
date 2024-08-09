

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    code:0,
    loading: false,
    error: null,
    response: null,
};

const langSlice = createSlice({
    name: 'lang_code',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.code = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setLang: (state, action) =>{
            state.code = state.code === 0 ? 1:0;
            state.loading = false;
            state.error = null;
            state.response = null;
        }
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    setLang
} = langSlice.actions;

export const langReducer = langSlice.reducer;