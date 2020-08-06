import { useLazyQuery, useQuery, useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getCountries = () => useLazyQuery(Schema.getCountries);

export const getCityByRegionId = (options = {}) => useLazyQuery(Schema.getCityByRegionId, { ...options, fetchPolicy: 'network-only' });

export const getCustomer = () => useQuery(Schema.getCustomer, {
    context: {
        request: 'internal',
        skip: typeof window === 'undefined',
    },
});

export const getCustomerSettings = () => useQuery(Schema.getCustomerSettings, {
    context: {
        request: 'internal',
        skip: typeof window === 'undefined',
    },
});

export const removeToken = () => useMutation(Schema.removeToken, {
    context: {
        request: 'internal',
    },
});

export const customerNotificationList = () => useQuery(Schema.customerNotificationList, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'network-only',
});

export const getCmsBlocks = (variables) => useQuery(Schema.getCmsBlocks, { variables });

export const getGiftCard = () => useQuery(Schema.getGiftCard, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'no-cache',
});

export const checkBalance = (code) => useQuery(Schema.checkBalance, {
    context: {
        request: 'internal',
    },
    variables: {
        gift_card_code: code,
    },
    skip: code === '' || !code,
});

export default {
    getCountries, getCityByRegionId, customerNotificationList, getCustomer,
};
