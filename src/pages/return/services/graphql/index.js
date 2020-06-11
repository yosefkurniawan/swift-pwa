import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getOrderDetail = (params) => useQuery(Schema.getOrderDetail, {
    context: {
        request: 'internal',
    },
    variables: params,
    skip: typeof window === 'undefined',
});

export const getFormDataRma = (params) => useQuery(Schema.getFormDataRma, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
    variables: params,
    skip: typeof window === 'undefined',
});

export default {
    getOrderDetail,
};
