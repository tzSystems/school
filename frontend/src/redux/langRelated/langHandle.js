import {
    getRequest,
    getError,
    setLang
} from './langSlice';

export const changeLang = (languageCode) => (dispatch) => {
    dispatch(getRequest());

    try {
        dispatch(setLang(languageCode));
    } catch (error) {
        dispatch(getError(error));
    }
}
