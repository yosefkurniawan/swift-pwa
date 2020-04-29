import {
    SET_SELECT_CONFIGURABLE, SET_SELECT_CONFIG_PRODUCT,
    SET_COUNT_REVIEW,
} from './constan';

export const productState = {
    selectConfigurable: {},
    product: {},
    review: {},
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
    case SET_COUNT_REVIEW:
        return {
            ...state,
            review: action.data,
        };
    default:
        return state;
    }
};
