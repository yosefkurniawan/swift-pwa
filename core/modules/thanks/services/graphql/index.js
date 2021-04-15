import { useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from './schema';

const USING_INTERNAL = true;

const config = (isUsingInternal) => {
    const context = isUsingInternal ? { request: 'internal' } : {};

    return {
        notifyOnNetworkStatusChange: true,
        context,
    };
};

export const getOrder = (params) => useQuery(Schema.getOrder(), {
    variables: params,
    skip: !params,
});

export const getPaymentBankList = (options = {}) => useLazyQuery(Schema.getPaymentBankList, {
    ...options,
    ...config(USING_INTERNAL),
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
});

export default {
    getOrder,
    getPaymentBankList,
};
