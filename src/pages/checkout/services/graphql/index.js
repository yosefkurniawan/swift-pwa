import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import helper from '@helpers/token';
import * as Schema from './schema';

const USING_TOKEN = true;
const NOT_USING_TOKEN = false;

const config = (isUsingToken) => {
    const token = helper.getToken();

    const context = token && isUsingToken
        ? {
            headers: {
                authorization: `Bearer ${helper.getToken()}`,
            },
        }
        : {};

    return {
        notifyOnNetworkStatusChange: true,
        context,
    };
};

export const getCustomer = (options = {}) => useQuery(Schema.getCustomer, {
    ...options,
    ...config(USING_TOKEN),
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
});

export const getCart = (options = {}) => useLazyQuery(Schema.getCart, {
    ...options,
    ...config(USING_TOKEN),
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
});

export const setShippingAddress = (options = {}) => useMutation(Schema.setShippingAddressById, {
    ...options,
    ...config(USING_TOKEN),
});

export const setShippingMethod = (options = {}) => useMutation(Schema.setShippingMethod, {
    ...options,
    ...config(USING_TOKEN),
});

export const setBillingAddressById = (options = {}) => useMutation(Schema.setBillingAddressById, {
    ...options,
    ...config(USING_TOKEN),
});

export const setBillingAddressByInput = (options = {}) => useMutation(Schema.setBillingAddressByInput, {
    ...options,
    ...config(USING_TOKEN),
});

export const setShippingAddressByInput = (options = {}) => useMutation(Schema.setShippingAddressByInput, {
    ...options,
    ...config(USING_TOKEN),
});

export const placeOrder = (options = {}) => useMutation(Schema.placeOrder, {
    ...options,
    ...config(USING_TOKEN),
});

export const setPaymentMethod = (options = {}) => useMutation(Schema.setPaymentMethod, {
    ...options,
    ...config(USING_TOKEN),
});

export const setGuestEmailAddressOnCart = (options = {}) => useMutation(Schema.setGuestEmailAddressOnCart, {
    ...options,
    ...config(USING_TOKEN),
});

export const applyCouponToCart = (options = {}) => useMutation(Schema.applyCouponToCart, {
    ...options,
    ...config(USING_TOKEN),
});

export const removeCouponFromCart = (options = {}) => useMutation(Schema.removeCouponFromCart, {
    ...options,
    ...config(USING_TOKEN),
});

export const getSnapToken = (options = {}) => useLazyQuery(Schema.getSnapToken, {
    ...options,
    ...config(NOT_USING_TOKEN),
});

export default {
    getCustomer,
    getCart,
    setShippingAddress,
    setShippingMethod,
    setBillingAddressById,
    setBillingAddressByInput,
    setShippingAddressByInput,
    placeOrder,
    setPaymentMethod,
    setGuestEmailAddressOnCart,
    applyCouponToCart,
    removeCouponFromCart,
    getSnapToken,
};
