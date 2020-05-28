import type from './constan';

export const addressState = {
    cities: [],
};

export const addressReducer = (state = addressState, action) => {
    switch (action.type) {
    case type.SET_CITIES:
        return {
            ...state,
            cities: action.payload,
        };
    default:
        return state;
    }
};
