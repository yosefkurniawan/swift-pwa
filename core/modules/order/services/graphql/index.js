import { useQuery, useMutation } from '@apollo/client';
import * as Schema from './schema';

export const getOrder = (params) => useQuery(Schema.getCustomerOrder, {
    context: {
        request: 'internal',
    },
    variables: params,
    skip: typeof window === 'undefined',
});
export const getOrderDownloadable = () => useQuery(Schema.getCustomerOrderDownloadable, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
});

export const getOrderDetail = (params) => useQuery(Schema.getCustomerOrderDetail, {
    context: {
        request: 'internal',
    },
    variables: params,
    skip: typeof window === 'undefined',
});

export const reOrder = () => useMutation(Schema.reOrder, {
    context: {
        request: 'internal',
    },
});

export default {
    getOrder,
    reOrder,
};
