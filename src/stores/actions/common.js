import type from '../types/common';

const { SET_TOAST_MESSAGE, SET_BACKDROP_LOADER } = type;

export const setToastMessage = (data) => ({
    type: SET_TOAST_MESSAGE,
    data,
});

export const setBackdropLoader = (data) => ({
    type: SET_BACKDROP_LOADER,
    data,
});

export default {
    setToastMessage,
    setBackdropLoader,
};
