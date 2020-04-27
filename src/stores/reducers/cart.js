import type from '../types/cart';

const { SET_COUNT_CART } = type;

const initalState = {
    totalCart: 0,
};

export default (state = initalState, action) => {
    switch (action.type) {
    case SET_COUNT_CART:
        return {
            ...state,
            totalCart: state.totalCart + action.data,
        };
    default:
        return state;
    }
};
