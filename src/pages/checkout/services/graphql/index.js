import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';

const NOT_USING_INTERNAL = false;
const USING_INTERNAL = true;

const config = (isUsingInternal) => {
    const context = isUsingInternal ? { request: 'internal' } : {};

    return {
        notifyOnNetworkStatusChange: true,
        context,
    };
};

export const getCustomer = (options = {}) => useLazyQuery(Schema.getCustomer, {
    ...options,
    ...config(USING_INTERNAL),
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
});

export const getCart = (options = {}) => useLazyQuery(Schema.getCart, {
    ...options,
    ...config(USING_INTERNAL),
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
});

export const getRewardPoint = () => useLazyQuery(Schema.getRewardPoint, { ...config(USING_INTERNAL) });

export const setShippingAddress = (options = {}) => useMutation(Schema.setShippingAddressById, {
    ...options,
    ...config(USING_INTERNAL),
});

export const setShippingAddressByInput = (options = {}) => useMutation(Schema.setShippingAddressByInput, {
    ...options,
    ...config(USING_INTERNAL),
});

export const setBillingAddressById = (options = {}) => useMutation(Schema.setBillingAddressById, {
    ...options,
    ...config(USING_INTERNAL),
});

export const setBillingAddressByInput = (options = {}) => useMutation(Schema.setBillingAddressByInput, {
    ...options,
    ...config(USING_INTERNAL),
});

export const setShippingMethod = (options = {}) => useMutation(Schema.setShippingMethod, {
    ...options,
    ...config(USING_INTERNAL),
});

export const setPaymentMethod = (options = {}) => useMutation(Schema.setPaymentMethod, {
    ...options,
    ...config(USING_INTERNAL),
});

export const applyCouponToCart = (options = {}) => useMutation(Schema.applyCouponToCart, {
    ...options,
    ...config(USING_INTERNAL),
});

export const removeCouponFromCart = (options = {}) => useMutation(Schema.removeCouponFromCart, {
    ...options,
    ...config(USING_INTERNAL),
});

export const setGuestEmailAddressOnCart = (options = {}) => useMutation(Schema.setGuestEmailAddressOnCart, {
    ...options,
    ...config(USING_INTERNAL),
});

export const placeOrder = (options = {}) => useMutation(Schema.placeOrder, {
    ...options,
    ...config(USING_INTERNAL),
});

export const getSnapToken = (options = {}) => useLazyQuery(Schema.getSnapToken, {
    ...options,
    ...config(NOT_USING_INTERNAL),
});

export const getSnapOrderStatusByOrderId = (options = {}) => useLazyQuery(Schema.getSnapOrderStatusByOrderId, {
    ...options,
    ...config(NOT_USING_INTERNAL),
});

export const applyStoreCreditToCart = (options = {}) => useMutation(Schema.applyStoreCreditToCart, {
    ...options,
    ...config(USING_INTERNAL),
});

export const removeStoreCreditFromCart = (options = {}) => useMutation(Schema.removeStoreCreditFromCart, {
    ...options,
    ...config(USING_INTERNAL),
});

export const applyGiftCardToCart = (options = {}) => useMutation(Schema.applyGiftCardToCart, {
    ...options,
    ...config(USING_INTERNAL),
});

export const removeGiftCardFromCart = (options = {}) => useMutation(Schema.removeGiftCardFromCart, {
    ...options,
    ...config(USING_INTERNAL),
});

export default {
    getCustomer,
    getCart,
    getRewardPoint,
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
    getSnapOrderStatusByOrderId,
    applyStoreCreditToCart,
    removeStoreCreditFromCart,
    applyGiftCardToCart,
    removeGiftCardFromCart,
};
