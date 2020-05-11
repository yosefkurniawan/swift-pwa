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

export const getCustomer = (token) => useQuery(Schema.getCustomer, {
    context: {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
    skip: token === '' || !token,
});

export default {
    addWishlist,
    removeWishlist,
    getCustomer,
};
