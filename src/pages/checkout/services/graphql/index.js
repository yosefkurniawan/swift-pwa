import { useQuery, useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';
import helper from '@helpers/token'

const config = {
    context: {
        headers: {
            authorization: `Bearer ${helper.getToken()}`,
        },
    },
}

export const getCustomer = (options = {}) =>
    useQuery(Schema.getCustomer, {
        ...options,
        ...config,
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
        
    });

export const getCustomerCart = (options = {}) =>
    useQuery(Schema.getCustomerCart, {
        ...options,
        ...config,
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    });

export const setShippingAddress = (options = {}) =>
    useMutation(Schema.setShippingAddressById, {
        ...options,
        ...config,
    });

export const setShippingMethod = (options = {}) =>
    useMutation(Schema.setShippingMethod, {
        ...options,
        ...config,
    });

export const setBillingAddressById = (options = {}) =>
    useMutation(Schema.setBillingAddressById, {
        ...options,
        ...config,
    });

export const placeOrder = (options = {}) =>
    useMutation(Schema.placeOrder, {
        ...options,
        ...config,
    });

export const setPaymentMethod = (options = {}) =>
    useMutation(Schema.setPaymentMethod, {
        ...options,
        ...config,
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
