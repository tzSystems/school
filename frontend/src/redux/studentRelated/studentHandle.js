


import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffDone
} from './studentSlice';



export const getAllStudents = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Students/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const updateStudentFields = (id, fields, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(stuffDone());
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const removeStuff = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(stuffDone());
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

// New fetchStudentNames function



export const fetchStudentNames = (name, schoolName) => async (dispatch) => {
    dispatch(getRequest()); // Dispatch action to indicate request started

    try {
        // Make the API request
        const url = `${process.env.REACT_APP_BASE_URL}/Students`; // Verify this URL
        const result = await axios.post(url, { name, schoolName });
        console.log('data', result.data.students)
        // Check if the response contains a success message and dispatch accordingly
        if (result.data && result.data.students) { // Adjust if your API response structure is different
            dispatch(getSuccess(result.data.students)); // Dispatch success with student data
        } else {
            dispatch(getFailed(result.data.message || 'No students found')); // Dispatch failure if no students are found
        }
    } catch (error) {
        // Handle errors and dispatch error action
        dispatch(getError(error.message || 'An error occurred'));
    }
};

