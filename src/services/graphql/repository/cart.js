import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import * as CartSchema from '../schema/cart';

export const getGuestCartId = () => useMutation(CartSchema.createCartIdGuest);
export const getCustomerCartId = (token) => useLazyQuery(CartSchema.createCartIdUser, {
    context: {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
});
export const getCartData = () => useQuery(CartSchema.getCart);
export const getCountCart = (token, cartId) => useQuery(CartSchema.getCountCart, {
    context: {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
    variables: {
        cartId,
    },
});
export const mergeCart = (token) => useMutation(CartSchema.mergeCart, {
    context: {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
});

export default {
    getGuestCartId,
    getCartData,
    getCountCart,
};
