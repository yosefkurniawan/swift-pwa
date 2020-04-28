import { SET_SELECT_CONFIGURABLE } from './constan';

export const productState = {
    selectConfigurable: {},
};

export const addressReducer = (state = productState, action) => {
    switch (action.type) {
    case SET_SELECT_CONFIGURABLE:
        return {
            ...state,
            selectConfigurable: {
                ...state.selectConfigurable,
                ...action.data,
            },
        };
    default:
        return state;
    }
};
