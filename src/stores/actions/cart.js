import type from '../types/cart';

const { SET_COUNT_CART, SET_CHECKOUT_DATA } = type;

export const setCountCart = (data) => ({
    type: SET_COUNT_CART,
    data,
});

export const setCheckoutData = (data) => ({
    type: SET_CHECKOUT_DATA,
    data,
});

export default {
    setCountCart,
    setCheckoutData,
};
