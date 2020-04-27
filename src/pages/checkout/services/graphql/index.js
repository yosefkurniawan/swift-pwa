import { useQuery, useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getCustomer = (options = null, token) =>
    useQuery(Schema.getCustomer, {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    });

export const getCustomerCart = (options = null, token) =>
    useQuery(Schema.getCustomerCart, {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    });

export const setShippingAddress = (options = null, token) =>
    useMutation(Schema.setShippingAddressById, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    });

export const setShippingMethod = (options = null, token) =>
    useMutation(Schema.setShippingMethod, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    });

export const setBillingAddressById = (options = null, token) =>
    useMutation(Schema.setBillingAddressById, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    });

export const placeOrder = (options = null, token) =>
    useMutation(Schema.placeOrder, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    });

export const setPaymentMethod = (options = null, token) =>
    useMutation(Schema.setPaymentMethod, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    });

export default {
    getCustomer,
    getCustomerCart,
    setShippingAddress,
    setShippingMethod,
    setBillingAddressById,
    placeOrder,
    setPaymentMethod,
};
