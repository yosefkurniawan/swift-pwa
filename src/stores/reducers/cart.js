import type from '../types/cart';

const { SET_COUNT_CART, SET_CHECKOUT_DATA } = type;

const initalState = {
    totalCart: 0,
    checkoutData: {},
};

export default (state = initalState, action) => {
    switch (action.type) {
    case SET_COUNT_CART:
        return {
            ...state,
            totalCart: action.data,
        };
    case SET_CHECKOUT_DATA:
        return {
            ...state,
            checkoutData: action.data,
        };
    default:
        return state;
    }
};
