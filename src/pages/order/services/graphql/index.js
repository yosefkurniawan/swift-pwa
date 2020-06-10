import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getOrder = (params) => useQuery(Schema.getOrder, {
    context: {
        request: 'internal',
    },
    variables: params,
    skip: typeof window === 'undefined',
});

export const getOrderDetail = (params) => useQuery(Schema.getOrderDetail, {
    context: {
        request: 'internal',
    },
    variables: params,
    skip: typeof window === 'undefined',
});

export const getTrackingOrder = (params) => useQuery(Schema.getTrackingOrder, {
    context: {
        request: 'internal',
    },
    variables: params,
    skip: typeof window === 'undefined',
});

export default {
    getOrder,
};
