import type from '../types/config';

const { SET_STORE_CONFIG } = type;

export const setStoreConfig = (data) => ({
    type: SET_STORE_CONFIG,
    data,
});

export default {
    setStoreConfig,
};
