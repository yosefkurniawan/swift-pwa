import type from '../types/common';

const { SET_TOAST_MESSAGE, SET_BACKDROP_LOADER } = type;

const initalState = {
    toastMessage: {
        open: false,
        vriang: 'success',
        text: '',
    },
    backdropLoader: {
        open: false,
    },
};

export default (state = initalState, action) => {
    switch (action.type) {
    case SET_TOAST_MESSAGE:
        return {
            ...state,
            toastMessage: {
                ...state.toastMessage,
                ...action.data,
            },
        };
    case SET_BACKDROP_LOADER:
        return {
            ...state,
            backdropLoader: {
                ...state.backdropLoader,
                ...action.data,
            },
        };
    default:
        return state;
    }
};
