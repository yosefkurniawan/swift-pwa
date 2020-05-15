import { useMutation, useQuery } from '@apollo/react-hooks';
import * as Schema from '../schema/customer';

export const addWishlist = (token) => useMutation(Schema.addWishlist, {
    context: {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
    skip: !token || token === '',
});

export const removeWishlist = (token) => useMutation(Schema.removeWishlist, {
    context: {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
    skip: !token || token === '',
});

export const getCustomer = () => useQuery(Schema.getCustomer, {
    context: {
        request: 'internal',
    },
});

export default {
    addWishlist,
    removeWishlist,
    getCustomer,
};
