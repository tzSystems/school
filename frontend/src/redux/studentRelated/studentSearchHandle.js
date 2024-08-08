

import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './studentSearchSlice'; // Adjust import path to the new slice

export const fetchStudentNames = (name, schoolName) => async (dispatch) => {
    dispatch(getRequest()); // Dispatch action to indicate request started

    try {
        const url = `${process.env.REACT_APP_BASE_URL}/Students`; // Verify this URL
        const result = await axios.post(url, { name, schoolName });
        console.log('data', result.data.students);

        // Check if the response contains student data
        if (result.data && result.data.students) {
            dispatch(getSuccess(result.data.students)); // Dispatch success with student data
        } else {
            dispatch(getFailed(result.data.message || 'No students found')); // Dispatch failure if no students are found
        }
    } catch (error) {
        // Handle errors and dispatch error action
        dispatch(getError(error.message || 'An error occurred'));
    }
};
