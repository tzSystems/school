import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    parentsList: [],
    parentDetails: null,
    childList: [],
    loading: false,
    error: null,
    response: null,
    statestatus: "idle",
};

const parentSlice = createSlice({
    name: 'parent',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getSuccess: (state, action) => {
            state.parentsList = action.payload;
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
        stuffDone: (state, action) => {
            state.parentDetails = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
            state.statestatus = "added";
        },
        underStudentControl: (state) => {
            state.loading = false;
            state.response = null;
            state.error = null;
            state.statestatus = "idle";
        },
        gotChild: (state, action) =>{
            state.childList = state.childList.push(action.payload);
            state.loading = false;
            state.error = null;
            state.response = null;

        },
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffDone,
    gotChild,
    underStudentControl,
} = parentSlice.actions;

export const parentReducer = parentSlice.reducer;
