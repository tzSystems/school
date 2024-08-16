import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffDone,
    
} from './studentSlice';

// Existing getAllStudents function
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
};

// Existing updateStudentFields function
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
};

// Existing removeStuff function
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
};

// Existing fetchStudentNames function
export const fetchStudentNames = (name, schoolName) => async (dispatch) => {
    dispatch(getRequest()); 

    try {
        const url = `${process.env.REACT_APP_BASE_URL}/Students`; 
        const result = await axios.post(url, { name, schoolName });
        console.log('data', result.data.students)
        
        if (result.data && result.data.students) { 
            dispatch(getSuccess(result.data.students)); 
        } else {
            dispatch(getFailed(result.data.message || 'No students found')); 
        }
    } catch (error) {
        dispatch(getError(error.message || 'An error occurred'));
    }
};


