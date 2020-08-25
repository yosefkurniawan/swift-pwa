/* eslint-disable import/prefer-default-export */
import { useQuery, useMutation } from '@apollo/react-hooks';
import schema from './schema';

export const getCategories = () => useQuery(schema.categories);

export const getCustomer = () => useQuery(schema.getCustomer, {
    context: {
        request: 'internal',
        skip: typeof window === 'undefined',
    },
});

export const removeToken = () => useMutation(schema.removeToken, {
    context: {
        request: 'internal',
    },
});

export const getCmsBlocks = (variables) => useQuery(schema.getCmsBlocks, { variables });

export default {
    getCmsBlocks,
    getCategories,
    getCustomer,
    removeToken,
};
