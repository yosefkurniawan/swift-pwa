import type from '../types/cart';

const { SET_COUNT_CART } = type;

export const setCountCart = (data) => ({
    type: SET_COUNT_CART,
    data,
});

export default {
    setCountCart,
};
