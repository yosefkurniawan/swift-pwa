import { useMutation, useQuery } from '@apollo/react-hooks';
import * as Schema from '../schema/customer';

export const addWishlist = () => useMutation(Schema.addWishlist, {
    context: {
        request: 'internal',
    },
});

export const removeWishlist = () => useMutation(Schema.removeWishlist, {
    context: {
        request: 'internal',
    },
});

export const getCustomer = (token) => useQuery(Schema.getCustomer, {
    variables: {},
    context: {
        request: 'internal',
        headers: {
            Authorization: typeof window === 'undefined' && token ? `Bearer ${token}` : '',
        },
    },
    fetchPolicy: 'network-only',
});

export default {
    addWishlist,
    removeWishlist,
    getCustomer,
};
