import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffDone,
    gotChild,
} from './parentSlice';

export const getAllParents = () => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Parents`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
}

export const getParentDetails = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Parent/${id}`);
        if (result.data) {
            dispatch(stuffDone(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
}

// New fetchSingleStudent function
export const fetchChild = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Parent/Student/${id}`);
        
        if (result.data) {
            console.log('data: ', result.data)
            dispatch(gotChild(result.data));
            return { payload: result.data };
        } else {
           
            dispatch(getFailed(result.data.message));
        }
    } catch (error) {
        dispatch(getError(error.message || 'An error occurred while fetching the student'));
    }
};