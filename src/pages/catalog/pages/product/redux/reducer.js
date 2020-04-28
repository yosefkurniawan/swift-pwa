import { SET_SELECT_CONFIGURABLE, SET_SELECT_CONFIG_PRODUCT } from './constan';

export const productState = {
    selectConfigurable: {},
    product: {},
};

export const productReducer = (state = productState, action) => {
    switch (action.type) {
    case SET_SELECT_CONFIGURABLE:
        return {
            ...state,
            selectConfigurable: {
                ...state.selectConfigurable,
                ...action.data,
            },
        };
    case SET_SELECT_CONFIG_PRODUCT:
        return {
            ...state,
            product: action.data,
        };
    default:
        return state;
    }
};
