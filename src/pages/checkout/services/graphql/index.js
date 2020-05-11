import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import helper from '@helpers/token';
import * as Schema from './schema';

const config = () => {
    const token = helper.getToken();

    const context = token
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
    ...config(),
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
});

export const getCart = (options = {}) => useLazyQuery(Schema.getCart, {
    ...options,
    ...config(),
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
});

export const setShippingAddress = (options = {}) => useMutation(Schema.setShippingAddressById, {
    ...options,
    ...config(),
});

export const setShippingMethod = (options = {}) => useMutation(Schema.setShippingMethod, {
    ...options,
    ...config(),
});

export const setBillingAddressById = (options = {}) => useMutation(Schema.setBillingAddressById, {
    ...options,
    ...config(),
});

export const setBillingAddressByInput = (options = {}) => useMutation(Schema.setBillingAddressByInput, {
    ...options,
    ...config(),
});

export const setShippingAddressByInput = (options = {}) => useMutation(Schema.setShippingAddressByInput, {
    ...options,
    ...config(),
});

export const placeOrder = (options = {}) => useMutation(Schema.placeOrder, {
    ...options,
    ...config(),
});

export const setPaymentMethod = (options = {}) => useMutation(Schema.setPaymentMethod, {
    ...options,
    ...config(),
});

export const setGuestEmailAddressOnCart = (options = {}) => useMutation(Schema.setGuestEmailAddressOnCart, {
    ...options,
    ...config(),
});

export const applyCouponToCart = (options = {}) => useMutation(Schema.applyCouponToCart, {
    ...options,
    ...config(),
});

export const removeCouponFromCart = (options = {}) => useMutation(Schema.removeCouponFromCart, {
    ...options,
    ...config(),
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
};
