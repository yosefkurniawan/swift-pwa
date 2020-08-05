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

export default {
    getCountries, getCityByRegionId, customerNotificationList, getCustomer,
};
