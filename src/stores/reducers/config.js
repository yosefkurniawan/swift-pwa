import type from '../types/config';

const { SET_STORE_CONFIG } = type;

const initalState = {
    storeConfig: '',
};

export default (state = initalState, action) => {
    switch (action.type) {
    case SET_STORE_CONFIG:
        return {
            ...state,
            storeConfig: action.data,
        };
    default:
        return state;
    }
};
