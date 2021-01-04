import { useQuery } from '@apollo/client';
import * as Schema from './schema';

export const getOrder = (params) => useQuery(Schema.getCustomerOrder, {
    context: {
        request: 'internal',
    },
    variables: params,
    skip: typeof window === 'undefined',
});

export const getOrderDetail = (params) => useQuery(Schema.getCustomerOrderDetail, {
    context: {
        request: 'internal',
    },
    variables: params,
    skip: typeof window === 'undefined',
});

export default {
    getOrder,
};
