


import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    setLang
} from './langSlice';

export const changeLang = () => (dispatch) => {
    dispatch(getRequest());

    try {
        dispatch(setLang())
    } catch (error) {
        dispatch(getError(error));
    }
}