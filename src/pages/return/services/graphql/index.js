import { useQuery, useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getFormDataRma = (params) => useQuery(Schema.getFormDataRma, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
    variables: params,
    skip: typeof window === 'undefined',
});

export const requestRma = () => useMutation(Schema.requestRma, {
    context: {
        request: 'internal',
    },
});

export default {
    getFormDataRma,
};
