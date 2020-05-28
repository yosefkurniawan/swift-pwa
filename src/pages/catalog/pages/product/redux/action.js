import {
    SET_SELECT_CONFIGURABLE, SET_SELECT_CONFIG_PRODUCT,
    SET_COUNT_REVIEW,
} from './constan';

export const setConfigurable = (selected) => ({
    type: SET_SELECT_CONFIGURABLE,
    data: selected,
});

export const setProductSelected = (product) => ({
    type: SET_SELECT_CONFIG_PRODUCT,
    data: product,
});

export const setCountReview = (data) => ({
    type: SET_COUNT_REVIEW,
    data,
});

export default {
    setConfigurable,
};
