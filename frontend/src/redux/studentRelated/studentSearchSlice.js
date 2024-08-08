// Example of studentSearchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const studentSearchSlice = createSlice({
  name: 'studentSearch',
  initialState: {
    studentsList: [],
    loading: false,
    error: null,
  },
  reducers: {
    getRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSuccess: (state, action) => {
      state.studentsList = action.payload;
      state.loading = false;
    },
    getFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getRequest, getSuccess, getFailed, getError } = studentSearchSlice.actions;
export const studentSearchReducer = studentSearchSlice.reducer;
