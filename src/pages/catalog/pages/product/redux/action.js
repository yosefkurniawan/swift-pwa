import { SET_SELECT_CONFIGURABLE, SET_SELECT_CONFIG_PRODUCT } from './constan';

export const setConfigurable = (selected) => ({
    type: SET_SELECT_CONFIGURABLE,
    data: selected,
});

export const setProductSelected = (product) => ({
    type: SET_SELECT_CONFIG_PRODUCT,
    data: product,
});

export default {
    setConfigurable,
};
